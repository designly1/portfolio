import { loadEnvConfig } from "@next/env";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import { Configuration, OpenAIApi } from "openai";
import { encode } from "gpt-3-encoder";

loadEnvConfig("");

(async function () {
    try {
        const configuration = new Configuration({ apiKey: process.env.OPENAI_KEY });
        const openai = new OpenAIApi(configuration);

        const supabase = createClient(process.env.NEXT_PUBLIC_SB_URL, process.env.SB_SERVICE_KEY);

        const inFile = 'data/hackers.json';
        const dataBuffer = fs.readFileSync(inFile);
        const data = JSON.parse(dataBuffer);

        data.forEach(async item => {
            // Generate embedding via GPT model ada-002
            const aiRes = await openai.createEmbedding({
                model: "text-embedding-ada-002",
                input: item.content
            });
            const [{ embedding }] = aiRes.data.data;

            // Insert data and embedding into PG table

            const { data, error } = await supabase
                .from("vsearch")
                .insert({
                    document_title: item.documentTitle,
                    page_no: item.pageNo,
                    embedding,
                    content: item.content,
                    content_length: item.content.length,
                    content_tokens: encode(item.content).length
                })
                .select("*");
            return;
        });
    } catch (err) {
        console.error(err.message, err.stack);
    }
})();
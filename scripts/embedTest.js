import { loadEnvConfig } from "@next/env";
import { createClient } from "@supabase/supabase-js";
import { Configuration, OpenAIApi } from "openai";

loadEnvConfig("");

const SEARCH = "Sump pump";
const MATCHES = 3;

(async function () {
    try {
        const configuration = new Configuration({ apiKey: process.env.OPENAI_KEY });
        const openai = new OpenAIApi(configuration);

        const supabase = createClient(process.env.NEXT_PUBLIC_SB_URL, process.env.SB_SERVICE_KEY);

        // Generate embedding via GPT model ada-002
        const aiRes = await openai.createEmbedding({
            model: "text-embedding-ada-002",
            input: SEARCH
        });
        const [{ embedding }] = aiRes.data.data;

        const { data: chunks, error } = await supabase.rpc("vector_search", {
            query_embedding: embedding,
            similarity_threshold: 0.01,
            match_count: MATCHES
        });

        if (error) {
            console.error(error);
            throw new Error(error);
        }

        console.log(chunks);
    } catch (err) {
        console.error(err.message, err.stack);
    }
})();
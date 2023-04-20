import fs from 'fs'
import { encode } from 'gpt-3-encoder';
import PDF from 'pdf-scraper';

const inFile = 'data/hackers.pdf';
const outFile = 'data/hackers.json';
const dataBuffer = fs.readFileSync(inFile);
const tokensPerChunk = 200;
const documentTitle = "True Hackers"

PDF(dataBuffer).then(function (data) {
    console.log(`Successfully parsed ${data.numpages} pages from ${inFile}`);

    // Iterate over PDF pages
    let chunkIndex = 0;
    let currentChunk = '';
    let currentChunkWords = 0;

    const output = [];
    let content = '';
    for (let pageIndex = 0; pageIndex < data.pages.length; pageIndex++) {
        console.log(`Parsing page #${pageIndex}...`);

        const pushChunk = (chunk) => {
            const contentLength = encode(chunk).length;
            console.log('Creating chunk of token length:', contentLength);
            output.push({
                documentTitle: documentTitle,
                pageNo: pageIndex + 1,
                tokens: contentLength,
                content: chunk.trim()
            });
        }

        // Normalize all whitespace to a single space
        content = data.pages[pageIndex].replace(/\s+/g, ' ');

        // If page content is longer than tokens limit, parse into sentences
        if (encode(content).length > tokensPerChunk) {

            // Split content into sentences
            let sentences = content.split('. ');
            let chunk = '';

            for (let i = 0; i < sentences.length; i++) {
                const sentence = sentences[i];
                const sentenceTokenLength = encode(sentence).length;
                const chunkTokenLength = encode(chunk).length;

                // If our chunk has grown to exceed the tokens limit, append to output buffer
                if (chunkTokenLength + sentenceTokenLength > tokensPerChunk) {
                    pushChunk(chunk);
                    chunk = '';
                }

                // If current sentence ends with a character, append a period, otherwise a space
                if (sentence && sentence[sentence.length - 1].match(/[a-z0-9]/i)) {
                    chunk += sentence + ". ";
                } else {
                    chunk += sentence + " ";
                }
            }
            // Append the remaining text
            pushChunk(chunk);
        } else {
            pushChunk(content);
        }
    }
    fs.writeFileSync(outFile, JSON.stringify(output));
});
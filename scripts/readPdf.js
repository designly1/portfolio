const fs = require('fs');
const pdf = require('pdf-scraper');

const inFile = 'data/hackers.pdf';
const outFile = 'data/hackers.json';
const dataBuffer = fs.readFileSync(inFile);
const wordsPerChunk = 200;

pdf(dataBuffer).then(function (data) {
    console.log(`Successfully parsed ${data.numpages} pages from ${inFile}`);

    // Iterate over PDF pages
    let chunkIndex = 0;
    let currentChunk = '';
    let currentChunkWords = 0;

    const output = [];
    for (let pageIndex = 0; pageIndex < data.pages.length; pageIndex++) {
        console.log(`Parsing page #${pageIndex}...`);

        // Split the item text into words
        let words = data.pages[pageIndex].trim().split(/\s+/);

        // Loop through each word in the item text
        for (const word of words) {
            // Add the word to the current chunk
            currentChunk += word + ' ';
            currentChunkWords++;

            // If the current chunk has reached the maximum number of words, end the chunk at the end of the current sentence
            if (currentChunkWords >= wordsPerChunk) {
                // Find the last sentence in the current chunk
                const lastSentenceEnd = currentChunk.lastIndexOf('.');
                const lastSentenceStart = currentChunk.lastIndexOf('.', lastSentenceEnd - 1);

                // If the last sentence is longer than the maximum chunk length, end the chunk at the maximum chunk length
                if (lastSentenceEnd - lastSentenceStart > wordsPerChunk) {
                    currentChunk = currentChunk.substring(0, lastSentenceStart + 1);
                }

                const regex = /(?<=\S)- /g;
                currentChunk = currentChunk.replace(regex, '');

                // Add the current chunk to the array of chunks and start a new chunk
                output.push({
                    documentTitle: 'WI SPS-382',
                    pageNo: pageIndex + 1,
                    content: currentChunk
                });
                console.log('--------------------------------------\n\n', currentChunk);
                currentChunk = '';
                currentChunkWords = 0;
                chunkIndex++;
            }
        }
    }
    fs.writeFileSync(outFile, JSON.stringify(output));
});
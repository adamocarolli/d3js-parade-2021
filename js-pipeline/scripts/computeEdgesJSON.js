import {loadFileJSON, parseLosslessJSONL} from './JSONL.js';
import {writeEdges} from './computeEdgesTools.js';

async function main(inputFile, inputTweets, outputFile) {
    console.log('Loading vectors...')
    const vectors = await loadFileJSON(inputFile);

    console.log('Mapping tweets to vectors...');
    const dataset = [];
    await parseLosslessJSONL(inputTweets, json => {
        const id = json.id.toString();
        const vector = vectors[id];
        if (!vector) {
            console.log(json);
            throw `CAN'T FIND TWEET ID: ${id}`;
        }

        dataset.push(vector);
    });

    console.log('Writing edges JSONL file...');
    await writeEdges(dataset, 0.7, false, outputFile);
}

if (typeof Deno !== 'undefined') {
    main(...Deno.args);
} else {
    main(...process.argv.slice(2));
}








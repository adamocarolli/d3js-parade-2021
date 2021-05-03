import {parseJSONL} from './JSONL.js'
import {writeEdges} from './computeEdgesTools.js';

async function main(inputFile, outputFile) {
    const dataset = [];
    await parseJSONL(inputFile, json => {
        dataset.push(json);
    });

    console.log('Writing edges JSONL file...');
    await writeEdges(dataset, 0.25, true, outputFile);

    // let r;
    // r = similarity({0: 0.5, 1: 0.5, 2: 0.5}, {0: 0.5, 2: 0.5}, 3) // 0.8164
    // console.log(r);
    //
    // r = similarity({0: 0.5, 1: 0.5, 2: 0.5}, {0: 0.5, 1: 0.5, 2: 0.5}, 3) // 1
    // console.log(r);
    //
    // r = similarity({0: 0.6, 1: 0.7, 2: 0.8}, {0: 0.5}, 3) // 0.4915391523114243
    // console.log(r);
}

if (typeof Deno !== 'undefined') {
    main(...Deno.args);
} else {
    main(...process.argv.slice(2));
}








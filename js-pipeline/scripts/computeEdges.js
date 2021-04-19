import {makeJSONL, parseJSONL} from './JSONL.js'

function similarity(A, B) {
    // A: {index:value..}
    // B: {index:value..}
    let dotProduct = 0;
    let mA = 0;
    let mB = 0;

    let keys = Object.keys(A);
    for (const key of keys) {
        if (B.hasOwnProperty(key)) {
            dotProduct += (A[key] * B[key]);
        }
        mA += (A[key] * A[key]);
    }

    keys = Object.keys(B);
    for (const key of keys) {
        mB += (B[key] * B[key]);
    }

    mA = Math.sqrt(mA);
    mB = Math.sqrt(mB);
    const similarity = (dotProduct) / (mA * mB) // here you needed extra brackets
    return similarity;
}

async function writeEdges(dataset, outputFile) {
    const file = await Deno.open(outputFile, { create: true, write: true, truncate: true });
    const encoder = new TextEncoder();
    const promises = [];
    let count = 0;
    for (let i = 0, n = dataset.length; i < n; ++i) {
        promises.length = 0;
        count = 0;
        for (let ii = i + 1; ii < n; ++ii) {
            const s = similarity(dataset[i], dataset[ii]);
            if (!isNaN(s) && s >= 0.25) {
                ++count;
                promises.push(Deno.writeAll(file, encoder.encode(`${JSON.stringify({
                    source: i,
                    target: ii,
                    score: s,
                })}\n`)));
            }
        }
        await Promise.all(promises);
        console.log(`${i} => ${count}`);
    }
    file.close();
}

async function main(inputFile, outputFile) {
    const dataset = [];
    await parseJSONL(inputFile, json => {
        dataset.push(json);
    });

    console.log('Writing edges JSONL file...');
    await writeEdges(dataset, outputFile);

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








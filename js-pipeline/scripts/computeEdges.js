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

function parseEdges(dataset) {
    const edges = [];
    let count = 0;
    for (let i = 0, n = dataset.length; i < n; ++i) {
        count = 0;
        let time = 0;
        let timeCount = 0;
        for (let ii = i + 1; ii < n; ++ii) {
            const start = performance.now();
            const s = similarity(dataset[i], dataset[ii]);
            const end = performance.now();
            time += end - start;
            ++timeCount;
            if (!isNaN(s) && s >= 0.25) {
                ++count;
                edges.push({
                    source: i,
                    target: ii,
                    score: s,
                });
            }
        }
        console.log(`${i} => ${count}`);
        console.log(`total_time:${time}ms iterations:${timeCount} average_time:${time/timeCount}ms`);
    }
    return edges;
}

async function main(inputFile, outputFile) {
    const dataset = [];
    await parseJSONL(inputFile, json => {
        dataset.push(json);
    });
    const edges = parseEdges(dataset);

    console.log('Writing edges JSONL file...');
    await Deno.writeTextFile(outputFile, makeJSONL(edges));


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








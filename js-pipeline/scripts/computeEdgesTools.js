export function similarity_sparse(A, B) {
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
    return (dotProduct / (mA * mB)); // here you needed extra brackets
}

export function similarity_dense(A, B) {
    // A: {index:value..}
    // B: {index:value..}
    let dotProduct = 0;
    let mA = 0;
    let mB = 0;

    for (let i = 0, n = A.length; i < n; ++i) {
        dotProduct += (A[i] * B[i]);
        mA += (A[i] * A[i]);
        mB += (B[i] * B[i]);
    }

    mA = Math.sqrt(mA);
    mB = Math.sqrt(mB);
    return (dotProduct / (mA * mB)); // here you needed extra brackets
}

export async function writeEdges(dataset, minSimilarity, sparse, outputFile) {
    const file = await Deno.open(outputFile, { create: true, write: true, truncate: true });
    const encoder = new TextEncoder();
    const promises = [];
    const similarity = sparse ? similarity_sparse : similarity_dense;
    let count = 0;
    for (let i = 0, n = dataset.length; i < n; ++i) {
        promises.length = 0;
        count = 0;
        for (let ii = i + 1; ii < n; ++ii) {
            const s = similarity(dataset[i], dataset[ii]);
            if (!isNaN(s) && s >= minSimilarity) {
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

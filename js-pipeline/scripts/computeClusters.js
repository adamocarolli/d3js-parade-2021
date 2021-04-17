import {makeJSONL, parseJSONL, loadFileJSON} from './JSONL.js'
import {packEnclose} from 'https://cdn.skypack.dev/d3-hierarchy/src/pack/siblings.js';


function easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3);

}

function getTerms(terms, embedding) {
    const keys = Object.keys(embedding);
    const result = [];
    for (const key of keys) {
        result.push(terms[parseInt(key, 10)]);
    }
    return result;
}

function makeCluster(id, score, ...children) {
    const cluster = {
        id,
        score,
        children: children,
        parent: null,
    };
    for (const child of children) {
        child.parent = cluster;
    }
    return cluster;
}

function joinCluster(clusterA, clusterB, clusters) {
    if (clusterA !== clusterB) {
        for (const child of clusterB.children) {
            clusterA.children.push(child);
            child.parent = clusterA;
        }
        clusters[clusterB.id] = null;
    }
}

function findCommonAncestor(a, b) {
    const aParents = [];
    const bParents = [];
    let node;

    node = a;
    while (node.parent) {
        aParents.push(node.parent);
        node = node.parent;
    }

    node = b;
    while (node.parent) {
        bParents.push(node.parent);
        node = node.parent;
    }

    for (const parent of aParents) {
        if (bParents.includes(parent)) {
            return parent;
        }
    }
    return null;
}

function getTopMostAncestor(node) {
    let parent = node;
    while (parent.parent) {
        parent = parent.parent;
    }
    return parent;
}

function addChildrenToLevel(cluster, levels, currentLevel) {
    const level = currentLevel + 1;
    if (!levels[level]) {
        levels[level] = [];
    }

    for (const child of cluster.children) {
        if (child.children) {
            levels[level].push(child);
            addChildrenToLevel(child, levels, level);
        }
    }
}

const kPaddingMult = 1.1;
function addChildrenToOutput(cluster, points, nodes, clusters) {
    for (const node of cluster.children) {
        const pointID = points.length;

        // offset the points by the cluster's position
        node.x += cluster.x;
        node.y += cluster.y;

        points.push({
            id: pointID,
            x: node.x,
            y: node.y,
            z: 0,
            radius: node.children ? node.r / kPaddingMult : 1,
        });

        if (node.children) {
            clusters.push({
                id: `c-${node.id}`,
                point: pointID,
                label: node.name || ' ',
            });
            addChildrenToOutput(node, points, nodes, clusters);
        } else {
            nodes.push({
                id: `n-${node.id}`,
                point: pointID,
                label: node.name || ' ',
            });
        }
    }
}

let gID = 0;
function addChildren(parent, children) {
    for (const child of children) {
        let node;
        if (child.children) {
            node = {
                id: gID++,
                x: 0,
                y: 0,
                name: `[${child.id}] Cluster ${child.score}`,
                children: [],
            }
            addChildren(node, child.children);
        } else {
            node = {
                id: gID++,
                x: 0,
                y: 0,
                r: 1,
                name: `[${child.id}] Node`,
            }
        }
        parent.children.push(node);
    }
}

function buildHierarchy(nodes, clusters, embeddings, terms) {
    const root = {
        id: 'c-root',
        children: [],
        x: 0,
        y: 0,
    };

    // find clusters without a parent
    const rootChildren = [];
    for (const cluster of clusters) {
        if (cluster && cluster.parent === null) {
            rootChildren.push(cluster);
        }
    }

    // find all nodes without a parent
    // for (const node of nodes) {
    //     if (node.parent === null) {
    //         rootChildren.push(node);
    //     }
    // }

    addChildren(root, rootChildren);

    const levels = [[root]];
    addChildrenToLevel(root, levels, 0);

    // pack circles by levels in reverse order
    for (let i = levels.length - 1; i >= 0; --i) {
        for (const cluster of levels[i]) {
            const radius = packEnclose(cluster.children);
            cluster.r = radius * 1.05 * kPaddingMult;
        }
    }

    const outPoints = [];
    const outNodes = [];
    const outClusters = [];

    addChildrenToOutput(root, outPoints, outNodes, outClusters);

    return {
        outPoints,
        outNodes,
        outClusters,
    }
}

async function main(inputFile, outputPath) {
    const scores = new Map();

    for (let i = 0.25; i <= 1.01; i += 0.05) {
        scores.set(i.toFixed(2), []);
    }

    console.log('Loading terms...');
    const terms = await loadFileJSON('../data/adam_d3js_terms.json');

    console.log('Loading embeddings...');
    const embeddings = [];
    await parseJSONL('../data/adam_d3js_embeddings.jsonl', json => {
        embeddings.push(json);
    })

    console.log('Loading tweets...');
    const tweets = [];
    await parseJSONL('../data/adam_d3js/d3js.json', json => {
        tweets.push(json.tweet);
    });

    console.log('Loading edges...');
    const nodes = new Map();
    const edges = [];
    await parseJSONL(inputFile, json => {
        const normalized = (json.score - 0.25) / 0.75;
        const scaled = easeOutCubic(normalized);
        const score = scaled * 0.75 + 0.25;
        const key = (Math.floor(score * 20) / 20).toFixed(2);
        if (!scores.has(key)) {
            scores.set(key, []);
        }
        scores.get(key).push(edges.length);
        edges.push(json);

        if (!nodes.has(json.source)) {
            nodes.set(json.source, {
                id: json.source,
                tweet: tweets[json.source],
                parent: null,
            });
        }

        if (!nodes.has(json.target)) {
            nodes.set(json.target, {
                id: json.target,
                tweet: tweets[json.target],
                parent: null,
            });
        }

        // if (key === '0.80') {
        //     console.log('================================================');
        //     console.log(`${tweets[json.source]} => [${getTerms(terms, embeddings[json.source])}]`);
        //     console.log(`${tweets[json.target]} => [${getTerms(terms, embeddings[json.target])}]`);
        //     console.log('================================================');
        // }
    });

    console.log('Generating clusters...');
    const clusters = [];
    for (let i = 1.0; i >= 0.24; i -= 0.05) {
        const key = i.toFixed(2);
        const scoreEdges = scores.get(key);
        const interEdges = [];
        for (const edgeID of scoreEdges) {
            const edge = edges[edgeID];
            const a = nodes.get(edge.source);
            const b = nodes.get(edge.target);

            const aCluster = a.parent;
            const bCluster = b.parent;

            if (!aCluster && !bCluster) {
                clusters.push(makeCluster(clusters.length, key, a, b));
            } else if (aCluster && !bCluster) {
                if (aCluster.score === key) {
                    aCluster.children.push(b);
                    b.parent = aCluster;
                } else {
                    // clusters.push(makeCluster(clusters.length, key, b));
                    interEdges.push(edge)
                }
            } else if (bCluster && !aCluster) {
                if (bCluster.score === key) {
                    bCluster.children.push(a);
                    a.parent = bCluster;
                } else {
                    // clusters.push(makeCluster(clusters.length, key, a));
                    interEdges.push(edge);
                }
            } else {
                if (aCluster.score === key && bCluster.score === key) {
                    joinCluster(aCluster, bCluster, clusters);
                } else {
                    interEdges.push(edge);
                }
            }
        }

        // solve inter edges
        for (const edge of interEdges) {
            const a = nodes.get(edge.source);
            const b = nodes.get(edge.target);

            if (!findCommonAncestor(a, b)) {
                const aCluster = getTopMostAncestor(a);
                const bCluster = getTopMostAncestor(b);
                if (aCluster.score === key && bCluster.score === key) {
                    joinCluster(aCluster, bCluster, clusters);
                } else if (aCluster.score === key) {
                    aCluster.children.push(bCluster);
                    bCluster.parent = aCluster;
                } else if (bCluster.score === key) {
                    bCluster.children.push(aCluster);
                    aCluster.parent = bCluster;
                } else {
                    clusters.push(makeCluster(clusters.length, key, aCluster, bCluster));
                }
            }
        }
    }

    // console.log(clusters);

    console.log('Building hierarchy...');
    const { outPoints, outNodes, outClusters } = buildHierarchy(nodes, clusters, embeddings, terms);

    console.log('Writing points JSONL file...');
    await Deno.writeTextFile(`${outputPath}/points.jsonl`, makeJSONL(outPoints));

    console.log('Writing nodes JSONL file...');
    await Deno.writeTextFile(`${outputPath}/nodes.jsonl`, makeJSONL(outNodes));

    console.log('Writing clusters JSONL file...');
    await Deno.writeTextFile(`${outputPath}/clusters.jsonl`, makeJSONL(outClusters));

}

if (typeof Deno !== 'undefined') {
    main(...Deno.args);
} else {
    main(...process.argv.slice(2));
}

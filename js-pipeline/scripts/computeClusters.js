import {makeJSONL, parseJSONL, loadFileJSON} from './JSONL.js'
import {computeClusterLabel} from './computeClusterLabels.js';
import {computeCurrentLevelsLayout} from './computeClusterLayout.js';


function easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3);

}

function getTerms(terms, embedding) {
    const keys = Object.keys(embedding);
    const result = [];
    for (const key of keys) {
        result.push({
            score: embedding[key],
            term: terms[parseInt(key, 10)],
        });
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

const kPaddingMult = 1.1;
function addChildrenToOutput(cluster, points, nodes, clusters) {
    for (const node of cluster.children) {
        const pointID = points.length;

        // offset the points by the cluster's position
        try {
            node.x += cluster.x;
            node.y += cluster.y;
        } catch (e) {
            console.log(node);
            throw e;
        }

        points.push({
            id: pointID,
            x: node.x,
            y: node.y,
            z: 0,
            radius: node.children ? node.r / kPaddingMult : node.r / 2,
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
                tweet: node.tweet,
            });
            node.ptr.pointID = pointID;
        }
    }
}

function addEdgesToOutput(nodes, edges, out) {
    for (const edge of edges) {
        const source = nodes.get(edge.source);
        const target = nodes.get(edge.target);
        if ('pointID' in source && 'pointID' in target) {
            out.push({
                id: out.length,
                source: source.pointID,
                target: target.pointID,
            });
        }
    }
}

function makeNode(id, tweets, terms, embeddings) {
    const tweet = tweets[id];
    return {
        id,
        tweetID: `${tweet.link.split('/').pop()}`,
        tweet: { author: tweet.name, user: tweet.username, text: tweet.tweet },
        _tweet: tweet,
        terms: getTerms(terms, embeddings[id]),
        parent: null,
    };
}

const kNumberToMonth = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December',
}

function addNodeToBaseCluster(node, baseClusters) {
    const date = node._tweet.date;
    const components = date.split('-');
    const year = components[0];
    const month = components[1];

    let yearCluster = baseClusters.get(year);
    if (!yearCluster) {
        yearCluster = {
            id: `y-${year}`,
            months: new Map(),
            children: [],
            parent: null,
            score: -1,
            label: `[${year}]`,
            _value: parseInt(year, 10),
        }
        baseClusters.set(year, yearCluster);
    }

    let monthCluster = yearCluster.months.get(month);
    if (!monthCluster) {
        monthCluster = {
            id: `m-${month}`,
            nodes: new Map(),
            children: [],
            parent: yearCluster,
            score: -1,
            label: `[${year} - ${kNumberToMonth[month]}]`,
            _value: parseInt(month, 10),
        }
        yearCluster.months.set(month, monthCluster);
        yearCluster.children.push(monthCluster);
    }

    monthCluster.nodes.set(node.id, node);
}

function computeLayout(clusters) {
    const data = [
        // clusters.get('2009'),
        // clusters.get('2010'),
        // clusters.get('2011'),
        ...clusters.values(),
    ]
    return computeCurrentLevelsLayout(data, 0.1, 2, kPaddingMult);
}

function unfoldLayout(root, nodes, edges) {
    const outPoints = [];
    const outNodes = [];
    const outClusters = [];
    const outEdges = [];

    const fauxRoot = {
        children: [root],
        x: 0,
        y: 0,
    }
    addChildrenToOutput(fauxRoot, outPoints, outNodes, outClusters);
    addEdgesToOutput(nodes, edges, outEdges);

    return {
        outPoints,
        outNodes,
        outClusters,
        outEdges,
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
    });

    console.log('Loading tweets...');
    const tweets = [];
    await parseJSONL('../data/adam_d3js/d3js.json', json => {
        tweets.push(json);
    });

    console.log('Loading edges...');
    const baseClusters = new Map();
    const allNodes = new Map();
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

        if (!allNodes.has(json.source)) {
            const node = makeNode(json.source, tweets, terms, embeddings);
            allNodes.set(json.source, node);
            addNodeToBaseCluster(node, baseClusters);
        }

        if (!allNodes.has(json.target)) {
            const node = makeNode(json.target, tweets, terms, embeddings);
            allNodes.set(json.target, node);
            addNodeToBaseCluster(node, baseClusters);
        }

        // if (key === '0.80') {
        //     console.log('================================================');
        //     console.log(`${tweets[json.source]} => [${getTerms(terms, embeddings[json.source])}]`);
        //     console.log(`${tweets[json.target]} => [${getTerms(terms, embeddings[json.target])}]`);
        //     console.log('================================================');
        // }
    });

    console.log('Generating clusters...');
    const allClusters = [];
    const validEdges = [];
    // this could be a lot faster, but this is ok for now
    for (const year of baseClusters.values()) {
        console.log(`${year.label}: ${year.months.size}`);
        allClusters.push(year);
        for (const month of year.months.values()) {
            console.log(`${month.label}: ${month.nodes.size}`);
            const nodes = month.nodes;
            const clusters = [];
            const interEdges = new Map();

            allClusters.push(month);

            for (let i = 1.0; i >= 0.24; i -= 0.05) {
                const key = i.toFixed(2);
                const scoreEdges = scores.get(key);
                // const interEdges = [];
                for (const edgeID of scoreEdges) {
                    const edge = edges[edgeID];
                    const a = nodes.get(edge.source);
                    const b = nodes.get(edge.target);

                    // if the month doesn't have both nodes
                    if (!a || !b) {
                        continue;
                    }

                    const aCluster = a.parent;
                    const bCluster = b.parent;

                    if (!aCluster && !bCluster) {
                        const cluster = makeCluster(clusters.length, key, a, b);
                        clusters.push(cluster);
                        validEdges.push(edge);
                    } else if (aCluster && !bCluster) {
                        if (aCluster.score === key) {
                            aCluster.children.push(b);
                            b.parent = aCluster;
                            validEdges.push(edge);
                        } else {
                            if (!interEdges.has(key)) {
                                interEdges.set(key, []);
                            }
                            interEdges.get(key).push(edge)
                        }
                    } else if (bCluster && !aCluster) {
                        if (bCluster.score === key) {
                            bCluster.children.push(a);
                            a.parent = bCluster;
                            validEdges.push(edge);
                        } else {
                            if (!interEdges.has(key)) {
                                interEdges.set(key, []);
                            }
                            interEdges.get(key).push(edge)
                        }
                    } else {
                        if (aCluster.score === key && bCluster.score === key) {
                            joinCluster(aCluster, bCluster, clusters);
                            validEdges.push(edge);
                        } else {
                            if (!interEdges.has(key)) {
                                interEdges.set(key, []);
                            }
                            interEdges.get(key).push(edge)
                        }
                    }
                }
            }

            // solve inter edges
            for (const [key, edges] of interEdges) {
                for (const edge of edges) {
                    const a = nodes.get(edge.source);
                    const b = nodes.get(edge.target);

                    if (!findCommonAncestor(a, b)) {
                        const aCluster = getTopMostAncestor(a);
                        const bCluster = getTopMostAncestor(b);
                        if (aCluster.score === key && bCluster.score === key) {
                            // skip for now
                            // joinCluster(aCluster, bCluster, clusters);
                        } else if (aCluster.score === key) {
                            aCluster.children.push(bCluster);
                            bCluster.parent = aCluster;
                        } else if (bCluster.score === key) {
                            bCluster.children.push(aCluster);
                            aCluster.parent = bCluster;
                        } else {
                            const cluster = makeCluster(clusters.length, key, aCluster, bCluster);
                            clusters.push(cluster);
                        }
                    }
                }
            }

            let ci = 0;
            for (const cluster of clusters) {
                if (cluster) {
                    ++ci;
                    allClusters.push(cluster);
                    if (cluster.parent === null) {
                        month.children.push(cluster);
                        cluster.parent = month;
                    }
                    cluster.label = computeClusterLabel(cluster);
                }
            }
            // console.log(`-- CLUSTERS: ${ci}`);

            let oi = 0;
            for (const node of nodes.values()) {
                if (node.parent === null) {
                    ++oi;
                    month.children.push(node);
                    node.parent = month;
                }
            }
            // console.log(`-- ORPHAN NODES: ${oi}`);
        }
    }

    // console.log(clusters);

    console.log('Computing layout...');
    const root = computeLayout(baseClusters);

    console.log('Unfolding hierarchy...');
    const { outPoints, outNodes, outClusters, outEdges } = unfoldLayout(root, allNodes, validEdges);

    console.log('Writing points JSONL file...');
    await Deno.writeTextFile(`${outputPath}/points.jsonl`, makeJSONL(outPoints));

    console.log('Writing nodes JSONL file...');
    await Deno.writeTextFile(`${outputPath}/nodes.jsonl`, makeJSONL(outNodes));

    console.log('Writing edges JSONL file...');
    await Deno.writeTextFile(`${outputPath}/edges.jsonl`, makeJSONL(outEdges));

    console.log('Writing clusters JSONL file...');
    await Deno.writeTextFile(`${outputPath}/clusters.jsonl`, makeJSONL(outClusters));

}

if (typeof Deno !== 'undefined') {
    main(...Deno.args);
} else {
    main(...process.argv.slice(2));
}

import {packEnclose} from 'https://cdn.skypack.dev/d3-hierarchy/src/pack/siblings.js';

let gID = 0;
function addChildren(parent, children, nodeRadius) {
    for (const child of children) {
        let node;
        if (child.children) {
            node = {
                id: gID++,
                x: 0,
                y: 0,
                name: child.label,
                children: [],
            }
            addChildren(node, child.children, nodeRadius);
        } else {
            node = {
                id: gID++,
                x: 0,
                y: 0,
                r: nodeRadius * 2,
                name: `${child.tweetID}`,
                tweet: child.tweet,
                ptr: child,
            }
        }
        parent.children.push(node);
    }
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

function buildHierarchy(cluster, nodeRadius, paddingMult) {
    const root = {
        id: 'c-root',
        children: [],
        x: 0,
        y: 0,
    };

    // find clusters without a parent
    const rootChildren = [cluster];
    // for (const cluster of clusters) {
    //     if (cluster && cluster.parent === null) {
    //         rootChildren.push(cluster);
    //     }
    // }

    addChildren(root, rootChildren, nodeRadius);

    const levels = [[root]];
    addChildrenToLevel(root, levels, 0);

    // pack circles by levels in reverse order
    for (let i = levels.length - 1; i >= 0; --i) {
        for (const cluster of levels[i]) {
            const radius = packEnclose(cluster.children);
            cluster.r = radius * 1.05 * paddingMult;
        }
    }

    return root.children[0];
}

/* ================================================================================
 *  CALCULATE SPIRAL LAYOUT
 * ================================================================================
 */

// Determine how much a circle is colliding by
const circleOverlap = (c1, c2) => {
    const x = c2.x - c1.x;
    const y = c2.y - c1.y;
    const len = Math.sqrt(x ** 2 + y ** 2);
    return (c1.r + c2.r) - len;
}

export const computeLayout = (yearClusters, nodeRadius, paddingMult = 0.1) => {
    // Sort years in ascending order
    yearClusters = yearClusters.sort((y1, y2) => y1._value - y2._value);

    // Keep a reference to all monthly clusters
    const monthClusters = [];

    // 1. Compute the max radius among all months
    for (const yearCluster of yearClusters) {
        let monthClustersOfCurrYear = yearCluster.children;
        // Sort month clusters in ascending order
        monthClustersOfCurrYear = monthClustersOfCurrYear.sort((m1, m2) => m1._value - m2._value);
        for (const monthCluster of monthClustersOfCurrYear) {
            // Circle pack each month cluster
            monthClusters.push(monthCluster);
        }
    }


    const packedMonthClusters = [];
    let radiusSum = 0;
    for (let i = 0, n = monthClusters.length; i < n; ++i) {
        const packedMonthCluster = buildHierarchy(monthClusters[i], nodeRadius * i, paddingMult);
        radiusSum += packedMonthCluster.r;
        packedMonthClusters.push(packedMonthCluster);
    }

    let angle = 0;
    let x = 1, y = 1;
    let len;
    let currentRevolutionSpacing = 40;
    let currRevolutionClusters = [];

    // 3. Compute the center point of every month cluster
    for (let i = 0, n = packedMonthClusters.length; i < n; ++i) {
        const packedMonthCluster = packedMonthClusters[i];

        len = Math.sqrt(x ** 2 + y ** 2);
        angle += Math.atan2(packedMonthCluster.r, len);

        let hasOverlap = true;
        while(hasOverlap) {
            x = Math.cos(angle) * currentRevolutionSpacing;
            y = Math.sin(angle) * currentRevolutionSpacing;

            // Scale the nodes with the current circle's radius ratio of the spiral
            packedMonthCluster.x = x;
            packedMonthCluster.y = y;
            hasOverlap = currRevolutionClusters.some(currentRevolutionCluster =>
                circleOverlap(currentRevolutionCluster, packedMonthCluster) > 0);
            if(hasOverlap) {
                currentRevolutionSpacing += 0.1;
            }
        }

        len = Math.sqrt(x ** 2 + y ** 2);
        angle += Math.atan2(packedMonthCluster.r, len);

        currRevolutionClusters.push(packedMonthCluster);
    }

    return packedMonthClusters;
}

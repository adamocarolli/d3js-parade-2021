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

// https://en.wikipedia.org/wiki/Fermat%27s_spiral
// https://en.wikipedia.org/wiki/Archimedean_spiral
// https://en.wikipedia.org/wiki/Golden_spiral

function easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3);
}

function easeInCubic(x) {
    return Math.pow(x, 3);
}

function easeInSine(x) {
    return 1 - Math.cos((x * Math.PI) / 2);
}

export const computeLayout = (yearClusters, nodeRadius, paddingMult = 0.1) => { // array of years, each year is a cluster, months as children
    // 1. Compute the max radius among all months
    // 2. Using the max radius among all months compute the distance
    //    between coils of the spiral. To get inputs into Fibonacci Spiral
    // 3. Compute the center point of every month cluster

    // Sort years in ascending order
    yearClusters = yearClusters.sort((y1, y2) => y1._value - y2._value);

    // Keep a reference to all circle packed monthly clusters
    const monthClusters = [];
    // Keep track of the max radius among all circle packed monthly clusters
    // let maxMonthClusterRadius = 0;
    // let sumOfMonthClusterRadiuses = 0;

    // 1. Compute the max radius among all months
    for (const yearCluster of yearClusters) {
        let monthClustersOfCurrYear = yearCluster.children;
        // Sort month clusters in ascending order
        monthClustersOfCurrYear = monthClustersOfCurrYear.sort((m1, m2) => m1._value - m2._value);
        for (const monthCluster of monthClustersOfCurrYear) {
            // Circle pack each month cluster
            // Set the initial curr node result as 1 for the initial calculation to calculate
            // the static radius' of the months cluster
            // const packedMonthCluster = buildHierarchy(monthCluster, 1, paddingMult);
            monthClusters.push(monthCluster);
            // maxMonthClusterRadius = Math.max(maxMonthClusterRadius, packedMonthCluster.r);
            // sumOfMonthClusterRadiuses += packedMonthCluster.r;
        }
    }

    // 2. Using the max radius among all months compute fibonacci spiral
    //    input variables
    // TODO: How to decide angle increment?? (maybe try out a couple manually???)
    // const angleIncrement = Math.PI / 6;
    // const angleIncrement = 2 * Math.PI / 180;
    // TODO: This is an approximate value we should calculate a more
    //       densely packed value somehow
    // Represents the outer most circle in the fibonacci spiral ie.
    // if you made a circle that follows the outermost coils growth

    const packedMonthClusters = [];
    let radiusSum = 0;
    for (let i = 0, n = monthClusters.length; i < n; ++i) {
        const packedMonthCluster = buildHierarchy(monthClusters[i], nodeRadius * i, paddingMult);
        radiusSum += packedMonthCluster.r;
        packedMonthClusters.push(packedMonthCluster);
    }

    const outerCircleRadius = 50000;
    const baseCoilSpacing = 40;

    const coilSpacings = [
        40,
        200,
        1000,
        3000,
        7000,
        14000,
        19000,
        20000,
    ];

    let angleIncrement = 0;
    let x = 1, y = 1;
    let len;
    let currentRadiusSum = 0;
    let currentCoil = 0;
    let currentCoilSpacing = coilSpacings[0];
    let previousCoilRadius = 0;
    // 3. Compute the center point of every month cluster
    for (let i = 0, n = packedMonthClusters.length; i < n; ++i) {
        const packedMonthCluster = packedMonthClusters[i];
        currentRadiusSum += packedMonthCluster.r;

        len = Math.sqrt(x ** 2 + y ** 2);
        angleIncrement += Math.atan2(packedMonthCluster.r, len);

        const ratio = i / n;
        const angle = angleIncrement;
        const coilNumber = Math.floor(angleIncrement / (Math.PI * 2));
        if (coilNumber > currentCoil) {
            currentCoil = coilNumber;
            previousCoilRadius += currentCoilSpacing;
            currentCoilSpacing = coilSpacings[coilNumber];
        }

        const ringPercent = (angleIncrement % (Math.PI * 2)) / (Math.PI * 2);
        const spiralRadius = previousCoilRadius + (currentCoilSpacing * ringPercent);

        x = Math.cos(angle) * spiralRadius;
        y = Math.sin(angle) * spiralRadius;

        len = Math.sqrt(x ** 2 + y ** 2);
        angleIncrement += Math.atan2(packedMonthCluster.r, len);

        // Scale the nodes with the current circle's radius ratio of the spiral
        packedMonthCluster.x = x;
        packedMonthCluster.y = y;
    }

    return packedMonthClusters;
}

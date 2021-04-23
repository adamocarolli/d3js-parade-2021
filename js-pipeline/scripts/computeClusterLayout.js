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
 * CLUSTER LAYOUT 12 MONTH RINGS
 * ================================================================================
 */

/* DARIO!!! */
const k15deg = Math.PI / 12;
function computeClusterCenterRadius(maxMonthRadiusInYear, prevLevelsRadius) {
    const adj = (maxMonthRadiusInYear / Math.tan(k15deg)) * 0.5;
    return Math.max(prevLevelsRadius + maxMonthRadiusInYear, adj);
}

const computeClusterCenterPosition = (monthIndex, radius) => {
    const angle = monthIndex * Math.PI / 6; // 1 radian = (180 degrees)/Math.PI

    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return {x, y};
}

export const computeCurrentLevelsLayout = (years, nodeRadius, nodeMult, paddingMult = 0.1) => { // array of years, each year is a cluster, months as children
    // Order years by ascending order
    years = years.sort((y1, y2) => y1._value - y2._value);

    let currNodeRadius = nodeRadius;
    let prevLevelsRadius = 0;
    let currRootCluster = null;
    for (const year of years) {
        // Compute each rings
        let months = year.children;
        const packedMonthClusters = [];
        months = months.sort((m1, m2) => m2._value - m1._value);

        let maxMonthRadiusInYear = 0;

        // Circle pack each month in the year
        for (const monthCluster of months) {
            const packedMonthCluster = buildHierarchy(monthCluster, currNodeRadius, paddingMult);
            packedMonthClusters.push(packedMonthCluster);
            maxMonthRadiusInYear = Math.max(maxMonthRadiusInYear, packedMonthCluster.r);
        }

        const clusterCenterRadius = computeClusterCenterRadius(maxMonthRadiusInYear, prevLevelsRadius);
        for (let i = 0, n = packedMonthClusters.length; i < n; ++i) {
            const {x, y} = computeClusterCenterPosition(months[i]._value, clusterCenterRadius);
            packedMonthClusters[i].x = x;
            packedMonthClusters[i].y = y;
        }

        // Enclose packed children into ring cluster
        const prevRootCluster = currRootCluster;
        currRootCluster = {
            id: year.id,
            name: year.label,
            x: 0,
            y: 0,
            r: (clusterCenterRadius + maxMonthRadiusInYear) * paddingMult,
            children: packedMonthClusters,
        };

        if (prevRootCluster) {
            currRootCluster.children.push(prevRootCluster);
        }

        currNodeRadius *= nodeMult;
        prevLevelsRadius = clusterCenterRadius + maxMonthRadiusInYear;
    }

    return currRootCluster;
}

const appendTermToTermsScores = (termScores, terms) => {
    for (let i = 0; i < terms.length; i++) {
        const {term, score} = terms[i];
        if (termScores[term])
            termScores[term] += 1;
        else
            termScores[term] = 1;
    }
}

export const computeClusterLabel = (cluster, sep = ' - ') => {
    const clusterStack = [cluster];
    const termScores = {};

    let currCluster;
    while (currCluster = clusterStack.pop()) {
        for (let i = 0; i < currCluster.children.length; i++) {
            const child = currCluster.children[i];
            if (!child.children) {
                const node = child;
                appendTermToTermsScores(termScores, node.terms);
            } else {
                const subCluster = child;
                clusterStack.push(subCluster);
            }
        }
        currCluster = clusterStack.pop();
    }

    const sortedTerms = Object.entries(termScores).sort((a, b) => b[1] - a[1]);
    const formattedTerms = sortedTerms.slice(0, 5).map(t => t[0]).join(sep);
    return `[${cluster.score}] ${formattedTerms}`;
}

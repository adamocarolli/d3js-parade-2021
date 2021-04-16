import json
import math
from time import process_time
from typing import Dict, List, Optional
from sklearn.decomposition import TruncatedSVD
from sklearn.datasets import fetch_20newsgroups
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.feature_extraction.text import HashingVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.feature_extraction import text
from sklearn.preprocessing import Normalizer
from sklearn.pipeline import make_pipeline
from sklearn.cluster import KMeans, MiniBatchKMeans
from scipy.spatial.distance import cosine

import numpy as np

# categories = [
#     'alt.atheism',
#     'talk.religion.misc',
#     'comp.graphics',
#     'sci.space',
# ]
# dataset = fetch_20newsgroups(subset='all', categories=categories, shuffle=True, random_state=42)
#
# labels = dataset.target
# true_k = np.unique(labels).shape[0]


def load_jsonl_file(path: str) -> List:
    file = open(path)
    result = list()

    while True:
        line = file.readline()
        if not line:
            break

        json_obj = json.loads(line)
        # result.append(dict({
        #     'id': json_obj['id'],
        #     'tweet': json_obj['tweet'],
        #     'language': json_obj['language'],
        # }))
        result.append(json_obj['tweet'])

    return result


def cos_similarity(a, b):
    dot_product = 0
    m_a = 0
    m_b = 0

    for i in a.nonzero():
        dot_product += a[i] * b[i]
        m_a += a[i] * a[i]

    for i in b.nonzero():
        m_b += b[i] * b[i]

    m_a = math.sqrt(m_a)
    m_b = math.sqrt(m_b)

    return dot_product / (m_a * m_b)



def build_graph_edges(dataset: List) -> List:
    stop_words = text.ENGLISH_STOP_WORDS.union(["http", "https", "t.co", "amp"])
    vectorizer = TfidfVectorizer(max_df=1.0, max_features=None,
                                 min_df=2, stop_words=stop_words,
                                 use_idf=True)
    X = vectorizer.fit_transform(dataset)
    dense = X.toarray()

    # first pass cosine similarity, start with 1 as it would be basically copies of the same document
    edges = list()

    for i in range(len(dense)):
        print(f'COMPUTING: {i} => ', end='')
        count = 0
        for ii in range(i + 1, len(dense)):
            sim = 1 - cosine(dense[i], dense[ii])
            if not math.isnan(sim) and sim >= 0.25:
                edges.append({
                    'source': i,
                    'target': ii,
                    'score': sim,
                })
                count += 1
            # if sim >= 0.5:
            #     print(sim)
        print(count)

    print(f'TOTAL EDGES FOUND: {len(edges)}')
    return edges


def cluster_tweets(dataset: List, indices: Optional[List], true_k: int, max_depth: int, threshold: int) -> Optional[Dict]:
    if max_depth <= 0:
        return None

    if indices is None:
        raw_data = dataset
    else:
        raw_data = list()
        for i in indices:
            raw_data.append(dataset[i])

    n_features = None
    stop_words = text.ENGLISH_STOP_WORDS.union(["http", "https", "t.co", "amp"])
    # hasher = HashingVectorizer(n_features=n_features,
    #                            stop_words='english', alternate_sign=False,
    #                            norm=None)
    # vectorizer = make_pipeline(hasher, TfidfTransformer())
    vectorizer = TfidfVectorizer(max_df=0.5, max_features=n_features,
                                 min_df=2, stop_words=stop_words,
                                 use_idf=True)

    X = vectorizer.fit_transform(raw_data)

    print("Performing dimensionality reduction using LSA")

    # Vectorizer results are normalized, which makes KMeans behave as
    # spherical k-means for better results. Since LSA/SVD results are
    # not normalized, we have to redo the normalization.
    n_components = min(100, len(vectorizer.get_feature_names()) - 1)
    svd = TruncatedSVD(n_components)
    normalizer = Normalizer(copy=False)
    lsa = make_pipeline(svd, normalizer)

    # X = lsa.fit_transform(X)

    # explained_variance = svd.explained_variance_ratio_.sum()
    # print("Explained variance of the SVD step: {}%".format(
    #     int(explained_variance * 100)))

    minibatch = False
    verbose = True

    if minibatch:
        km = MiniBatchKMeans(n_clusters=true_k, init='k-means++', n_init=1,
                             init_size=1000, batch_size=1000, verbose=verbose)
    else:
        km = KMeans(n_clusters=true_k, init='k-means++', max_iter=100, n_init=1,
                    verbose=verbose)

    km.fit(X)

    clusters = dict()
    cluster_count = 0
    for i in range(len(km.labels_)):
        key = int(km.labels_[i])
        cluster = clusters.get(key)
        if cluster is None:
            cluster = {
                'terms': list(),
                'children': None,
                'indices': list(),
            }
            clusters[key] = cluster
        cluster['indices'].append(i if indices is None else indices[i])
        cluster_count = max(cluster_count, key + 1)

    # print("Top terms per cluster:")
    original_space_centroids = km.cluster_centers_ # svd.inverse_transform(km.cluster_centers_)
    order_centroids = original_space_centroids.argsort()[:, ::-1]
    terms = vectorizer.get_feature_names()
    for i in range(cluster_count):
        # print("Cluster [%d]" % i, end='')
        # print('[%d]:' % len(clusters[i]), end='')
        for ind in order_centroids[i, :10]:
            clusters[i]['terms'].append(terms[ind])
            # print(' %s' % terms[ind], end='')

        if len(clusters[i]['indices']) > threshold:
            try:
                clusters[i]['children'] = cluster_tweets(dataset, clusters[i]['indices'], true_k, max_depth - 1, threshold)
            except:
                print('FUCK YOU PYTHON, YOU CAN\'T TELL ME WHAT TO DO!!!')

            if not clusters[i]['children'] is None:
                clusters[i]['indices'] = None
        # print()

    return clusters


def main() -> None:
    # dataset = load_jsonl_file('../data/adam_d3js/d3js.json')
    # # # print(result)
    # # clusters = cluster_tweets(datset, None, 4, 50, 50)
    # # with open('adam_d3js_clusters.json', 'w') as outfile:
    # #     json.dump(clusters, outfile)
    # # print('TADA!')
    #
    # result = build_graph_edges(dataset)
    # with open('adam_d3js_edges.json', 'w') as outfile:
    #     json.dump(result, outfile)
    # print('TADA!')

    start = process_time()
    np_arr = np.array([i for i in range(100000000)])
    end = process_time()
    print(f'INIT ARRAY TIME: {round(end - start, 5)}')

    start = process_time()
    np_arr += 2
    end = process_time()
    print(f'ADD SCALAR TIME: {round(end - start, 5)}')



if __name__ == "__main__":
    main()

# Cluster 0: library javascript data js based d3 chart visualization dataviz d3js_org
# Cluster 1: svg javascript d3 css js dataviz using data html5 d3js_org
# Cluster 2: d3 js javascript charts data dataviz amp reactjs visualization angular
# Cluster 3: map using interactive dataviz data d3 new make mbostock javascript
# Cluster 4: d3js_org observablehq thanks mbostock d3 like data great reactjs dataviz
# Cluster 5: la en dataviz d3js_org javascript d3 data js meetup rt
# Cluster 6: data javascript visualization new mbostock chart interactive amp rt just
# Cluster 7: dataviz data javascript datascience new interactive d3 visualization amp great
# Cluster 8: gt tutorial dashingd3js d3 js video free follow data svg
# Cluster 9: using animated maps make d3 data d3js_org dataviz visualization javascript

import json
import math
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


def vectorize(dataset: List) -> any:
    stop_words = text.ENGLISH_STOP_WORDS.union(["http", "https", "tco", "t", "co", "amp", "rt", "bitly", "bit", "ly", "js", "d3js", "d3", "javascript", "d3js_org", "gt", "lt", "amp"])
    vectorizer = TfidfVectorizer(max_df=0.25, max_features=None,
                                 min_df=2, stop_words=stop_words,
                                 use_idf=True)
    return vectorizer.fit_transform(dataset), vectorizer.get_feature_names()


def main() -> None:
    dataset = load_jsonl_file('../data/adam_d3js/d3js.json')
    vectors, terms = vectorize(dataset)
    dense = vectors.toarray()

    print('writing...')
    with open('../data/adam_d3js_embeddings.jsonl', 'w') as outfile:
        for entry in dense:
            vector = dict()
            indices = entry.nonzero()[0]
            for i in indices:
                vector[f'{i}'] = entry[i]
            json.dump(vector, outfile)
            outfile.write('\n')

    with open('../data/adam_d3js_terms.json', 'w') as outfile:
        json.dump(terms, outfile)

    print('TADA!')


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

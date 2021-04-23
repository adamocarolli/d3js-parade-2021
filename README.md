d3js-parade-2021

## Pipeline

### 1. Python 
The Python pipeline `./pipeline` computes vectors for each Tweet. ie. `for each Tweet Text -> [FLOATS, ...]`. Run with:
```
python vectorize.py
```
### 2. JavaScript
The JS pipeline `./js-pipeline/scripts/*` is used to: 
* Calculate the similarity scores between vectors computed in the Python pipeline.
```
deno run --allow-read --allow-write computeEdges.js ../../data/adam_d3js_embeddings.jsonl ../../data/adam_d3js_edge_similarity.jsonl
```
* Calculate the clusters using Zombie Clustering (*This is an algorithm we made up in the repo).
```
deno run --allow-read --allow-write computeClusters.js [ARGS]
```
* Compute the layout.
```
deno run --allow-read --allow-write computeClusterLayout.js [ARGS]
```

## Client
The client `./client` can be run locally via. `yarn install` and then `yarn develop`.
Layout files must go in `./layouts` directory for client to pull.
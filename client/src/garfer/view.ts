import {GraferController, GraferControllerData, UX} from '@uncharted.software/grafer';
import {DataFile} from '@dekkai/data-source';

async function parseJSONL(input, cb): Promise<void> {
    const file = await DataFile.fromRemoteSource(input);

    // load 1MB chunks
    const sizeOf16MB = 1024 * 1024;
    const byteLength = await file.byteLength;
    const decoder = new TextDecoder();
    const lineBreak = '\n'.charCodeAt(0);

    for(let offset = 0; offset <= byteLength; offset += sizeOf16MB) {
        const chunkEnd = Math.min(offset + sizeOf16MB, byteLength);
        const chunk = await file.loadData(offset, chunkEnd);
        const view = new DataView(chunk);
        let start = 0;
        for (let i = 0, n = chunk.byteLength; i < n; ++i) {
            if (view.getUint8(i) === lineBreak || offset + i === byteLength) {
                const statementBuffer = new Uint8Array(chunk, start, i - start);
                start = i + 1;

                const str = decoder.decode(statementBuffer);
                const json = JSON.parse(str);

                cb(json);
            }
        }

        if (start < chunk.byteLength) {
            offset -= chunk.byteLength - start;
        }

        // console.log(`${chunkEnd} / ${byteLength} - ${((chunkEnd/byteLength) * 100).toFixed(2)}%`);
    }
}

const kDataPackages = {
    adam_inferred: {
        points: 'layouts/adam_d3js/inferred/points.jsonl',
        clusters: 'layouts/adam_d3js/inferred/clusters.jsonl',
        clusterEdges: null,
        nodes: 'layouts/adam_d3js/inferred/nodes.jsonl',
        nodeEdges: 'layouts/adam_d3js/inferred/edges.jsonl',
    }
}

export class GraferView {
    private container: HTMLElement;
    private controller: GraferController;
    private nodes: Map<string, any>;

    constructor(container: HTMLElement) {
        this.container = container;
        this.nodes = new Map();
    }

    public async init(dataPack: keyof typeof kDataPackages) {
        const data = await this.loadData(kDataPackages[dataPack]);
        this.controller = new GraferController(this.container as HTMLCanvasElement, data);
        this.controller.on(UX.picking.PickingManager.events.click, (event, info) => {
            console.log(this.nodes.get(info.id));
        });
    }

    private async loadData(paths): Promise<GraferControllerData> {
        const points = {
            data: [],
        };

        if (paths.points) {
            await parseJSONL(paths.points, json => {
                points.data.push(json);
            });
        }

        const clusterLayer = {
            name: 'Clusters',
            labels: {
                type: 'RingLabel',
                data: [],
                mappings: {
                    background: (): boolean => false,
                    fontSize: (): number => 14,
                    padding: (): number => 0,
                },
                options: {
                    visibilityThreshold: 160,
                    repeatLabel: -1,
                    repeatGap: 64,
                },
            },
            edges: {
                type: 'ClusterBundle',
                data: [],
                options: {
                    alpha: 0.04,
                    nearDepth: 0.9,
                },
            }
        };

        if (paths.clusters) {
            const nodes = clusterLayer.labels;
            await parseJSONL(paths.clusters, json => {
                nodes.data.push(Object.assign({}, json, {
                    color: 3,
                }));
            });
        }

        if (paths.clusterEdges) {
            const edges = clusterLayer.edges;
            await parseJSONL(paths.clusterEdges, json => {
                edges.data.push(Object.assign({}, json, {
                    sourceColor: 0,
                    targetColor: 0,
                }));
            });
        }

        const nodeLayer = {
            name: 'Nodes',
            nodes: {
                type: 'Circle',
                data: [],
            },
            edges: {
                data: [],
                options: {
                    alpha: 0.55,
                    nearDepth: 0.9,
                },
            },
        };

        if (paths.nodes) {
            const nodes = nodeLayer.nodes;
            await parseJSONL(paths.nodes, json => {
                this.nodes.set(json.id, json);
                nodes.data.push(Object.assign({}, json, {
                    color: 1,
                }));
            });
        }

        if (paths.nodeEdges) {
            const edges = nodeLayer.edges;
            await parseJSONL(paths.nodeEdges, json => {
                edges.data.push(Object.assign({}, json, {
                    sourceColor: 2,
                    targetColor: 2,
                }));
            });
        }

        const colors = [
            '#5e81ac',
            '#d08770',
            '#ebcb8b',
            '#81a1c1',
        ];

        return { points, colors, layers: [ nodeLayer, clusterLayer ] };
    }
}

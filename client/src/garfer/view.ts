import {GraferController, GraferControllerData, UX, GraferLayerData} from '@uncharted.software/grafer';
import {DataFile} from '@dekkai/data-source';
import {EventEmitter} from '@dekkai/event-emitter';
import {mat4, vec2, vec3, vec4} from 'gl-matrix';
import chroma from 'chroma-js';

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
    },
    adam_inferred_flat: {
        points: 'layouts/adam_d3js/inferred_flat/points.jsonl',
        clusters: 'layouts/adam_d3js/inferred_flat/clusters.jsonl',
        clusterEdges: null,
        nodes: 'layouts/adam_d3js/inferred_flat/nodes.jsonl',
        nodeEdges: 'layouts/adam_d3js/inferred_flat/edges.jsonl',
    },
};

export class GraferView extends EventEmitter {
    private container: HTMLElement;
    private nodes: Map<string, any>;
    private colors: any;

    public controller: GraferController;

    constructor(container: HTMLElement) {
        super();
        this.container = container;
        this.nodes = new Map();
        this.colors = this.getColors(container);
        console.log(this.colors);
    }

    public async init(dataPack: keyof typeof kDataPackages): Promise<void> {
        const data = await this.loadData(dataPack in kDataPackages ? kDataPackages[dataPack] : kDataPackages.adam_inferred);
        this.controller = new GraferController(this.container as HTMLCanvasElement, data);
        this.controller.on(UX.picking.PickingManager.events.click, (event, info) => {
            this.emit('node-clicked', this.nodes.get(info.id));
        });
        const color = chroma(this.colors.background).rgba();
        vec4.set(this.controller.viewport.clearColor, color[0] / 255, color[1] / 255, color[2] / 255, color[3]); // background color: white
    }

    public getWorldPointPosition(id: string | number): vec3 {
        const point = this.controller.viewport.graph.getPointIndex(id);
        const result = vec3.create();
        if (point !== null) {
            const view = this.controller.viewport.graph.dataView;
            const index = point * 4 * 4; // bleh
            vec3.set(result,
                view.getFloat32(index, true),
                view.getFloat32(index + 4, true),
                view.getFloat32(index + 8, true)
            );
        }
        return result;
    }

    public worldToPixel(position: vec3): vec2 {
        const camera = this.controller.viewport.camera;
        const renderMatrix = mat4.mul(mat4.create(), camera.projectionMatrix, camera.viewMatrix);
        mat4.mul(renderMatrix, renderMatrix, this.controller.viewport.graph.matrix);

        const projected = vec4.set(vec4.create(), position[0], position[1], position[2], 1);
        vec4.transformMat4(projected, projected, renderMatrix);

        const size = this.controller.viewport.size;
        const x = (projected[0] / projected[3]) * size[0] * 0.5 + size[0] * 0.5;
        const y = (projected[1] / projected[3]) * size[1] * 0.5 + size[1] * 0.5;

        return vec2.set(vec2.create(), x, y);
    }

    private saveColor(key, value, colors, map) {
        const i = colors.indexOf(value);
        if (i === -1) {
            map.set(key, colors.length);
            colors.push(value);
        } else {
            map.set(key, i);
        }
    }

    private getColors(element: HTMLElement): { background: string, values: string[], map: Map<string, number>} {
        const style = getComputedStyle(element);
        const background = style.getPropertyValue('--grafer-background').trim();
        const nodes = style.getPropertyValue('--grafer-nodes').trim();
        const nodeEdges = style.getPropertyValue('--grafer-node-edges').trim();
        const clusters = style.getPropertyValue('--grafer-clusters').trim();
        const clusterEdges = style.getPropertyValue('--grafer-cluster-edges').trim();

        const values = [];
        const map = new Map();

        this.saveColor('nodes', nodes, values, map);
        this.saveColor('nodeEdges', nodeEdges, values, map);
        this.saveColor('clusters', clusters, values, map);
        this.saveColor('clusterEdges', clusterEdges, values, map);

        return {
            background,
            values,
            map,
        }
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

        const clusterLayer: GraferLayerData = {
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
                    visibilityThreshold: 90,
                    repeatLabel: -1,
                    repeatGap: 64,
                    // fade: 0.65,
                    // desaturate: 1.0,
                },
            },
            edges: {
                type: 'ClusterBundle',
                data: [],
                options: {
                    alpha: 0.04,
                    nearDepth: 0.9,
                },
            },
        };

        if (paths.clusters) {
            const nodes = clusterLayer.labels;
            await parseJSONL(paths.clusters, json => {
                nodes.data.push(Object.assign({}, json, {
                    color: this.colors.map.get('clusters'),
                }));
            });
        }

        if (paths.clusterEdges) {
            const edges = clusterLayer.edges;
            await parseJSONL(paths.clusterEdges, json => {
                edges.data.push(Object.assign({}, json, {
                    sourceColor: this.colors.map.get('clusterEdges'),
                    targetColor: this.colors.map.get('clusterEdges'),
                }));
            });
        }

        const nodeLayer: GraferLayerData = {
            name: 'Nodes',
            nodes: {
                type: 'Circle',
                data: [],
            },
            edges: {
                data: [],
                options: {
                    alpha: 0.20,
                    // fade: 0.60,
                    // desaturate: 0.5,
                    nearDepth: 0.9,
                },
            },
        };

        if (paths.nodes) {
            const nodes = nodeLayer.nodes;
            await parseJSONL(paths.nodes, json => {
                this.nodes.set(json.id, json);
                nodes.data.push(Object.assign({}, json, {
                    color: this.colors.map.get('nodes'),
                }));
            });
        }

        if (paths.nodeEdges) {
            const edges = nodeLayer.edges;
            await parseJSONL(paths.nodeEdges, json => {
                edges.data.push(Object.assign({}, json, {
                    sourceColor: this.colors.map.get('nodeEdges'),
                    targetColor: this.colors.map.get('nodeEdges'),
                }));
            });
        }

        const colors = this.colors.values;

        return { points, colors, layers: [ nodeLayer, clusterLayer ] };
    }
}

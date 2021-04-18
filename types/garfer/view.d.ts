import { GraferController } from '@uncharted.software/grafer';
import { EventEmitter } from '@dekkai/event-emitter';
import { vec2, vec3 } from 'gl-matrix';
declare const kDataPackages: {
    adam_inferred: {
        points: string;
        clusters: string;
        clusterEdges: any;
        nodes: string;
        nodeEdges: string;
    };
    adam_inferred_flat: {
        points: string;
        clusters: string;
        clusterEdges: any;
        nodes: string;
        nodeEdges: string;
    };
};
export declare class GraferView extends EventEmitter {
    private container;
    private nodes;
    controller: GraferController;
    constructor(container: HTMLElement);
    init(dataPack: keyof typeof kDataPackages): Promise<void>;
    getWorldPointPosition(id: string | number): vec3;
    worldToPixel(position: vec3): vec2;
    private loadData;
}
export {};

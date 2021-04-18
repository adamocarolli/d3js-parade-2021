import { GraferView } from '../garfer/view';
export declare class TwitterView {
    private element;
    private grafer;
    private canvas;
    private context;
    private container;
    private header;
    private list;
    private tweets;
    private twttr;
    constructor(container: HTMLElement, grafer: GraferView);
    displayTweet(node: any): Promise<void>;
    private initializeEvents;
    private updateLinksCanvas;
    private removeTweet;
    private clearTweets;
    private makeEmptyElement;
    private makeContainer;
    private makeHeader;
    private makeList;
    private makeTweetButtons;
    private makeTweetRaw;
}

import {GraferView} from '../garfer/view';
import {vec3} from 'gl-matrix';

export class TwitterView {
    private element: HTMLElement;
    private grafer: GraferView;
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private container: HTMLElement;
    private header: HTMLElement;
    private list: HTMLElement;
    private tweets: Map<string, { element: HTMLElement, point: vec3 }>;
    private twttr: any;

    constructor(container:HTMLElement, grafer: GraferView) {
        this.element = container;
        this.grafer = grafer;
        this.tweets = new Map();
        this.twttr = (window as any).twttr;
        this.container = this.makeContainer();
        this.header = this.makeHeader();
        this.list = this.makeList();

        this.canvas = document.createElement('canvas');
        this.canvas.className = 'twitter-links-canvas';
        this.element.appendChild(this.canvas);

        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width * window.devicePixelRatio;
        this.canvas.height = rect.height * window.devicePixelRatio;

        this.context = this.canvas.getContext('2d');

        this.container.appendChild(this.header);
        this.container.appendChild(this.list);
        this.element.appendChild(this.container);

        this.initializeEvents();
    }

    public async displayTweet(node: any): Promise<void> {
        if (this.tweets.has(node.label)) {
            this.removeTweet(node.label);
        } else {
            const tweetContainer = document.createElement('div');
            tweetContainer.className = 'tweet-container';
            this.list.insertBefore(tweetContainer, this.list.firstChild);

            const buttons = this.makeTweetButtons(node);
            tweetContainer.appendChild(buttons);

            const tweetText = this.makeTweetRaw(node.tweet);
            tweetContainer.appendChild(tweetText);

            const point = this.grafer.getWorldPointPosition(node.point);
            this.tweets.set(node.label, { element: tweetContainer, point });

            const tweet = await this.twttr.widgets.createTweet(
                node.label,
                tweetContainer,
                {
                    // theme: 'dark',
                    width: 250,
                    // cards: 'hidden',
                    conversation: 'none',
                    align: 'center',
                }
            );

            if (tweet) {
                tweetContainer.removeChild(tweetText);
            }
        }
    }

    private initializeEvents(): void {
        let animationFrame = null;
        const animationCallback = (): void => {
            this.updateLinksCanvas();
            animationFrame = null;
        };

        const config = { attributes: true, childList: true, subtree: true };
        const observer = new MutationObserver(() => {
            if (animationFrame === null) {
                animationFrame = requestAnimationFrame(animationCallback);
            }
        });
        observer.observe(this.list, config);

        this.list.addEventListener('scroll', () => {
            if (animationFrame === null) {
                animationFrame = requestAnimationFrame(animationCallback);
            }
        });

        // monkey patch grafer, ugh
        // at some point the ability to listen for render/update events needs to be added to grafer
        const old_render = (this.grafer.controller.viewport as any)._render.bind(this.grafer.controller.viewport);
        (this.grafer.controller.viewport as any)._render = (): void => {
            old_render();
            if (animationFrame === null) {
                animationFrame = requestAnimationFrame(animationCallback);
            }
        };
    }

    private updateLinksCanvas(): void {
        const size = this.grafer.controller.viewport.size;
        this.context.clearRect(0, 0, size[0], size[1]);
        this.context.strokeStyle = '#1877b3';
        this.context.lineWidth = 3;
        for (const tweet of this.tweets.values()) {
            const bb = tweet.element.getBoundingClientRect();
            const point = this.grafer.worldToPixel(tweet.point);

            this.context.beginPath();
            this.context.moveTo(point[0], size[1] - point[1]);
            this.context.lineTo(bb.x * window.devicePixelRatio, (bb.y + bb.height * 0.5) * window.devicePixelRatio);
            this.context.stroke();
        }
    }

    private removeTweet(id: string): void {
        const tweet = this.tweets.get(id);
        if (tweet) {
            tweet.element.parentElement.removeChild(tweet.element);
            this.tweets.delete(id);
        }
    }

    private clearTweets(): void {
        for (const tweet of this.tweets.values()) {
            tweet.element.parentElement.removeChild(tweet.element);
        }
        this.tweets.clear();
    }

    private makeEmptyElement(className: string): HTMLElement {
        const element = document.createElement('div');
        element.className = className;
        return element;
    }

    private makeContainer(): HTMLElement {
        return this.makeEmptyElement('twitter-panel');
    }

    private makeHeader(): HTMLElement {
        const header = this.makeEmptyElement('twitter-header');

        const title = this.makeEmptyElement('twitter-header-title');
        title.innerText = 'D3 Tweets!';
        header.appendChild(title);

        const menu = this.makeEmptyElement('twitter-header-menu');
        const clear = document.createElement('span');
        clear.innerText = 'clear';
        menu.appendChild(clear);
        header.appendChild(menu);

        clear.addEventListener('click', () => {
            this.clearTweets();
        });

        return header;
    }

    private makeList(): HTMLElement {
        return this.makeEmptyElement('twitter-list');
    }

    private makeTweetButtons(tweet: any): HTMLElement {
        const container = document.createElement('div');
        container.className = 'tweet-container-buttons';
        container.textContent = '✖';

        container.addEventListener('click', () => {
            this.removeTweet(tweet.label);
        });

        return container;
    }

    private makeTweetRaw(tweet: any): HTMLElement {
        const tweetRaw = document.createElement('div');
        tweetRaw.className = 'tweet-raw';

        const author = document.createElement('div');
        author.className = 'tweet-raw-author';
        author.textContent = tweet.author;
        tweetRaw.appendChild(author);

        const user = document.createElement('div');
        user.className = 'tweet-raw-user';
        user.textContent = `@${tweet.user}`;
        tweetRaw.appendChild(user);

        const text = document.createElement('div');
        text.className = 'tweet-raw-text';
        text.textContent = tweet.text;
        tweetRaw.appendChild(text);

        return tweetRaw;
    }
}

import {Tweet} from './tweet.js';

export class TwitterView {
    constructor(container, grafer) {
        this.element = container;
        this.grafer = grafer;
        this.tweets = new Map();
        this.twttr = window.twttr;
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

        const style = getComputedStyle(container);
        this.linkColor = style.getPropertyValue('--tweet-to-node').trim();
        this.tweetTheme = style.getPropertyValue('--tweet-theme').trim();

        this.initializeEvents();
    }

    initializeEvents() {
        let animationFrame = null;
        const animationCallback = () => {
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
        const old_render = this.grafer.controller.viewport._render.bind(this.grafer.controller.viewport);
        this.grafer.controller.viewport._render = () => {
            old_render();
            if (animationFrame === null) {
                animationFrame = requestAnimationFrame(animationCallback);
            }
        };
    }

    updateLinksCanvas() {
        const listBB = this.list.getBoundingClientRect();
        const size = this.grafer.controller.viewport.size;
        this.context.clearRect(0, 0, size[0], size[1]);
        this.context.strokeStyle = this.linkColor;
        this.context.lineWidth = 3;

        for (const info of this.tweets.values()) {
            const bb = info.tweet.element.getBoundingClientRect();
            const point = this.grafer.worldToPixel(info.point);

            let tweetY = bb.y + bb.height * 0.5;

            if (tweetY < listBB.top) {
                tweetY = listBB.top - (listBB.top - tweetY) * 0.025;
            } else if (tweetY > listBB.bottom) {
                tweetY = listBB.bottom + (tweetY - listBB.bottom) * 0.025;
            }

            this.context.beginPath();
            this.context.moveTo(point[0], size[1] - point[1]);
            this.context.lineTo(bb.x * window.devicePixelRatio, tweetY * window.devicePixelRatio);
            this.context.stroke();
        }
    }

    async displayTweet(node) {
        if (this.tweets.has(node.label)) {
            this.removeTweet(node.label);
        } else {
            const tweet = new Tweet(this.list, node, this.twttr, this.tweetTheme, () =>{
                this.removeTweet(node.label);
            });

            const point = this.grafer.getWorldPointPosition(node.point);
            this.tweets.set(node.label, { tweet, point });
        }
    }

    removeTweet(id) {
        const info = this.tweets.get(id);
        if (info) {
            info.tweet.remove();
            this.tweets.delete(id);
        }
    }

    clearTweets() {
        for (const info of this.tweets.values()) {
            info.tweet.remove();
        }
        this.tweets.clear();
    }

    makeEmptyElement(className) {
        const element = document.createElement('div');
        element.className = className;
        return element;
    }

    makeContainer() {
        return this.makeEmptyElement('twitter-panel');
    }

    makeHeader() {
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

    makeList() {
        return this.makeEmptyElement('twitter-list');
    }
}

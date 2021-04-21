import {EventEmitter} from '@dekkai/event-emitter';

export class Tweet extends EventEmitter {
    constructor(container, node, twttr, theme, closeCB) {
        super();
        this.container = container;
        this.element = document.createElement('div');
        this.element.classList.add('tweet-container', 'collapsable');
        this.container.insertBefore(this.element, this.container.firstChild);
        this.label = node.label;
        this.active = true;
        this.transitioning = false;

        const buttons = this.makeTweetButtons(closeCB);
        this.element.appendChild(buttons);

        const tweetText = this.makeTweetRaw(node.tweet);
        this.element.appendChild(tweetText);

        this.element.addEventListener('transitionstart', () => {
            this.transitioning = true;
            this.emitUpdate();
        });

        this.element.addEventListener('transitionend', () => {
            this.transitioning = false;
        });

        twttr.widgets.createTweet(
            node.label,
            this.element,
            {
                theme,
                width: 250,
                // cards: 'hidden',
                conversation: 'none',
                align: 'center',
            }
        ).then(tweet => {
            if (tweet) {
                this.element.removeChild(tweetText);
            }
            this.updateHeight();
        });

        this.element.style.height = '0';
        requestAnimationFrame(() => {
            this.updateHeight();
        });
    }

    remove() {
        this.active = false;
        this.element.style.height = '0';
        this.element.style.opacity = '0';
        this.element.style.margin = '0';
        this.element.style.padding = '0';
        this.element.addEventListener('transitionend', () => {
            if (this.container) {
                this.container.removeChild(this.element);
                this.emit('removed', this);
                this.container = null;
            }
        });
    }

    emitUpdate() {
        if (this.transitioning) {
            this.emit('updated', this);
            requestAnimationFrame(() => {
                this.emitUpdate();
            });
        }
    }

    updateHeight() {
        if (this.active) {
            const oldHeight = this.element.getBoundingClientRect().height;
            this.element.classList.remove('collapsable');
            this.element.style.height = 'auto';
            const newHeight = this.element.getBoundingClientRect().height;
            this.element.classList.add('collapsable');
            this.element.style.height = `${oldHeight}px`;

            requestAnimationFrame(() => this.element.style.height = `${newHeight}px`);
        }
    }

    makeTweetButtons(closeCB) {
        const container = document.createElement('div');
        container.className = 'tweet-container-buttons';
        container.textContent = '✖';

        container.addEventListener('click', closeCB);

        return container;
    }

    makeTweetRaw(tweet) {
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

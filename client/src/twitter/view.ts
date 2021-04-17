
export class TwitterView {
    private element: HTMLElement;
    private container: HTMLElement;
    private header: HTMLElement;
    private list: HTMLElement;
    private tweets: Map<string, HTMLElement>;
    private twttr: any;

    constructor(container:HTMLElement) {
        this.element = container;
        this.tweets = new Map();
        this.twttr = (window as any).twttr;
        this.container = this.makeContainer();
        this.header = this.makeHeader();
        this.list = this.makeList();

        this.container.appendChild(this.header);
        this.container.appendChild(this.list);
        this.element.appendChild(this.container);
    }

    public async displayTweet(node: any) {
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

            this.tweets.set(node.label, tweetContainer);

            const tweet = await this.twttr.widgets.createTweet(
                node.label,
                tweetContainer,
                {
                    theme: 'dark',
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

    private removeTweet(id: string) {
        const tweet = this.tweets.get(id);
        if (tweet) {
            tweet.parentElement.removeChild(tweet);
            this.tweets.delete(id);
        }
    }

    private clearTweets() {
        for (const tweet of this.tweets.values()) {
            tweet.parentElement.removeChild(tweet);
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

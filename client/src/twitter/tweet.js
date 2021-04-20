
export class Tweet {
    constructor(container, node, twttr, theme, closeCB) {
        this.container = container;
        this.element = document.createElement('div');
        this.element.className = 'tweet-container';
        this.container.insertBefore(this.element, this.container.firstChild);

        const buttons = this.makeTweetButtons(closeCB);
        this.element.appendChild(buttons);

        const tweetText = this.makeTweetRaw(node.tweet);
        this.element.appendChild(tweetText);

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
        });
    }

    remove() {
        this.container.removeChild(this.element);
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

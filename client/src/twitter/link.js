
export class Link {
    constructor(point, grafer) {
        this.point = point;
        this.lastTime = 0;
        this.progress = 0;
        this.maxProgress = 150;
        this.mult = 1;
        this.grafer = grafer;
        this.animating = false;
    }

    setAnimation(animation) {
        this.animating = true;
        this.lastTime = performance.now();
        this.mult = animation === 'remove' ? -1 : 1;
    }

    draw(context, tweet, listBB, size) {
        const bb = tweet.element.getBoundingClientRect();
        const point = this.grafer.worldToPixel(this.point);

        let tweetY = bb.y + bb.height * 0.5;

        if (tweetY < listBB.top) {
            tweetY = listBB.top - (listBB.top - tweetY) * 0.025;
        } else if (tweetY > listBB.bottom) {
            tweetY = listBB.bottom + (tweetY - listBB.bottom) * 0.025;
        }

        const startX = point[0];
        const startY = size[1] - point[1];
        let endX = bb.x * window.devicePixelRatio;
        let endY = tweetY * window.devicePixelRatio;

        if (this.animating) {
            const time = performance.now();
            const progress = time - this.lastTime;
            this.lastTime = time;

            this.progress += progress * this.mult;
            if (this.mult > 0 && this.progress >= this.maxProgress) {
                this.progress = this.maxProgress;
                this.animating = false;
            } else if (this.mult < 0 && this.progress <= 0) {
                this.progress = 0;
                this.animating = false;
            }
        }

        const len = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
        endX = startX + ((endX - startX) / len) * (this.progress / this.maxProgress) * len;
        endY = startY + ((endY - startY) / len) * (this.progress / this.maxProgress) * len;

        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(endX, endY);
        context.stroke();
    }
}

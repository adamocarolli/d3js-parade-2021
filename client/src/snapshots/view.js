import {vec3} from 'gl-matrix';
import {easeInOutCubic} from '../utils/easings';

const tweetDelay = 200;
const animationDuration = 1500;
const maxAnimationDuration = 20000;

export class SnapshotsView {
    constructor(container, grafer, twitter) {
        this.element = container;
        this.grafer = grafer;
        this.twitter = twitter;
        this.transitioning = false;

        this.createSnapshotMenu();
    }

    createSnapshotMenu() {
        const el = document.createElement('div');
        el.className = 'snapshot-menu';

        const snapshots = [];
        let current = -1;
        // const props = {
        //     title: 'Title',
        //     description: 'Add description here..',
        // };

        this.createSnapshotButton(el, 'TAKE SNAPSHOT', () => {
            const cameraPosition = new Float32Array(this.grafer.controller.viewport.camera.position);
            const nodes = [];
            for (const info of this.twitter.tweets.values()) {
                nodes.push(info.tweet.node.id);
            }

            current = snapshots.length;
            snapshots.push({
                cameraPosition,
                nodes,
            });
            console.log(snapshots[snapshots.length - 1]);
        });

        this.createSnapshotButton(el, 'PREVIOUS', () => {
            if (!this.transitioning && current > 0) {
                this.showSnapshot(snapshots[--current]);
            }
        });

        this.createSnapshotButton(el, 'NEXT', () => {
            if (!this.transitioning && current < snapshots.length - 1) {
                this.showSnapshot(snapshots[++current]);
            }
        });
        // this.createDescriptionInputField(el, props, (props) => () => {
        //     console.log(`Hello: ${props.description}`);
        // });

        this.element.appendChild(el);
    }

    showSnapshot(info) {
        const self = this;
        this.transitioning = true;

        const startPosition = vec3.clone(this.grafer.controller.viewport.camera.position);
        const normal = vec3.subtract(vec3.create(), info.cameraPosition, startPosition);
        const distance = vec3.len(normal);
        vec3.set(normal, normal[0] / distance, normal[1] / distance, normal[2] / distance);

        const targetTime = Math.min(maxAnimationDuration, animationDuration * Math.max(1.0, Math.abs(info.cameraPosition[2] - startPosition[2]) * 0.001));
        let currentTime = 0;
        let time = performance.now();

        const animate = () => {
            if (currentTime >= targetTime) {
                this.transitioning = false;
                this.grafer.controller.viewport.camera.position = info.cameraPosition;
            } else {
                const progress = easeInOutCubic(currentTime / targetTime);
                this.grafer.controller.viewport.camera.position[0] = startPosition[0] + normal[0] * distance * progress;
                this.grafer.controller.viewport.camera.position[1] = startPosition[1] + normal[1] * distance * progress;
                this.grafer.controller.viewport.camera.position[2] = startPosition[2] + normal[2] * distance * progress;
                const now = performance.now();
                currentTime += now - time;
                time = now;
                requestAnimationFrame(() => animate());

            }
            this.grafer.controller.render();
        };
        animate();
        // this.grafer.controller.viewport.camera.position = info.cameraPosition;

        function updateTweets() {
            // TODO: Track positioning of Tweets during the snapshot and then re-add them
            //       in the same order to avoid "crossed-wires".

            // Find Tweets to add/remove by comparing the differences between current tweets
            // and the the snapshots tweets
            const snapshotTweets = new Set();
            const snapshotTweetsToNodesMap = new Map();
            for (const nodeID of info.nodes) {
                const node = self.grafer.nodes.get(nodeID);
                snapshotTweets.add(node.label);
                snapshotTweetsToNodesMap.set(node.label, node);
            }
            const currentTweets = new Set(self.twitter.tweets.keys());

            // Get tweets to remove
            const tweetsToRemove = [...currentTweets].filter(tweet => !snapshotTweets.has(tweet));
            // Get tweets to append
            const tweetsToAdd = [...snapshotTweets].filter(tweet => !currentTweets.has(tweet));

            // Update tweets
            let delay = targetTime * 0.1;
            for (const tweet of tweetsToRemove) {
                setTimeout(() => self.twitter.removeTweet(tweet), delay);
                delay += tweetDelay;
            }
            delay = targetTime * 0.9;
            for (const tweet of tweetsToAdd) {
                setTimeout(() => self.twitter.displayTweet(snapshotTweetsToNodesMap.get(tweet)), delay);
                delay += tweetDelay*3;
            }
        }
        updateTweets();
    }

    createSnapshotButton(container, text, cb) {
        const el = document.createElement('div');
        el.className = 'snapshot-button';
        el.innerText = text;

        el.addEventListener('click', cb);
        container.appendChild(el);
    }

    // createDescriptionInputField(container, props, cb) {
    //     const formEl = document.createElement('form');
    //     formEl.className = 'description-form';

    //     const textInputEl = document.createElement('textarea');
    //     textInputEl.className = 'description-textarea';
    //     textInputEl.value = props.description;

    //     const inputButtonEl = document.createElement('input');
    //     inputButtonEl.type = 'button';
    //     inputButtonEl.value = 'Submit';

    //     formEl.appendChild(textInputEl);
    //     formEl.appendChild(inputButtonEl);

    //     inputButtonEl.addEventListener('click', () => {
    //         props.description = textInputEl.value;
    //         return cb(props)();
    //     });
    //     container.appendChild(formEl);
    // }
}

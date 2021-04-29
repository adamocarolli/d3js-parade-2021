import {vec3} from 'gl-matrix';
import {easeInOutCubic} from '../utils/easings';
import {downloadObjectAsJson} from '../utils/download';
// eslint-disable-next-line import/no-unresolved
import showdown from 'https://cdn.skypack.dev/showdown';

const tweetDelay = 200;
const animationDuration = 1500;
const maxAnimationDuration = 20000;
const markdownConverter = new showdown.Converter();

export class SnapshotsView {
    constructor(container, grafer, twitter, snapshots) {
        this.element = container;
        this.grafer = grafer;
        this.twitter = twitter;
        this.snapshots = snapshots || [];
        this.transitioning = false;
        this.descriptionMarkDown = `## Welcome\nClick **NEXT** to begin the tour.`;
        this.descriptionHTML = markdownConverter.makeHtml(this.descriptionMarkDown);
        this.current = -1;
        this.isEditMode = false;

        this.createSnapshotMenu();
    }

    createSnapshotMenu() {
        const el = document.createElement('div');
        el.className = 'snapshot-menu';

        // Add container that displays markdown preview
        const markdownContainerEl = document.createElement('div');
        markdownContainerEl.className = 'snapshots-markdown-container';
        markdownContainerEl.id = 'snapshots-markdown-container-id';
        markdownContainerEl.innerHTML = this.descriptionHTML;
        el.appendChild(markdownContainerEl);

        const row2 = this.createRow(el);
        this.createSnapshotButton(row2, 'PREVIOUS', () => {
            if (!this.transitioning && this.current > 0) {
                this.showSnapshot(this.snapshots[--this.current]);
            }
        });
        this.createSnapshotButton(row2, 'NEXT', () => {
            if (!this.transitioning && this.current < this.snapshots.length - 1) {
                this.showSnapshot(this.snapshots[++this.current]);
            }
        });

        const editModeRow = this.createRow(el);
        this.createSnapshotButton(editModeRow, 'Toggle Edit Mode', () => {
            if (this.isEditMode) {
                document.getElementById('snapshots-editor-panel-container-id').style.display = 'none';
                this.isEditMode = false;
            } else {
                document.getElementById('snapshots-editor-panel-container-id').style.display = 'block';
                this.isEditMode = true;
            }
        });
        this.createEditorPanel(el);

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

        // Update description
        document.getElementById('story-textarea-id').value = info.description;
        document.getElementById('snapshots-markdown-container-id').innerHTML = markdownConverter.makeHtml(info.description);
    }

    createRow(container) {
        const el = document.createElement('div');
        el.className = 'snapshot-row';

        container.appendChild(el);
        return el;
    }

    createSnapshotButton(container, text, cb) {
        const el = document.createElement('div');
        el.className = 'snapshot-button';
        el.innerText = text;

        el.addEventListener('click', cb);
        container.appendChild(el);
    }

    createUploadSnapshotsFileButton(container, cb) {
        const inputEl = document.createElement('input');
        inputEl.id = 'input-file-id';
        inputEl.className = 'input-file';
        inputEl.type = 'file';

        inputEl.addEventListener('change', () => {
            const snapshotFile = inputEl.files[0];
            const reader = new FileReader();

            // Load snapshots file and run callback
            reader.addEventListener('load', () => {
                const snapshots = JSON.parse(reader.result);
                cb(snapshots);
            });
            reader.readAsText(snapshotFile);
        });
        container.appendChild(inputEl);
    }

    createDescriptionInputField(container) {
        const formEl = document.createElement('form');
        formEl.className = 'description-form';

        const textInputEl = document.createElement('textarea');
        textInputEl.className = 'story-textarea';
        textInputEl.id = 'story-textarea-id';
        textInputEl.value = this.descriptionMarkDown;

        formEl.appendChild(textInputEl);

        textInputEl.addEventListener('change', (event) => {
            this.descriptionMarkDown = event.target.value;
            this.descriptionHTML = markdownConverter.makeHtml(this.descriptionMarkDown);
            // TODO: Create a watcher pattern here. When description html updates
            //       this element's inner html should update.
            document.getElementById('snapshots-markdown-container-id').innerHTML = this.descriptionHTML;
        });
        container.appendChild(formEl);
    }

    createEditorPanel(container) {
        const editorPanelContainer = document.createElement('div');
        editorPanelContainer.className = 'snapshots-editor-panel-container';
        editorPanelContainer.id = 'snapshots-editor-panel-container-id';
        if (!this.isEditMode){
            editorPanelContainer.style.display = 'none';
        }

        const row1 = this.createRow(editorPanelContainer);
        this.createSnapshotButton(row1, 'TAKE SNAPSHOT', () => {
            const cameraPosition = new Float32Array(this.grafer.controller.viewport.camera.position);
            const nodes = [];
            for (const info of this.twitter.tweets.values()) {
                nodes.push(info.tweet.node.id);
            }

            this.current = this.snapshots.length;
            this.snapshots.push({
                cameraPosition,
                nodes,
                description: this.descriptionMarkDown,
            });
        });

        const row3 = this.createRow(editorPanelContainer);
        this.createDescriptionInputField(row3);

        const row4 = this.createRow(editorPanelContainer);
        this.createSnapshotButton(row4, 'EDIT', () => {
            // Edit current snapshot
            const cameraPosition = new Float32Array(this.grafer.controller.viewport.camera.position);
            const nodes = [];
            for (const info of this.twitter.tweets.values()) {
                nodes.push(info.tweet.node.id);
            }

            this.snapshots[this.current] = {
                cameraPosition,
                nodes,
                description: this.descriptionMarkDown,
            };
        });
        this.createSnapshotButton(row4, 'DOWNLOAD', () => {
            const d = new Date();
            const exportFileName = `snapshots-${d.getMonth()}-${d.getDate()}-${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}`;
            downloadObjectAsJson(this.snapshots, exportFileName);
        });

        this.createUploadSnapshotsFileButton(editorPanelContainer, (snapshots) => {
            this.snapshots = snapshots;
        });

        container.appendChild(editorPanelContainer);
    }
}

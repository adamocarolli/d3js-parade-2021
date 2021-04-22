import {GraferView} from './grafer/view';
import {TwitterView} from './twitter/view';
import {vec3} from 'gl-matrix';

function createLoading(container) {
    const el = document.createElement('div');
    el.className = 'data-loading';

    const spinner = document.createElement('div');
    spinner.className = 'lds-dual-ring';

    const label = document.createElement('div');
    label.className = 'data-loading data-loading-label';
    label.innerText = 'LOADING';

    el.appendChild(spinner);
    el.appendChild(label);
    container.appendChild(el);
    return el;
}

function createSnapshotButton(container, text, cb) {
    const el = document.createElement('div');
    el.className = 'snapshot-button';
    el.innerText = text;

    el.addEventListener('click', cb);
    container.appendChild(el);
}

function easeInOutCubic(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3);
}

function easeOutQuart(x) {
    return 1 - Math.pow(1 - x, 4);
}

function createSnapshotMenu(element, grafer, twitter) {
    const el = document.createElement('div');
    el.className = 'snapshot-menu';

    const snapshots = [];
    let current = -1;
    let transitioning = false;

    createSnapshotButton(el, 'TAKE SNAPSHOT', () => {
        const cameraPosition = new Float32Array(grafer.controller.viewport.camera.position);
        const nodes = [];
        for (const info of twitter.tweets.values()) {
            nodes.push(info.tweet.node.id);
        }

        current = snapshots.length;
        snapshots.push({
            cameraPosition,
            nodes,
        });

        console.log(snapshots[snapshots.length - 1]);
    });

    const tweetDelay = 350;
    const animationDuration = 1500;
    const maxAnimationDuration = 10000;
    function showSnapshot(info) {
        transitioning = true;

        const startPosition = vec3.clone(grafer.controller.viewport.camera.position);
        const normal = vec3.subtract(vec3.create(), info.cameraPosition, startPosition);
        const distance = vec3.len(normal);
        vec3.set(normal, normal[0] / distance, normal[1] / distance, normal[2] / distance);

        const targetTime = Math.min(maxAnimationDuration, animationDuration * Math.max(1.0, Math.abs(info.cameraPosition[2] - startPosition[2]) * 0.001));
        let currentTime = 0;
        let time = performance.now();

        const animate = () => {
            if (currentTime >= targetTime) {
                transitioning = false;
                grafer.controller.viewport.camera.position = info.cameraPosition;
            } else {
                const progress = easeOutQuart(currentTime / targetTime);
                grafer.controller.viewport.camera.position[0] = startPosition[0] + normal[0] * distance * progress;
                grafer.controller.viewport.camera.position[1] = startPosition[1] + normal[1] * distance * progress;
                grafer.controller.viewport.camera.position[2] = startPosition[2] + normal[2] * distance * progress;
                const now = performance.now();
                currentTime += now - time;
                time = now;
                requestAnimationFrame(() => animate());

            }
            grafer.controller.render();
        }
        animate();


        grafer.controller.viewport.camera.position = info.cameraPosition;
        twitter.clearTweets();
        let delay = targetTime * 0.9;
        for (const nodeID of info.nodes) {
            const node = grafer.nodes.get(nodeID);
            setTimeout(() => twitter.displayTweet(node), delay);
            delay += tweetDelay;
        }
    }

    createSnapshotButton(el, 'PREVIOUS', () => {
        if (!transitioning && current > 0) {
            showSnapshot(snapshots[--current]);
        }
    });

    createSnapshotButton(el, 'NEXT', () => {
        if (!transitioning && current < snapshots.length - 1) {
            showSnapshot(snapshots[++current]);
        }
    });

    element.appendChild(el);
}

async function main() {
    const pathName = window.location.pathname;
    const pathComponents = pathName.split('/').filter(v => Boolean(v));
    const dataPack = pathComponents.pop() || 'adam_inferred';

    const grafer = new GraferView(document.body);

    const loading = createLoading(document.body);

    grafer.init(dataPack).then(() => {
        const twitter = new TwitterView(document.body, grafer);
        grafer.on('node-clicked', (type, node) => {
            twitter.displayTweet(node);
        });

        loading.parentElement.removeChild(loading);
        createSnapshotMenu(document.body, grafer, twitter);
    });
}

main();


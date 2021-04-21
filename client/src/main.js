import {GraferView} from './grafer/view';
import {TwitterView} from './twitter/view';

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
    });
}

main();


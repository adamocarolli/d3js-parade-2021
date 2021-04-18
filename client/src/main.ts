import {GraferView} from './garfer/view';
import {TwitterView} from './twitter/view';

async function main(): Promise<void> {
    const pathName = window.location.pathname;
    const pathComponents = pathName.split('/').filter(v => Boolean(v));
    const dataPack = pathComponents.pop() || 'adam_inferred';

    const grafer = new GraferView(document.body);
    await grafer.init(dataPack as any);

    const twitter = new TwitterView(document.body, grafer);

    grafer.on('node-clicked', (type: string, node: any) => {
        twitter.displayTweet(node);
    });
}

main();


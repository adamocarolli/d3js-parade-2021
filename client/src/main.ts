import {GraferView} from './garfer/view';
import {TwitterView} from './twitter/view';

async function main() {
    const grafer = new GraferView(document.body);
    await grafer.init('adam_inferred');

    const twitter = new TwitterView(document.body);

    grafer.on('node-clicked', (type: string, node: any) => {
        console.log(node);
        twitter.displayTweet(node);
    });
}

main();


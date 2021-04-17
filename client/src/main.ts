import {GraferView} from './garfer/view';

async function main() {
    const grafer = new GraferView(document.body);
    await grafer.init('adam_inferred');
}

main();


// @ts-nocheck
import { chan, Channel, select, after } from 'https://creatcodebuild.github.io/csp/dist/csp.ts';
import { MergeSort, InsertionSort, infinite } from './sort.ts';

function SortVisualizationComponent(id: string, arrays: Channel<number[]>) {

    let ele: HTMLElement | null = document.getElementById(id);
    if (!ele || !ele.shadowRoot) {
        throw new Error('ele has no shadow root');
    }
    let stop = chan<null>();
    let resume = chan<null>();


    // Animation SVG
    let currentSpeed = {
        value: 100
    };
    let onclick = chan();
    CreateArrayAnimationSVGComponent(ele.shadowRoot, id + 'animation', 0, 0)(arrays, stop, resume, currentSpeed, onclick);

    // Stop/Resume Button
    let button = ele.shadowRoot.querySelector('button');
    if (!button) {
        throw new Error();
    }
    let stopped = false;
    button.addEventListener('click', async () => {
        stopped = !stopped;
        if (stopped) {
            button.textContent = 'resume'
            await stop.put(null);
        } else {
            button.textContent = 'stop'
            await resume.put(null);
        }
    });

    // Input
    let input = ele.shadowRoot.querySelector('input');
    if(!input) {
        throw new Error();
    }
    input.addEventListener('input', (ele, event): any => {
        currentSpeed.value = Number(ele.target.value);
        onclick.put('onclick');
        return 1;
    })
    input.value = currentSpeed.value;
}

function CreateArrayAnimationSVGComponent(
    parent: ShadowRoot,
    id: string,
    x: number, y: number
) {
    let svg = parent.querySelector('svg');
    return async (
        arrays: Channel<number[]>,
        stop: Channel,
        resume: Channel,
        changeSpeed,
        oninput
    ) => {
        let waitToResume = await needToStop(stop, resume);
        let currentSpeed = changeSpeed.value;
        let i = 0;
        for await (let array of arrays) {
            await waitToResume.pop();
            while (svg.lastChild) {
                svg.removeChild(svg.lastChild);
            }
            for (let [i, number] of Object.entries(array)) {
                let r = rect(x + Number(i) * 4, y, 3, number);
                svg.appendChild(r);
            }
            let wait = true;
            while (wait) {
                let a;
                try {
                    a = after(changeSpeed.value);
                    currentSpeed = changeSpeed.value;
                } catch {
                    console.log('catch', currentSpeed);
                    a = after(currentSpeed);
                }
                await select(
                    [
                        [a, async (waitedTime) => {
                            console.log(i++, 'after', changeSpeed.value, waitedTime);
                            wait = false;
                        }],
                        [oninput, async (x) => {
                            console.log(i++, x, changeSpeed.value, currentSpeed);
                        }]
                    ]
                )
            }
            // }
            console.log(changeSpeed);
        }
    }

    function rect(x, y, width, height): SVGElementTagNameMap['rect'] {
        // https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS
        // https://stackoverflow.com/questions/12786797/draw-rectangles-dynamically-in-svg
        let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('width', width);
        // @ts-ignore
        rect.setAttribute('height', height);
        // @ts-ignore
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        // rect.classList.add(className);
        return rect;
    }
}

async function main() {
    // init an array
    let array = [];
    for (let i = 0; i < 50; i++) {
        array.push(Math.floor(Math.random() * 50));
    }

    // event queue
    let insertQueue = chan<number[]>();
    let mergeQueue = chan<[number[], number]>();
    let stop = chan<null>();
    let resume = chan<null>();
    // controlButton(stop, resume);


    console.log('begin sort', array);
    infinite(InsertionSort, array, insertQueue);
    infinite(MergeSort, array, mergeQueue)
    // let s1 = InsertionSort(array, insertQueue);
    // let s2 = MergeSort(array, mergeQueue);
    // console.log('after sort');


    let mergeQueue2 = (() => {
        let c = chan();
        (async () => {
            let numebrsToRender = [].concat(array);
            await c.put(numebrsToRender)
            while (1) {
                let [numbers, startIndex] = await mergeQueue.pop();
                // console.log(numbers);
                for (let i = 0; i < numbers.length; i++) {
                    numebrsToRender[i + startIndex] = numbers[i];
                }
                await c.put(numebrsToRender)
            }
        })();
        return c;
    })();
    console.log(mergeQueue2);

    // Components
    let resetChannel = chan();
    DefineComponent();
    SortVisualizationComponent('insertion-sort', insertQueue);
    SortVisualizationComponent('merge-sort', mergeQueue2);
    let ele = get('data-source-1');
    if (!ele.shadowRoot) {
        throw new Error(`element ${ele.id} does not have shadowRoot`);
    }
    let textarea = ele.shadowRoot.querySelector('textarea');
    if (!textarea) {
        throw new Error();
    }
    textarea.textContent = JSON.stringify(array);
    let resetButton = ele.shadowRoot.getElementById('reset');
    resetButton.addEventListener('click', async () => {
        let array = JSON.parse(textarea.textContent);
        await resetChannel.put();
    });
}
main();

async function needToStop(stop: Channel<null>, resume: Channel<null>) {
    let stopResume = chan();
    let stopped = false;
    (async () => {
        while (1) {
            await select(
                [
                    [resume, async () => {
                        stopped = false;
                        await stopResume.put();
                    }],
                    [stop, async () => {
                        stopped = true;
                    }]
                ],
                async () => {
                    if (stopped) {
                        await resume.pop();
                        stopped = false;
                    } else {
                        await stopResume.put();
                    }
                }
            )
        }
    })();
    return stopResume;
}

function DefineComponent() {
    // Web Components
    customElements.define('sort-visualization',
        class extends HTMLElement {
            constructor() {
                super();
                let template = document.getElementById('sort-visualization');
                let templateContent = template.content;
                const shadowRoot = this.attachShadow({ mode: 'open' })
                    .appendChild(templateContent.cloneNode(true));
            }
        }
    );

    customElements.define('data-source',
        class extends HTMLElement {
            constructor() {
                super();
                let template = document.getElementById('data-source');
                let templateContent = template.content;
                const shadowRoot = this.attachShadow({ mode: 'open' })
                    .appendChild(templateContent.cloneNode(true));
            }
        }
    )
}

function get(id: string): HTMLElement {
    let ele = document.getElementById(id)
    if (!ele) {
        throw new Error(`element ${id} does not exist`);
    }
    return ele;
}

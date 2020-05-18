// @ts-nocheck
import { chan, Channel, select } from './csp.js';

async function paintArray(
    svg: HTMLElement, document: Document,
    initData: Array<number>,
    insertionArray: Channel<number[]>,
    mergeArray: Channel<[number[], number]>,
    stop: Channel<null>,
    resume: Channel<null>
) {
    console.log('render loop');
    arrayAnimator(insertionArray, 'insert', 0, 0)
    animatorMergeSort(mergeArray, 'merge', 0, 60)
    let unblock = chan<null>();
    unblock.close();

    async function arrayAnimator(events: Channel<number[]>, className: string, x: number, y: number) {
        let stopped = false;
        let stopResume = await needToStop(stop, resume);
        for await (let event of events) {
            await stopResume.pop();
            clearClass(className);
            for (let [i, number] of Object.entries(event)) {
                let r = rect(className, x + Number(i) * 4, y, 3, number);
                svg.appendChild(r);
            }
            await sleep(50);
        }
    }
    async function animatorMergeSort(events: Channel<[number[], number]>, className: string, x: number, y: number) {
        let numebrsToRender = initData.map((x) => x);

        for await (let [numbers, startIndex] of events) {
            // if (needToStop(stop)) {
            //     break;
            // }
            let children = svg.childNodes;
            clearClass(className);

            // put current numbers into previousNumbers
            for (let i = 0; i < numbers.length; i++) {
                numebrsToRender[i + startIndex] = numbers[i];
            }

            for (let [i, number] of Object.entries(numebrsToRender)) {
                let r = rect(className, x + Number(i) * 4, y, 3, number)
                svg.appendChild(r);
            }
            await sleep(5);
        }
    }
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
                        if(stopped) {
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
    function empty(ele) {
        ele.textContent = undefined;
    }
    function clearClass(name: string) {
        var paras = document.getElementsByClassName(name);
        while (paras[0]) {
            paras[0].parentNode.removeChild(paras[0]);
        }
    }
    function rect(className, x, y, width, height): SVGElementTagNameMap['rect'] {
        // https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS
        // https://stackoverflow.com/questions/12786797/draw-rectangles-dynamically-in-svg
        let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('width', width);
        // @ts-ignore
        rect.setAttribute('height', height);
        // @ts-ignore
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.classList.add(className);
        return rect;
    }
}

function sleep(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    })
}

async function InsertionSort(array, reactor: Channel<number[]>) {

    function insert(array, number) {
        // [1, 2, 4, 5], 3
        // in-place
        // immutable 不可变
        if (array.length === 0) {
            return [number];
        }
        let sorted = [];
        let inserted = false;
        for (let i = 0; i < array.length; i++) { // n
            if (!inserted) {
                if (number < array[i]) {
                    inserted = true;
                    sorted.push(number);
                }
            }
            sorted.push(array[i]);
        }
        if (!inserted) {
            sorted.push(number);
        }
        return sorted;
    }

    let sortedArray = [];
    for (let i = 0; i < array.length; i++) { // n
        sortedArray = insert(sortedArray, array[i]);
        await reactor.put(sortedArray.concat(array.slice(i + 1)));
    }
    return sortedArray;
}


async function MergeSort(array, reactor: Channel<[number[], number]>) {

    async function merge(l: number[], r: number[], startIndex: number): Promise<number[]> {
        if (l.length === 0) {
            return r
        }
        if (r.length === 0) {
            return l
        }
        let shifted: number[] = await (async () => {
            if (l[0] < r[0]) {
                return l.slice(0, 1).concat(await merge(l.slice(1), r, startIndex + 1))
            } else {
                return r.slice(0, 1).concat(await merge(l, r.slice(1), startIndex + 1))
            }
        })();
        // console.log(shifted, startIndex)
        await reactor.put([shifted, startIndex]);
        return shifted;
    }

    async function sort(array, startIndex): Promise<number[]> {
        if (array.length <= 1) {
            return array;
        }
        let m = Math.floor(array.length / 2)
        let l = array.slice(0, m)
        let r = array.slice(m)
        let sortedL = await sort(l, startIndex)
        let sortedR = await sort(r, startIndex + m)
        await reactor.put([sortedL.concat(sortedR), startIndex]);
        // need global index here to correctly animate
        let merged = await merge(sortedL, sortedR, startIndex)
        await reactor.put([merged, startIndex]);
        return merged;
    }
    await reactor.put([array, 0]);
    return await sort(array, 0);
}

function controlButton(stop: Channel<null>, resume: Channel<null>) {
    let button = document.getElementById('controlButton')
    let stopped = false;
    button.onclick = async () => {
        // if(!clicked) {
        console.log('clicked', stopped, '->', !stopped);
        stopped = !stopped;
        if (stopped) {
            await stop.put(null);
        } else {
            console.log('resume')
            await resume.put(null);
        }

    }
}

async function main() {
    let svg = document.getElementById("svg");

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
    controlButton(stop, resume);


    console.log('begin sort', array);
    let s1 = InsertionSort(array, insertQueue);
    let s2 = MergeSort(array, mergeQueue);
    console.log('after sort');
    let render = paintArray(svg, document, array, insertQueue, mergeQueue, stop, resume);
    Promise.all([s1, s2, render])
}
main();

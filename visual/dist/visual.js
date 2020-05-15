///////////////
// Libraries //
///////////////
class Channel {
    constructor() {
        this.closed = false;
        this.popActions = [];
        this.putActions = [];
    }
    put(ele) {
        if (this.closed) {
            throw new Error('can not put to a closed channel');
        }
        // if no pop action awaiting
        if (this.popActions.length === 0) {
            if (this.putActions.length >= 1) {
                throw new Error('put: all promise asleep');
            }
            return new Promise((resolve) => {
                this.putActions.push([resolve, ele]);
            });
        }
        else {
            let onPop = this.popActions.shift();
            onPop(ele);
            return new Promise((resolve) => {
                resolve();
            });
        }
    }
    pop() {
        if (this.closed) {
            return undefined;
        }
        if (this.putActions.length === 0) {
            if (this.popActions.length >= 1) {
                throw new Error('pop: all promise asleep');
            }
            return new Promise((resolve) => {
                this.popActions.push(resolve);
            });
        }
        else {
            let [onPut, ele] = this.putActions.shift();
            onPut();
            return new Promise((resolve) => {
                resolve(ele);
            });
            // return ele;
        }
    }
    // put to a closed channel throws an error
    // pop from a closed channel returns undefined
    // close a closed channel throws an error
    close() {
        if (this.closed) {
            throw Error('can not close a channel twice');
        }
        this.closed = true;
    }
    async *[Symbol.asyncIterator]() {
        while (!this.closed) {
            yield await this.pop();
        }
    }
}
function chan() {
    return new Channel();
}
///////////////
// Libraries //
///////////////
async function paintArray(svg, document, initData, insertionArray, mergeArray) {
    console.log('render loop');
    arrayAnimator(insertionArray, 'insert', 0, 0);
    animatorMergeSort(mergeArray, 'merge', 0, 60);
    async function arrayAnimator(events, className, x, y) {
        for await (let event of events) {
            clearClass(className);
            for (let [i, number] of Object.entries(event)) {
                let r = rect(className, x + Number(i) * 4, y, 3, number);
                svg.appendChild(r);
            }
            await sleep(30);
        }
    }
    async function animatorMergeSort(events, className, x, y) {
        let numebrsToRender = initData.map((x) => x);
        for await (let [numbers, startIndex] of events) {
            let children = svg.childNodes;
            clearClass(className);
            // put current numbers into previousNumbers
            for (let i = 0; i < numbers.length; i++) {
                numebrsToRender[i + startIndex] = numbers[i];
            }
            for (let [i, number] of Object.entries(numebrsToRender)) {
                let r = rect(className, x + Number(i) * 4, y, 3, number);
                svg.appendChild(r);
            }
            await sleep(5);
        }
    }
    function empty(ele) {
        ele.textContent = undefined;
    }
    function clearClass(name) {
        var paras = document.getElementsByClassName(name);
        while (paras[0]) {
            paras[0].parentNode.removeChild(paras[0]);
        }
    }
    function rect(className, x, y, width, height) {
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
    });
}
async function InsertionSort(array, reactor) {
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
async function MergeSort(array, reactor) {
    async function merge(l, r, startIndex) {
        if (l.length === 0) {
            return r;
        }
        if (r.length === 0) {
            return l;
        }
        let shifted = await (async () => {
            if (l[0] < r[0]) {
                return l.slice(0, 1).concat(await merge(l.slice(1), r, startIndex + 1));
            }
            else {
                return r.slice(0, 1).concat(await merge(l, r.slice(1), startIndex + 1));
            }
        })();
        // console.log(shifted, startIndex)
        await reactor.put([shifted, startIndex]);
        return shifted;
    }
    async function sort(array, startIndex) {
        if (array.length <= 1) {
            return array;
        }
        let m = Math.floor(array.length / 2);
        let l = array.slice(0, m);
        let r = array.slice(m);
        let sortedL = await sort(l, startIndex);
        let sortedR = await sort(r, startIndex + m);
        await reactor.put([sortedL.concat(sortedR), startIndex]);
        // need global index here to correctly animate
        let merged = await merge(sortedL, sortedR, startIndex);
        await reactor.put([merged, startIndex]);
        return merged;
    }
    await reactor.put([array, 0]);
    return await sort(array, 0);
}
async function main() {
    let svg = document.getElementById("svg");
    // init an array
    let array = [];
    for (let i = 0; i < 50; i++) {
        array.push(Math.floor(Math.random() * 50));
    }
    // event queue
    let insertQueue = chan();
    let mergeQueue = chan();
    console.log('begin sort', array);
    let s1 = InsertionSort(array, insertQueue);
    let s2 = MergeSort(array, mergeQueue);
    console.log('after sort');
    let render = paintArray(svg, document, array, insertQueue, mergeQueue);
    Promise.all([s1, s2, render]);
}
main();

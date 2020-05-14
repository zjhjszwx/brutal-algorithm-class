function paintArray(svg: HTMLElement, document: Document, array: Array<number>) {
    empty(svg);
    
    for (let [i, number] of Object.entries(array)) {
        // https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS
        // https://stackoverflow.com/questions/12786797/draw-rectangles-dynamically-in-svg
        let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        console.log(number);
        rect.setAttribute('width', '5');
        // @ts-ignore
        rect.setAttribute('height', number);
        // @ts-ignore
        rect.setAttribute('x', `${i * 8}`);
        svg.appendChild(rect);
    }

}

function sleep(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    })
}

function InsertionSort(array) {
    let sortedArray = [];
    for (let i = 0; i < array.length; i++) { // n
        sortedArray = insert(sortedArray, array[i]);
    }
    return sortedArray;
}

// 10K
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

class ArrayViewModel extends Array {

    _paintArray

    constructor(array, paint) {
        super(array);
        this._paintArray = paint;
    }

    push(number) {
        let l = super.push(number);
        this._paintArray(this);
        return l;
    }

}

function empty(ele) {
    ele.textContent = undefined;
}

async function main() {
    let svg = document.getElementById("svg");
    let array = new ArrayViewModel([], (a) => { return paintArray(svg, document, a) });
    for (let i = 0; i < 10; i++) {
        await sleep(1000);
        array.push(i);
    }
}
main();

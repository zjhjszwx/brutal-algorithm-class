function paintArray(
    svg: HTMLElement, document: Document, 
    insertionArray: Array<number>,
    mergeArray: Array<number>
) {
    empty(svg);

    arrayAnimator(insertionArray, 0, 0)
    arrayAnimator(mergeArray, 0, 60)

    function arrayAnimator(array, x, y) {
        for (let [i, number] of Object.entries(array)) {
            // https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS
            // https://stackoverflow.com/questions/12786797/draw-rectangles-dynamically-in-svg
            let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('width', '3');
            // @ts-ignore
            rect.setAttribute('height', number);
            // @ts-ignore
            rect.setAttribute('x', `${x + i * 4}`);
            rect.setAttribute('y', `${y}`);
            svg.appendChild(rect);
        }
    }

}

function sleep(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    })
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
        await sleep(100);
        reactor(sortedArray.concat(array.slice(i + 1)));
    }
    return sortedArray;
}


async function MergeSort(array, reactor) {

    function merge(l, r) {
        if (l.length === 0) {
            return r
        }
        if (r.length === 0) {
            return l
        }
        if (l[0] < r[0]) {
            return l.slice(0, 1).concat(merge(l.slice(1), r))
        } else {
            return r.slice(0, 1).concat(merge(l, r.slice(1)))
        }
    }

    async function sort(array) {
        if (array.length <= 1) {
            return array;
        }
        let m = Math.floor(array.length / 2)
        let l = array.slice(0, m)
        let r = array.slice(m)
        let sortedL = await sort(l)
        let sortedR = await sort(r)
        // need global index here to correctly animate
        await sleep(100);
        let merged = merge(sortedL, sortedR)
        await reactor(merged);
        return merged;
    }
    return await sort(array);
}

function empty(ele) {
    ele.textContent = undefined;
}

async function main() {
    let svg = document.getElementById("svg");
    let array = [];
    for (let i = 0; i < 50; i++) {
        array.push(Math.random() * 50);

    }
    await InsertionSort(array, (array) => { paintArray(svg, document, array, [])});
    await MergeSort(array, (array) => { paintArray(svg, document, [], array)});
}
main();

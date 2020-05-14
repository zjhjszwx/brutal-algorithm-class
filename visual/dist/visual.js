function paintArray(svg, document, array) {
    empty(svg);
    for (let [i, number] of Object.entries(array)) {
        // https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS
        // https://stackoverflow.com/questions/12786797/draw-rectangles-dynamically-in-svg
        let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('width', '3');
        // @ts-ignore
        rect.setAttribute('height', number);
        // @ts-ignore
        rect.setAttribute('x', `${i * 4}`);
        svg.appendChild(rect);
    }
}
function sleep(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}
async function InsertionSort(array, reactor) {
    let sortedArray = [];
    for (let i = 0; i < array.length; i++) { // n
        sortedArray = insert(sortedArray, array[i]);
        await sleep(100);
        console.log(array);
        reactor(sortedArray.concat(array.slice(i + 1)));
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
function empty(ele) {
    ele.textContent = undefined;
}
async function main() {
    let svg = document.getElementById("svg");
    let array = [];
    for (let i = 0; i < 50; i++) {
        array.push(Math.random() * 50);
    }
    await InsertionSort(array, (array) => {
        paintArray(svg, document, array);
    });
}
main();

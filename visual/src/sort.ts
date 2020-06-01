// @ts-ignore
import { chan, Channel, select } from 'https://creatcodebuild.github.io/csp/dist/csp.ts';

export async function InsertionSort(array: number[], reactor: Channel<number[]>) {

    function insert(array: number[], number: number) {
        // [1, 2, 4, 5], 3
        // in-place
        // immutable 不可变
        if (array.length === 0) {
            return [number];
        }
        let sorted: number[] = [];
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

    let sortedArray: number[] = [];
    for (let i = 0; i < array.length; i++) { // n
        sortedArray = insert(sortedArray, array[i]);
        await reactor.put(sortedArray.concat(array.slice(i + 1)));
    }
    return sortedArray;
}


export async function MergeSort(array: number[], reactor: Channel<[number[], number]>) {

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

    async function sort(array: number[], startIndex: number): Promise<number[]> {
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

export async function infinite(f: Function, ...args: any[]) {
    while(true) {
        await f(...args);
    }
}


export async function Sorter(sortFunc: GeneratorFunction, resetChannel: Channel<number[]>, renderChannel: Channel<number[]>) {
    let arrayToSort = await resetChannel.pop()
    let sorting = sortFunc(arrayToSort);
    while(true) {
        await select([
            [resetChannel, async (array) => {
                arrayToSort = array;
                sorting = sortFunc(arrayToSort);
            }]
        ],
        async () => {
            let { value, done } = sorting.next();
            await renderChannel.put(value);
            if(done) {
                sorting = sortFunc(arrayToSort);
            }
        })
    }
}

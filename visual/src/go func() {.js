import { chan, select } from 'csp'

let c = chan();

let p = async function () {
    let p1 = c.put(1);
    let p2 = c.put(2);
    let p3 = c.put(3);
    await p1;
    await p2;
    await p3;
}
let promise = p();

await c.pop(); // 1
await c.pop(); // 2
await c.pop(); // 3

await promise;

let c2 = chan();
c2.close()

await select(
    [
        [c, async (ele) => {
            return ele + 1;
        }],
        [c2, async (ele) => {
            return ele + 2
        }],
    ],
    async () => {
        return -1
    }
)

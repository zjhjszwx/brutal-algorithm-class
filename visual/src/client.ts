// Create WebSocket connection.

import { chan } from "./csp.js";


export async function WebSocketClient(url: string) {

    const socket = new WebSocket(url);
    await new Promise((resolve) => {
        socket.onopen = (event) => {
            console.log(event);
            resolve()
        }
    });
    let receive = chan();
    socket.addEventListener('message', async function (event) {
        await receive.put(event.data);
    });

    return {
        send(data) {
            socket.send(data);
        },
        receive: async ()=> {
            return await receive.pop();
        }
    }
}

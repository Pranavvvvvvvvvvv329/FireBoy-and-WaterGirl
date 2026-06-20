export let peer;
export let conn;

export function startHost() {

    peer = new Peer("fireboy-room");

    peer.on("open", (id) => {
        console.log("HOST READY:", id);
    });

    peer.on("connection", (connection) => {

        conn = connection;

        console.log("PLAYER CONNECTED");

        conn.on("data", (data) => {
            console.log("Received:", data);
        });

    });
}

export function joinHost() {

    peer = new Peer();

    peer.on("open", () => {

        conn = peer.connect("fireboy-room");

        conn.on("open", () => {

            console.log("CONNECTED TO HOST");

        });

        conn.on("data", (data) => {
            console.log("Received:", data);
        });

    });
}

export function sendMessage(msg) {

    if (conn && conn.open) {
        conn.send(msg);
    }

}

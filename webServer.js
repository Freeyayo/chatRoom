let ws = require("nodejs-websocket");

let PORT = 8001;

let clientCount = 0;

let Info = {};

let server = ws.createServer((conn) => {

	console.log("New connection");

	clientCount++;

	broadcast("new friend comes in")

	conn.on("text", (user) => {

		console.log("Received from " + JSON.parse(user).name);

		if(JSON.parse(user).name){

			conn.nickname = JSON.parse(user).name;

			Info.name = JSON.parse(user).name;

		}else{

			conn.nickname = 'user' + clientCount;

		}

		Info.msg = JSON.parse(user).msg;

		broadcast(JSON.stringify(Info));

	})

	conn.on("close",(node, reason) => {

		console.log("Connection Closed");

		broadcast(conn.nickname + ' left');

	})

	conn.on("error",(err) => {

		console.log("handle error");

		console.log(err);

	})

}).listen(PORT);

console.log("wsServer is listenning on port " + PORT);

let broadcast = (str) => {

	server.connections.forEach((connection) => {

		connection.sendText(str);

	})

}
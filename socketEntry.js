let websocket = new WebSocket("ws://localhost:8001/");

let User = {};

let btn = document.getElementById('sendBtn');

btn.disabled = true;

let sendTxt = document.getElementById('sendTxt');

sendTxt.disabled = true;

let nameBtn = document.getElementById('nameBtn');

let name = document.getElementById('nameTxt');

let tips = document.getElementById('tips');

let msgBox = document.getElementById('msgBox');

nameBtn.onclick = (e) => {

		User.name = name.value;

		if(!User.name){

			alert('把名字填好！');

			return;
		}

		nameBtn.disabled = 'disabled';

		btn.disabled = false;

		sendTxt.disabled = false;

		nameTxt.disabled = true;

		tips.innerHTML = "欢迎👏";

}

let showMessage = (Info) => {

		let div = document.createElement("div");

		let nickname = document.createElement("h4");

		nickname.className = "panel-heading";

		let time = document.createElement("small");

		let content = document.createElement("p")

		content.className = "panel-body";

		let img = document.createElement('img');

		img.src = "./mycat.png";

		img.className = "thumbnail";

		img.style.width = 50 + "px";

		img.style.display = "inline-block";

		if(Info.indexOf('{') != -1){

			//div.innerHTML = JSON.parse(Info)['name'] + JSON.parse(Info)['msg'];
			div.className = "panel panel-default";

			nickname.innerHTML = JSON.parse(Info)['name'];

			time.innerHTML = "  at " + Date().split('G')[0] + " says : ";

			content.innerHTML = JSON.parse(Info)['msg'];

			msgBox.insertBefore(div, msgBox.childNodes[0]);

		    //msgBox.appendChild(div);

		    div.appendChild(nickname);

		    div.appendChild(img);

		    nickname.appendChild(time);

		    div.appendChild(content);

		}else{

			div.innerHTML = Info;

		    msgBox.insertBefore(div, msgBox.childNodes[0]);
		    
		}

}

websocket.onopen = () => {

		console.log('websocket open');

		btn.onclick = () => {

			let txt = document.getElementById('sendTxt').value;

			User.msg = txt;

			if(txt){

				websocket.send(JSON.stringify(User));

				document.getElementById('sendTxt').value = '';

			}

		}

} 

websocket.onclose = () => {

		document.getElementById('recv').innerHTML = "Closed";

}

websocket.onmessage = (e) => {

		console.log(e.data);

		showMessage(e.data);

}
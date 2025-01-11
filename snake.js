function snakeStart () {
	let tooltip = document.createElement("div");
	document.getElementById("actionField").appendChild(tooltip);
	tooltip.id = "tooltip";
	tooltip.type = "div"
	document.getElementById("snakeStartButton").remove();
	document.getElementById("calculatorStartButton").remove()
	for (let i = 0; i<3; i++) {
		let size = 16+i*2;
		let sizeButton = document.createElement("button");
		document.getElementById("tooltip").appendChild(sizeButton);
		sizeButton.innerHTML = size;
		sizeButton.id = "size"+size;
		sizeButton.type = "button";
		sizeButton.onclick = function(){	createField(size)

		};
	}
}


function deleteSizeOptions(){
	for (let i = 0; i<3; i++) {
		deadOp = document.getElementById("size"+(16+i*2));
		deadOp.remove();
	}
}




function createField (size1){
	deleteSizeOptions();
	size = size1; // global
	//document.getElementById("result").innerHTML = size;
	let field = document.createElement('table');
	document.getElementById("actionField").appendChild(field);
	field.id = "snakeField";
	for (let i = 1; i<=size; i++) {
		let row = document.createElement("tr");
		document.getElementById("snakeField").appendChild(row);
		row.id = "row"+i;
		for (let y = 1; y<=size; y++){
			let cell = document.createElement("td");
			row.appendChild(cell);
			cell.id = "cell "+y+" "+i;
			cell.className = "cells row"+i+" colomn"+y;
			//cell.className = "row" + i;
			//cell.class = "column" + y;
			cell.innerHTML = "";
		}
	}
	let startButton = document.createElement("button");
	document.getElementById("tooltip").appendChild(startButton);
	startButton.innerHTML = "Start";
	startButton.id = "startButton";
	startButton.type = "button";
	startButton.onclick = startGame;

	let info = document.createElement("p");
	document.getElementById("actionField").appendChild(info);
	info.id = "info";
	info.type = "p";
	info.innerHTML = "&larr; &uarr;	&rarr; &darr; <br> Управление стрелками!";

	const requestPlayers = new XMLHttpRequest();
	requestPlayers.onload = function (){
		const leaderBoard = JSON.parse(this.responseText);
		for (let i in leaderBoard.players)
			info.innerHTML += "<br>" + i.name + ": " + i.score;		 
	}
	requestPlayers.open("GET", "leaderBoard.json");
	requestPlayers.send();

}

function startGame() {
	startButton.remove();

	let endButton = document.createElement("button");
	document.getElementById("tooltip").appendChild(endButton);
	endButton.innerHTML = "End";
	endButton.id = "endButton";
	endButton.type = "button";
	endButton.onclick = endGame;


	game().then(
		function (score) {
			window.alert(score+" end score");
			endGame();
		},
		(function (){
			//endGame();
		})()
	);

}

function endGame() {
	document.getElementById("snakeField").remove();
	document.getElementById("endButton").remove();
	document.getElementById("info").remove();
	document.getElementById("tooltip").remove();
	startAction();
}






async function game(){
	document.onkeydown = checkKey;
	let tickInterval = 800;
	let score = 0;
	let headx = 10;
	let heady = 10;
	let foodx, foody;
	//let head = document.getElementById("cell " + headx+" "+ heady);
	let currentDirection = "Right";
	let food = false;
	class tail{
		constractor(x,y){
			this.x = x;
			this.y = y;
		}
	}
	let gameStatus = true
	const body = [];
	body[0] = new tail();
	body[0].x = headx;
	body[0].y = heady;
	console.log(body[0].x);
	let previousDirection = "Right";




	function tick(resolve) {
		if (food == false) {
			placeFood()
		};
		//score++;  //log
		//console.log(score); //log
		try {
			headMovement(currentDirection);
			eating();
			bodyMoving();
			bodyMovingDisplay(body);
			headMovementDisplay(headx, heady);
		} 
		catch (error) {
			gameStatus = false;
		}

		console.log (headx + " " + heady);


		/*if (score >= 5) {
			clearInterval(axsaxsxa);
			return resolve(score)}*/
		resolve();
	}


	while (gameStatus) {
		const timerStarter = new Promise((resolve,reject) => {
			setTimeout(function(){tick(resolve)},tickInterval);
			
		})
		await timerStarter;
	}



	/*const timerStartet = new Promise((resolve) => {
		axsaxsxa = setInterval(function(){tick(resolve)},tickInterval);
	})
	await timerStartet;
	window.alert("asf");
	/*window.addEventListener("keydown.ArrowDown", function(){lastDir("Down")});
	window.addEventListener("keydown.ArrowUp", function(){lastDir("Up")});
	window.addEventListener("keydown.ArrowLeft", function(){lastDir("Left")});
	window.addEventListener("keydown.ArrowRight", function(){lastDir("Right")});
	*/



	return score













	function checkKey(dir) {

		function lastDir (dir) {
			currentDirection = dir;
			console.log (dir);
		}

		dir = window.event;
	
		if (dir.keyCode == '38') {
			lastDir("Up")// up arrow
		}
		else if (dir.keyCode == '40') {
			lastDir("Down")// down arrow
		}
		else if (dir.keyCode == '37') {
		   lastDir("Left")// left arrow
		}
		else if (dir.keyCode == '39') {
		   lastDir("Right")// right arrow
		}
	
	}
	


	function placeFood(){
		let foodCoordinate = Math.floor(Math.random()*size*size);
		foodx = foodCoordinate%size+1;
		foody = (foodCoordinate-foodx+1)/size+1;
		console.log("eda = "+foodCoordinate+" "+foodx+" "+foody);
		if (document.getElementById("cell "+foodx+" "+foody).innerHTML == "") {
			food = true;
			document.getElementById("cell "+foodx+" "+foody).innerHTML = "C";
		} else{
			//window.alert("perecritie");
			placeFood();
		}
	}

	
	function headMovementDisplay(headx, heady){
			document.getElementById("cell "+headx+" "+heady).innerHTML = "H";
	}



	function headMovement(curDir){
		if (curDir == "Left" && previousDirection!="Right") {
			headx = headx-1;
			previousDirection = currentDirection;
		} else if (curDir == "Right" && previousDirection!="Left") {
			headx = headx+1;
			previousDirection = currentDirection;
		} else if (curDir == "Up" && previousDirection!="Down") {
			heady = heady-1;
			previousDirection = currentDirection;
		} else if (curDir == "Down" && previousDirection!="Up") {
			heady = heady+1;
			previousDirection = currentDirection;
		} else {
			currentDirection = previousDirection;
			headMovement(currentDirection)
		} 
	}

	function eating() {
		if (headx == foodx && heady == foody){
			score ++;
			food = false;
			body[body.length] = new tail;
			console.log(body);
			tickInterval = (tickInterval/100)*95	;
		}
	}
	
	function bodyMoving() {
		
		last = body.at(body.length-1);
		if (food == true) {
			document.getElementById("cell "+last.x+" "+last.y).innerHTML = "";

		}
		for (let i = body.length-1; i>0; i--){
			if(body[i-1].x != headx   ||   body[i-1].y != heady) {
				body[i].x = body[i-1].x;
				body[i].y = body[i-1].y;
			} else {
				gameStatus = flase;
			}
		}
			body[0].x = headx;
			body[0].y = heady;

		if (food == false) {
			document.getElementById("cell "+last.x+" "+last.y).innerHTML = "";

		}

	}

	function bodyMovingDisplay(arr){
		for (let i = 0; i<arr.length; i++){
			document.getElementById("cell "+arr[i].x+" "+arr[i].y).innerHTML = "T";
		}
	}


}







/*let game = new Promise (function(nothing,gameEnd) {
	currentDirection = "right";
	timeInterval = 3000;


	let gameStop = false;
	while (gameStop) {
		const tick = setInterval (inputHandle, timeInterval)
	}
	window.alert('aaasadasd');
	gameEnd();



})
function inputHandle(){
	clearInterval(tick);

}
*/

/*function tick (){
	switch (currentDirection){
		case "left":
			headx = headx-1;
			break;
		case "right":
			headx = headx+1
			break;
		case "up":
			heady = headx-1;
			break;
		case "down":
			heady = headx+1;
			break;

		}
		if (headx >= size || headx <= 0 || heady >= size || heady <= 0){
			window.alert("gg");
			endGame();
		}
		head = document.getElementById("cell " + headx + " " + heady);
		head.innerHtml = "xuy";
}*/

















function snakeStart () {
	document.getElementById("snakeStartButton").remove();
	for (let i = 0; i<3; i++) {
		let size = 16+i*2;
		let sizeButton = document.createElement("button");
		document.getElementById("snake").appendChild(sizeButton);
		sizeButton.innerHTML = size;
		sizeButton.id = "size"+size;
		sizeButton.type = "button";
		sizeButton.onclick = function(){	createField(size)

		};
	}
}




function createField (size1){
	deleteSizeOptions();
	size = size1; // а оно так сработает??
	//document.getElementById("result").innerHTML = size;
	let field = document.createElement('table');
	document.getElementById("snake").appendChild(field);
	field.id = "snakeField";
	for (let i = 1; i<=size; i++) {
		let row = document.createElement("tr");
		document.getElementById("snakeField").appendChild(row);
		row.id = "row"+i;
		for (let y = 1; y<=size; y++){
			let cell = document.createElement("td");
			row.appendChild(cell);
			cell.id = "cell "+y+" "+i;
			cell.class = "cells";
			cell.class = "row" + i;
			cell.class = "column" + y;
			cell.innerHTML = cell.id;
		}
	}
	let startButton = document.createElement("button");
	document.getElementById("snake").insertBefore(startButton,snakeField);
	startButton.innerHTML = "Start";
	startButton.id = "startButton";
	startButton.type = "button";
	startButton.onclick = startGame;

}

function startGame() {
	filth = document.getElementById("startButton");
	filth.remove();
	headx = 10;
	heady = 10;
	let head = document.getElementById("cell " + headx+" "+ heady);
	//const directions = new Set (["left","right","up","down"]);
	game().then(
		function (score) {
			window.alert(score+" end score");
		}
	);

}
async function game(){
	document.onkeydown = checkKey;
	let tickInterval = 2000;
	let score = 0;
	let currentDirection = "Right";

	function checkKey(dir) {
	
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
	
	function headMovement(headx, heady, dir){
		document.getElementById("cell"+" "+headx+" "+heady).innerHTML = "H";
		switch (dir){
			case "Left":
				document.getElementById("cell"+" "+(headx+1)+" "+heady).innerHTML = "T";
				break;
			case "Right":
				document.getElementById("cell"+" "+(headx-1)+" "+heady).innerHTML = "T";
				break;
			case "Up":
				document.getElementById("cell"+" "+headx+" "+(heady+1)).innerHTML = "T";
				break;
			case "Down":
				document.getElementById("cell"+" "+headx+" "+(heady-1)).innerHTML = "T";
				break;
			}
	}

	function lastDir (dir) {
		currentDirection = dir;
		console.log (dir);
	}


	function tick(resolve) {
		score++;
		console.log(score);
		switch (currentDirection){
			case "Left":
				headx = headx-1;
				break;
			case "Right":
				headx = headx+1;
				break;
			case "Up":
				heady = heady-1;
				break;
			case "Down":
				heady = heady+1;
				break;
			}
			console.log (headx + " " + heady);
			headMovement(headx, heady, currentDirection);

		if (score >= 5) {
			clearInterval(axsaxsxa);
			return resolve(score)}
	}

	const aboba = new Promise((resolve) => {
		axsaxsxa = setInterval(function(){tick(resolve)},tickInterval);
	})
	await aboba;
	window.alert("asf");
	/*window.addEventListener("keydown.ArrowDown", function(){lastDir("Down")});
	window.addEventListener("keydown.ArrowUp", function(){lastDir("Up")});
	window.addEventListener("keydown.ArrowLeft", function(){lastDir("Left")});
	window.addEventListener("keydown.ArrowRight", function(){lastDir("Right")});
	*/
	return score
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



function endGame() {
	document.getElementsByClassName(cells);
	let startButton = document.createElement("button");
	document.getElementById("snake").insertBefore(startButton,snakeField);
	startButton.innerHTML = "Start";
	startButton.id = "startButton";
	startButton.type = "button";
	startButton.onclick = startGame;

}











function deleteSizeOptions(){
	for (let i = 0; i<3; i++) {
		deadOp = document.getElementById("size"+(16+i*2));
		deadOp.remove();
	}


}

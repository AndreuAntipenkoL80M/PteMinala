const operators = new Set (["+","-","*","/"]);



function parenthesisSettler(calculation) {
	if (operators.has(calculation[0])) {
			stop();
			return;
	}
	
	if (operators.has(calculation[calculation.length-1])) {
			stop();
			return;
	}
	
	
	let openp = 0;
	let closep = 0;
	for (let i = 0; i < calculation.length; i++) {
		if((operators.has(calculation[i]) && operators.has(calculation[i+1])) || ((calculation[i] == "(") && (calculation[i+1] == ")"))) {
			stop();
			return;
		}
		
		if (calculation[i] == "(") {
		//console.log("[qwevvcd");
			openp += 1
		}
		
		if (calculation[i] == ")") {
			closep += 1
		}
		
	}
	
	if (openp>=closep){
		for (i = 0; i < openp-closep; i++) {
			calculation += ")";
		}
	} else {
		stop();
		return;
	}
	
	
	
	
	
	let exp;
	if (calculation.indexOf('(') != -1) {
		if (calculation.lastIndexOf(')') != -1)  {
			if (calculation.indexOf('(') < calculation.lastIndexOf(')')) {
				exp = calculation.slice  (calculation.indexOf('(')+1    ,     calculation.lastIndexOf(')'));
				window.alert(exp);
				calculation = calculation.slice(0, calculation.indexOf('(')) + parenthesisSettler(exp) + calculation.slice(calculation.lastIndexOf(')')+1);
				window.alert(calculation+'vottakvot');
			} else {
				stop();
				return;
			}
		} else{
			stop();
			return;
		}
	}
	else{
		if (calculation.indexOf(')') != -1) {
			stop();
			return;
		}
		
	}
	window.alert('solution' + calculation);
	resulttt = solution (calculation);
	document.getElementById("result").innerHTML = resulttt
	return resulttt;
}

function stop(){
	//expression = '';
	//document.getElementById("expression").innerHTML = "";
	document.getElementById("result").innerHTML = "";
	window.alert('Хуйню написал');
}

























function solution(equasion){                //equasion - сторока без скобок
	window.alert('pochalosya');

	for (let i = equasion.length-1; i>=0; i--) {
		
			if (equasion[i] == '+' || equasion[i] == '-'){
				let a = equasion.slice(0,i);
				window.alert(a);
				let b = equasion.slice(i+1,equasion.length);
				window.alert(b);
				switch (equasion[i]){
					case "+":
						window.alert('a');
						let first = solution(a);
						let second = solution(b);
						window.alert(first+second);
						equasion = first+second;
						break;		
					case "-":
						window.alert('b');
						equasion = solution(a)-solution(b);
						break;
					
				} 
			}
	
	}
	for (i = 0; i < equasion.length; i++) {
		if (equasion[i] == '*' || equasion[i] == '/'){
			let a = equasion.slice(0,i);
			let b = equasion.slice(i+1,equasion.length);
			switch (equasion[i]){
				case "*":
					window.alert('c');
					equasion = solution(a)*solution(b);
					break;		
				case "/":
					window.alert('d');
					equasion = solution(a)/solution(b);
					break;

				
				
			} 
		}
	
	}
	let res = Number(equasion);
	window.alert(res + typeof(res));
	return res;
}







	window.alert(typeof(calculation));

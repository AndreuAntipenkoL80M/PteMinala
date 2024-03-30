function calculate(calculation) {
	let exp;
	if (calculation.indexOf('(') != -1) {
		if (calculation.lastIndexOf(')') != -1)  {
			if (calculation.indexOf('(') < calculation.lastIndexOf(')')) {
				exp = calculation.slice  (calculation.indexOf('(')+1    ,     calculation.lastIndexOf(')'));
				window.alert(exp);
				calculation = calculation.slice(0, calculation.indexOf('(')) + calculate(exp) + calculation.slice(calculation.lastIndexOf(')')+1);
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
	window.alert('solving' + calculation);
	resulttt = solving (calculation);
	document.getElementById("result").innerHTML = resulttt
	return resulttt;
}

function stop(){
	expression = '';
	document.getElementById("expression").innerHTML = "";
	document.getElementById("result").innerHTML = "";
	window.alert('Хуйню написал');
}
function solving(equasion){                //equasion - сторока без скобок
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
					let first = solving(a);
					let second = solving(b);
					window.alert(first+second);
					equasion = first+second;
					break;		
				case "-":
					window.alert('b');
					equasion = solving(a)-solving(b);
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
					equasion = solving(a)*solving(b);
					break;		
				case "/":
					window.alert('d');
					equasion = solving(a)/solving(b);
					break;

				
				
			} 
		}
	
	}
	let res = Number(equasion);
	window.alert(res + typeof(res));
	return res;
}







	window.alert(typeof(calculation));

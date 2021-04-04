
console.log("connected");

function check(val){

	console.log("valu is = " + val);
	var chck = document.querySelector("#" + val);
	var rm = document.querySelectorAll(".td_" + val);

	if(chck.checked){
		for (var i = 0; i < rm.length; i++)
			rm[i].style.display = "block";

		document.querySelector("#input" + val).style.display = "block";
		document.querySelector("#input_lower" + val).style.display = "block";
		document.querySelector("#input_upper" + val).style.display = "block";
	}
	else {
		for (var i = 0; i < rm.length; i++)
			rm[i].style.display = "none";

		document.querySelector("#input" + val).style.display = "none";
		document.querySelector("#input_lower" + val).style.display = "none";
		document.querySelector("#input_upper" + val).style.display = "none";
	}
}

for(var i = 0; i < len; i++){
	var chck = document.querySelector("#" + attribute[i][0]);
	var inpt = document.querySelector("#input_" + attribute[i][0]);
	var inpt_lower = document.querySelector("#input_lower" + attribute[i][0]);
	var inpt_upper = document.querySelector("#input_upper" + attribute[i][0]);

	chck.addEventListener('mouseover', function () {
		
	});
}
var btn_q = document.getElementsByClassName("mycss");

function test(table_name){
	
	console.log("select * from "+table_name);

}

for (var i = 0; i < btn_q.length; i ++) {
    (function () {
		
		var table_name = btn_q[i].text;
        btn_q[i].addEventListener("click", function() { test(table_name); }, false);
     
    }()); 
}
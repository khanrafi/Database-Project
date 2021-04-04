var express = require("express");
var app = express();
var ejs = require("ejs");
var bodyParser = require("body-parser");
var oracledb = require('oracledb');


var username = "database";
var pass = "112358";
var binds;
var host = "127.0.0.1";
var port = 9000;
var link = "http://127.0.0.1:9000/";

var btn=1;
var log=1;


app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.static(__dirname + '/design')); //this add the folder for css file
app.use('/design', express.static('design'));
app.set("view engine", "ejs");//for this line, file type is not needed in render()

app.get("/", function (req, res) {

	res.render('home', {
		btn:btn,
		link: link
	});
});


app.get("/r/:test", function (req, res) {

	res.render('home', {
		btn:btn,
		link: link
	});
});

app.get("/login-viewer", function (req, res) {

	log=3;
	btn=1;
	res.render('login', {
		flag:true,
		log:log,
		btn:btn,
		link: link
	});
});
app.get("/login-developer", function (req, res) {

	log=3;
	btn=2;
	res.render('login', {
		flag:true,
		log:log,
		btn:btn,
		link: link
	});
});
app.get("/login-admin", function (req, res) {

	log=3;
	btn=3;
	res.render('login', {
		flag:true,
		log:log,
		btn:btn,
		link: link
	});
});


app.get("/get", function (req, res) {
	res.render('get', {
		btn:btn,
		flag:true,
		link: link
	});
});

app.get("/query/:table", function (req, res) {
	console.log(req.params.table);

	oracledb.getConnection({
			user: username,
			password: pass,
			connectString: "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(CONNECT_DATA =(SID= xe)))"
		},
		function (err, connection) {
			if (err) {
				console.error("error in submitted: " + err.message);
				return;
			}


			var colQuery = "SELECT column_name FROM all_tab_cols WHERE table_name = :tn order by COLUMN_ID";

			var attribute2=[];
			console.log("oracle entered");

				connection.execute(colQuery,[req.params.table], function (err, result) {
				if (err) {
					console.log(err);
					return;
				} else {
					console.log("no error in query1");
				}

				console.log(result.rows);


				 attribute2 = result.rows;
				console.log("checking1..............");
					var sqlQuery = `select * from ${req.params.table}`;
				 console.log(result.rows);
				 connection.execute(sqlQuery, function (err, result) {
					 if (err) {
						 console.log(err);
						 return;
					 } else {
						 console.log("no error in query2");
					 }
					// console.log(attribute2);
					 console.log(result.rows);


					 //var attribute = ["name", "ID", "Nationality", "Religion", "Gender", "Email_address", "mobile", "Birth_Date", "city", "Street", "Zip_code", "Height", "Weight"];

					 var MX = result.rows.length;
					 var len = attribute2.length;

					 res.render('query', {
						 tn:req.params.table,
						 btn:btn,
						 attribute: attribute2,
						 value: result.rows,
						 link: link,
						 MX: MX,
						 len: len
					 });
				 });

			});



		}
	);



});

app.post("/post", function (req, res) {
	console.log(req.body);

	oracledb.getConnection({
			user: username,
			password: pass,
			connectString: "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(CONNECT_DATA =(SID= xe)))"
		},
		function (err, connection) {
			if (err) {
				console.error("error in submitted: " + err.message);
				return;
			}

			var sqlQuery = 'INSERT INTO person VALUES (:t1,:t2,:t3,:t4,:t5,:t6,:t7,:t8,:t9,:t10,:t11,:t12)';
			 var date= new Date(req.body.Date);
			binds = [{
				t1: req.body.ID,
				t2: req.body.Name,
				t3: date,
				t4: req.body.Email,
				t5: req.body.Nationality,
				t6: req.body.BloodGroup,
				t7: req.body.Religion,
				t8: req.body.Gender,
				t9: req.body.City,
				t10: req.body.ZipCode,
				t11: req.body.Street,
				t12: req.body.Appartment
			}];
			console.log("oracle entered bind=" + binds[0]);
			console.log("binds = " + binds);
			console.log("\n t1=" + binds[0].t1 + "\n t2=" + binds[0].t2 + "\n t3=" + binds[0].t3 + "\n t4=" + binds[0].t4 + "\n t5=" + binds[0].t5 + "\n t6=" + binds[0].t6 + "\n t7=" + binds[0].t7 + "\n t8=" + binds[0].t8 + "\n t9=" + binds[0].t9 + "\n t10=" + binds[0].t10 + "\n t11=" + binds[0].t11 + "\n t12=" + binds[0].t12);

			connection.execute(sqlQuery, binds[0], {
				autoCommit: true
			}, function (err, result) {
				if (err) {
					console.log(err);
					return;
				} else{
					console.log('Rows inserted: ' + result.rowsAffected);
					return;
				}
			});
		}
	);

	res.render('get', {
		btn:btn,
		flag: false,
		link: link
	});
});


app.get("/register", function (req, res) {
		log=1;

	res.render('login', {
		btn:btn,
		log:log,
		flag:true,
		link: link
	});
});


app.post("/submitted", function (req, res) {
	console.log(req.body);

	oracledb.getConnection({
			user: username,
			password: pass,
			connectString: "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(CONNECT_DATA =(SID= xe)))"
		},
		function (err, connection) {
			if (err) {
				console.error("error in submitted: " + err.message);
				return;
			}

			binds = [{
				t1: req.body.name,
				t2: req.body.email,
				t3: req.body.password,
				t4: req.body.role
			}];
			var sqlQuery = 'INSERT INTO users VALUES (:t1,:t2,:t3,:t4)';

			connection.execute(sqlQuery, binds[0], {
				autoCommit: true
			}, function (err, result) {
				if (err) {
					console.log(err);
					return;
				} else{
					console.log('Rows inserted: ' + result.rowsAffected);
					return;
				}
			});
		}
	);

	res.render('login', {
		btn:btn,
		log:log,
		flag: false,
		link: link
	});
});





app.post("/logged", function (req, res) {
	console.log(req.body);

	oracledb.getConnection({
			user: username,
			password: pass,
			connectString: "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(CONNECT_DATA =(SID= xe)))"
		},
		function (err, connection) {
			if (err) {
				console.error("error in submitted: " + err.message);
				return;
			}

			binds = [{
				t1: req.body.name,
				t2: req.body.email,
				t3: req.body.password,
				t4: req.body.role
			}];
			var sqlQuery = "select * from users where  name = :n and email= :e and password=:p and role=:r";

			connection.execute(sqlQuery,[binds[0].t1,binds[0].t2,binds[0].t3,binds[0].t4], function (err, result) {
			if (err || result.rows.length==0 ||(btn==1 && binds[0].t4!='VIEWER')||(btn==2 && binds[0].t4!='DEVELOPER')||(btn==3 && binds[0].t4!='ADMIN')) {
				console.log("login failed!!");
				btn=1;
				log=3;
				res.render('home', {
					btn:btn,
					log:log,
					flag: false,
					link: link
				});
				return;
			} else {
				console.log("login successful!!");

				log=3;
				res.render('home', {
					btn:btn,
					log:log,
					flag: false,
					link: link
				});
			}




			 attribute2 = result.rows;
			console.log("checking1..............");
			 console.log(result.rows.length);

		});
		}
	);



});






app.get("/*", function (req, res) {
	//gets everything if above get function are not used
	res.send("<h1><center>"+"Error 404 : PAGE NOT FOUND!!"+"</center></h1>");
});

app.listen(port, host, function (err) {

	if (err)
		console.log("error happend");

	console.log("server has started on link : " + link);
});
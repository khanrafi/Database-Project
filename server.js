//++++++++++++++++++++++++++++++++++++ packages ++++++++++++++++++++++++++++++++++++++++
var express = require("express");
var app = express();
var ejs = require("ejs");
var bodyParser = require("body-parser");
var oracledb = require('oracledb');

oracledb.autoCommit = true;
//++++++++++++++++++++++++++++++++++++++END+++++++++++++++++++++++++++++++++++++++

/*
! tasfik rahman
? tasfik rahman
todo tasfik rahman
* tasfik rahman
// tasfik rahman
*/

//+++++++++++++++++++++ORACLE DATABASE LOGIN CREDENTIALS++++++++++++++++++++++++++

var username = "tasfik6";
var pass = "root";
var host = "127.0.0.1";
var port = 9000;
var link = "http://127.0.0.1:9000/";
var login_flag=true;
var flag_q=false;

//++++++++++++++++++++++++++++++++++++++END+++++++++++++++++++++++++++++++++++++++

//+++++++++++++++++++++++++++++++++GLOBAL VARIABLES+++++++++++++++++++++++++++++++

var user="Guest";
var email_g;
var binds;
var btn=1;  //INDICATES VIEWER OR DEVELOPER OR ADMIN MODE
var log=1;  //INDICATE WHAT LOGIN PAGE WILL DO LOGIN OR REGISTRATION
var tables;
var data=[];
var news;
var search='';
//++++++++++++++++++++++++++++++++++++++END+++++++++++++++++++++++++++++++++++++++

//++++++++++++++++++++++++SETTING THE DEFAULT PROJECT PATH++++++++++++++++++++++++

app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.static(__dirname + '/design')); //this add the folder for css file
app.use('/design', express.static('design'));
app.set("view engine", "ejs");//for this line, file type is not needed in render()

//++++++++++++++++++++++++++++++++++++++END+++++++++++++++++++++++++++++++++++++++
/*app.get("/", function (req, res) {

	res.render('home', {
		user:user,
		btn:btn,
		link: link
	});
});*/

//+++++++++++++++++++++++++++++++++++++++++++++++++START++++++++++++++++++++++++++++++++++++++++++++++++++++++++=
// RENDERING INITIAL HOME PAGE WITH TABLE NAMES FROM SQL QUERY IN CARD
app.get("/", function (req, res) {

	// console.log(req.params.table);

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


			var table_Query = "SELECT table_name FROM all_tables where owner= :tn and table_name not like 'APEX$%' and table_name  not like 'DEMO%' and table_name  not like 'DEPT' and table_name  not like 'EMP'";

			var attribute2 = [];
			// console.log("oracle entered");

			connection.execute(table_Query,[username.toUpperCase()], function (err, result) {
				if (err) {
					console.log(err);
					return;
				} else {
					// console.log("no error in query1");
				}

				// console.log(result.rows);
				// console.log(result.rows[0][0]);
					tables=result.rows;
					var table_Query = "select news from timeline order by id desc";

					var attribute2 = [];
					// console.log("oracle entered");

					connection.execute(table_Query ,function (err, result) {
						if (err) {
							console.log(err);
							return;
						} else {
							news=result.rows;
							// console.log("no error in query1");
							// console.log(result.rows);
							// console.log(result.rows[0][0]);
						}


						//	tables=result.rows;
							res.render('home', {
								news:news,
								tables:tables,
								user:user,
								btn:btn,
								link: link
							});
				});
		});
	});

});

app.get("/developer-home", function (req, res) {

	// console.log(req.params.table);

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


			var table_Query = "SELECT view_name from user_view where email= :em";

			var attribute2 = [];
			// console.log("oracle entered");

			connection.execute(table_Query,[email_g], {
				autoCommit: true
			} ,function (err, result) {
				if (err) {
					console.log(err);
					return;
				} else {
					// console.log("no error in query1");
					// console.log(result.rows);
					console.log(result.rows[0][0]);
				}


					tables=result.rows;
				res.render('home', {
					news:news,
					tables:tables,
					user:user,
					btn:btn,
					link: link
				});
		});
	});

});
//++++++++++++++++++++++++++++++++++++++++++++++++END++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=

//++++++++++++++++++++++++++++++++++++++++++++++++START+++++++++++++++++++++++++++++++++++++++++++++++++++++++++=
// TESTING PURPOSE
app.get("/r/:test", function (req, res) {

	res.render('home', {
		news:news,
		tables:result.rows,
			user:user,
		btn:btn,
		link: link
	});
});
app.get("/error", function (req, res) {

// console.log(req.body);
res.render('error', {
	error:'This is an error message!!',
		user:user,
	log:log,
	btn:btn,
	link: link
});
});
//++++++++++++++++++++++++++++++++++++++++++++++++++END++++++++++++++++++++++++++++++++++++++++++++++++++++++++=

//++++++++++++++++++++++++++++++++++++++++++++++++++START+++++++++++++++++++++++++++++++++++++++++++++++++++++++=
//RENDERING LOGIN PAGES FOR VIEWER,DEVELOPER & ADMIN
app.get("/login-viewer", function (req, res) {

	log=3;
	btn=1;
	res.render('login', {
		login_flag:true,
			user:user,
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
		login_flag:true,
			user:user,
		flag:true,
		log:log,
		btn:btn,
		link: link
	});
});
app.get("/login-volunteer", function (req, res) {

	log=3;
	btn=21;
	res.render('login', {
		login_flag:true,
			user:user,
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
		login_flag:true,
			user:user,
		flag:true,
		log:log,
		btn:btn,
		link: link
	});
});

app.get("/admin-home", function (req, res) {

	res.render('admin_do', {
		login_flag:true,
			user:user,
		flag:false,
		log:log,
		btn:btn,
		link: link
	});
});
//++++++++++++++++++++++++++++++++++++++++++++++++++END++++++++++++++++++++++++++++++++++++++++++++++++++++++++=



//+++++++++++++++++++++++++++++new features++++++++++++++++++++++++++++++++++++++++++++++

app.get("/admin-do", function (req, res) {

	log=3;
	btn=3;
	res.render('admin_do', {
			user:user,
		flag:true,
		log:log,
		btn:btn,
		link: link
	});
});

	app.get("/sql", function (req, res) {

		log=3;
		btn=3;
		res.render('sql', {
			data:data,
				user:user,
			log:log,
			btn:btn,
			link: link
		});
	});

	app.post("/run", function (req, res) {

		// console.log(req.params.table);

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


				var table_Query = req.body.name;

				var attribute2 = [];
				// console.log("oracle entered");

				connection.execute(table_Query, function (err, result) {
					if (err) {
						console.log(err);
						res.render('sql', {
							data:"",
							user:user,
							btn:btn,
							link: link
						});
					} else {
						// console.log("no error in query1");
						// console.log(result.rows);
						// console.log(result.rows[0][0]);
							tables=result.rows;
						res.render('sql', {
							data:tables,
							user:user,
							btn:btn,
							link: link
						});
					}


			});
		});

	});

	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ TIME LINE start $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$


	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ TIME LINE END  $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$



	app.get("/user-requests", function (req, res) {
		// console.log(req.params.table);

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


				var colQuery = "SELECT * from user_requests";

				var attribute2 = [];
				// console.log("oracle entered");

				connection.execute(colQuery, function (err, result) {
					if (err) {
						console.log(err);
						return;
					} else {
						// console.log("no error in query1");
					}

					// console.log(result.rows);
					// console.log(result.rows[2][1]);

				res.render('request', {
						user:user,
					table: req.params.table,
					data: result.rows,
					btn: btn,
					flag: true,
					link: link
				});
			});
		});

	});


	app.post("/requests", function (req, res) {

		// console.log(req.body.access);

		// console.log("worked!!");
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


				var table_Query = "select * from user_requests";
				var permit_query;
				console.log(req.body.access);
				if(req.body.access=="grant"){
						//permit_query= "update USER_REQUESTS set REQUEST = 'GRANTED' where EMAIL = '"+req.body.email+"'";
						permit_query= "update USER_REQUESTS set PERMISSION = 'GRANTED' where EMAIL = :tn";
						 console.log("query ran!!");
				}
				else
					{
							permit_query= "select * from user_requests" ;
						}
				var attribute2 = [];
				// console.log(req.body);
				// console.log(permit_query);
				connection.execute(permit_query,[req.body.email],{
					autoCommit: true
				} ,function (err, result) {
					if (err) {
						console.log(err);
						res.render('request', {
							data:"",
							user:user,
							btn:btn,
							link: link
						});

					} else {
						// console.log("no error in query2");
						res.render('request', {
							data:"",
							user:user,
							btn:btn,
							link: link
						});
					}
				 console.log(attribute2);
			 	// console.log(result.rows);


				});

		});

	});

	app.get("/view-assign", function (req, res) {
		// console.log(req.params.table);

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


				var query1 = "SELECT * from user_view";

				var attribute2 = [];
				var data1;
				var data2;
				var data3;
				// console.log("oracle entered");

				connection.execute(query1, function (err, result) {
					if (err) {
						console.log(err);
						return;
					} else {
						// console.log("no error in query1");
					}
					data1=result.rows;
					// console.log(data1);
						var query2 = "SELECT view_name  from user_views";
					connection.execute(query2, function (err, result) {
 					 if (err) {
 						 console.log(err);
 						 return;
 					 } else {
 						//  console.log("no error in query2");
 					 }
 					console.log(attribute2);
					data2=result.rows;
					// console.log(data2);
					var query3 = "select email from user_requests"; ////query oracle sql
					// console.log(result.rows);
					connection.execute(query3, function (err, result) {
						if (err) {
							console.log(err);
							return;
						} else {
							// console.log("no error in query3");
						}
						data3=result.rows;
						// console.log(data3);
					 console.log(attribute2);
						console.log(result.rows);

						res.render('myviews', {
 						 user:user,
 						 table: req.params.table,
 						 data1: data1,
 						 data2:data2,
 						 data3:data3,
 						 btn: btn,
 						 flag: true,
 						 link: link
 					 });
					});
			});
		});

	});
});

app.post("/view-assigned", function (req, res) {
	// console.log(req.body);

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


			var query4 = "SELECT * from user_view";
			var query2 = "SELECT view_name  from user_views";
			var query3 = "select name from users";
			var query1 = "insert into user_view values (:t1,:t2)";
			var attribute2 = [];
			var data1;
			var data2;
			var data3;
			var data4;
			// console.log("oracle entered");

			connection.execute(query1, [req.body.view,req.body.email], {
				autoCommit: true
			},function (err, result) {
				if (err) {
					console.log(err);
					return;
				} else {
					// console.log("no error in query1");
				}


				connection.execute(query2, function (err, result) {
				 if (err) {
					 console.log(err);
					 return;
				 } else {
					//  console.log("no error in query2");
				 }
				console.log(attribute2);
				data2=result.rows;
				// console.log(data2);
			 ////query oracle sql
				// console.log(result.rows);
				connection.execute(query3, function (err, result) {
					if (err) {
						console.log(err);
						return;
					} else {
						// console.log("no error in query3");
					}
					data3=result.rows;
					// console.log(data3);
					connection.execute(query4,function (err, result) {
 					 if (err) {
 						 console.log(err);
 						 return;
 					 } else {
 						//  console.log("no error in query4");
 					 }
					 data1=result.rows;
					//  console.log(data1);
 					console.log(attribute2);
 					console.log(result.rows);

					 res.render('myviews', {
 					 user:user,
 					 table: req.params.table,
 					 data1: data1,
 					 data2:data2,
 					 data3:data3,
 					 btn: btn,
 					 flag: true,
 					 link: link
 				 });
 				 });
		});
	});

});
});
});
app.get("/home", function (req, res) {

	// console.log(req.params.table);

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


			var table_Query = "SELECT table_name FROM all_tables where owner= :tn and table_name not like 'APEX$%' and table_name  not like 'DEMO%' and table_name  not like 'DEPT' and table_name  not like 'EMP'";

			var attribute2 = [];
			// console.log("oracle entered");

			connection.execute(table_Query,[username.toUpperCase()], function (err, result) {
				if (err) {
					console.log(err);
					return;
				} else {
					// console.log("no error in query1");
				}

				// console.log(result.rows);
				// console.log(result.rows[0][0]);
					tables=result.rows;
					btn=1;
					user="Guest";
				res.render('home', {
					news:news,
					tables:tables,
					user:user,
					btn:1,
					link: link
				});
		});
	});

});
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



//++++++++++++++++++++++++++++++++++++++++++++++++++START+++++++++++++++++++++++++++++++++++++++++++++++++++++++=
//RENDERING GET PAGES FOR INPUT FORMS
app.get("/get/:table", function (req, res) {
    // console.log(req.params.table);
    req.params.table = req.params.table.toUpperCase();
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


        var colQuery = "SELECT column_name,data_type FROM all_tab_cols WHERE table_name = :tn order by COLUMN_ID";

        var attribute2 = [];
        // console.log("oracle entered");

        connection.execute(colQuery, [req.params.table], function (err, result) {
            if (err) {
                console.log(err);
                return;
            } else {
                // console.log("no error in query1");
            }

            // console.log(result.rows);
            // console.log(result.rows[2][1]);

            seqQuery = `select sequence_name, column_name, prefix from sequence_record where table_name = '${req.params.table}'`;
            console.log(seqQuery);
            connection.execute(seqQuery, function(err, seq){
                if(err){
                    console.log(err);
                    return;
                } else {
                    console.log("no error in finding sequence");
                }

                var temp = 0;
                var seq_name = '';

                if(seq.rows.length > 0 ){
                    var currvalQuery = `select ${seq.rows[0][0]}.nextval from dual`;

                    console.log("currvalQuery = " + currvalQuery);

                    connection.execute(currvalQuery, function (err, currval) {

                        if (err) {
                            console.log(err);
                        } else {
                            console.log("no error in getting currval");

                        }

                        seq_name = seq.rows[0][1];
                        temp = seq.rows[0][2] + currval.rows[0];
                        console.log( "this is tempoooooo    " + temp);
                        console.log("this is seqoooooo    "+seq_name);

                        res.render('get', {
                            sequenced_column: seq_name,
                            currval: temp,
                            user: user,
                            table: req.params.table,
                            column: result.rows,
                            btn: btn,
                            flag: true,
                            link: link
                        });
                    });
                }
                else{
                    res.render('get', {
                        sequenced_column: seq_name,
                        currval: temp,
                        user: user,
                        table: req.params.table,
                        column: result.rows,
                        btn: btn,
                        flag: true,
                        link: link
                    });
                }
                console.log("temp = " + temp + "  seq_name = " + seq_name);

            });
        });
    });

});
//++++++++++++++++++++++++++++++++++++++++++++++++++END++++++++++++++++++++++++++++++++++++++++++++++++++++++++=

//++++++++++++++++++++++++++++++++++++++++++++++++++START+++++++++++++++++++++++++++++++++++++++++++++++++++++++=
//SHOWING TABLE DATA [SELECT * FROM TABLENAME] RENDERING QUERY PAGE
app.get("/query/:table", function (req, res) {
	// console.log(req.params.table);

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


			var colQuery = "SELECT column_name,data_type FROM all_tab_cols WHERE table_name = :tn order by COLUMN_ID";

			var attribute2=[];
			// console.log("oracle entered");

				connection.execute(colQuery,[req.params.table.toUpperCase()], function (err, attribute) {
				if (err) {
					console.log(err);
					return;
				} else {
					// console.log("no error in query1");
				}

				// console.log("column names are = " + attribute.rows);


				// console.log("checking1..............");
				var sqlQuery = `select * from  ${req.params.table}`; ////query oracle sql
				//  console.log(attribute.rows);
				 connection.execute(sqlQuery, function (err, result) {
					 if (err) {
						 console.log(err);
						 return;
					 } else {
						//  console.log("no error in query2");
					 }
					console.log(attribute2);
					//  console.log(result.rows);


					 //var attribute = ["name", "ID", "Nationality", "Religion", "Gender", "Email_address", "mobile", "Birth_Date", "city", "Street", "Zip_code", "Height", "Weight"];

					 var MX = result.rows.length;
					 var len = attribute.rows.length;

					 res.render('query', {
						 	user:user,
						 tn:req.params.table,
						 btn:btn,
						 attribute: attribute.rows,
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
//++++++++++++++++++++++++++++++++++++++++++++++++++END++++++++++++++++++++++++++++++++++++++++++++++++++++++++=

//++++++++++++++++++++++++++++++++++++++++++++++++++START+++++++++++++++++++++++++++++++++++++++++++++++++++++++=
//rendering get page with flag false [data inserted successfully page]
app.post("/post/:table", function (req, res) {
	console.log('\n\n\npost method : ');
	console.log(req.params.table);
	req.params.table = req.params.table.toUpperCase();

	 console.log("recieved values are = " + req.body);

	// console.log(req.body.count);
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

			var sqlQuery = 'INSERT INTO ' + req.params.table + ' VALUES (';
			//var sqlQuery_string = sqlQuery;
			var cnt = 0;
			var cnt2=0;
			for (var pproperty in req.body) {
				if (req.body.hasOwnProperty(pproperty))
					cnt++;
			}
			cnt2=cnt;
			// console.log("cnt = " + cnt);
			console.log(req.body.length);

			binds = [];
			var obj1={};
			var index=0;
			for (var property in req.body) {
				if (req.body.hasOwnProperty(property)) {
					cnt--;

					  index++;
					 if(property.search('DATE') != -1){
						 	//var date= new Date(req.body[property]);
						obj1[property]= req.body[property];
 	 				//	sqlQuery=sqlQuery+':'+property;
					 	sqlQuery += "TO_DATE(:" + property + ", 'yyyy/mm/dd')";
					 	// console.log("date is : " + property);
					 }
					 else{
						obj1[property]=req.body[property];
	 					sqlQuery=sqlQuery+':'+property;
					 }
					 if(index < cnt2)
						 sqlQuery=sqlQuery+',';
					//  console.log("obj1 = " + obj1);
				}
			}
			binds.push(obj1);
			sqlQuery += ')';
		//	sqlQuery_string += ');';

			console.log("oracle entered");
			// console.log("tasfiks ->> sql = " + sqlQuery);
			// console.log("sql in string = " + sqlQuery_string);
			console.log( binds);
			// console.log( binds[0].NAME);

			connection.execute(sqlQuery,binds[0], {
				autoCommit: true
			}, function (err, result) {
				if (err) {
					console.log(err);
					return;
				} else {
					console.log('Rows inserted: ' + result.rowsAffected);
					return;
				}

				// seqQuery = `select sequence_name, column_name from sequence_record where table_name = '${req.params.table}'`;
				// connection.execute(seqQuery, function (err, seq) {
				// 	if (err) {
				// 		console.log(err);
				// 		return;
				// 	} else {
				// 		console.log("no error in finding sequence");
				// 	}

				// 	console.log("found seq are = " + seq.rows);

				// 	var currvalQuery = `select ${seq.rows[0][0]}.nextval from dual`;
				// 	console.log("currvalQuery = " + currvalQuery);

				// 	connection.execute(currvalQuery, function (err, currval) {

				// 		if (err) {
				// 			console.log(err);
				// 		} else {
				// 			console.log("sequence incremented");

				// 		}
				// 	});
				// });
			});
		}
	);

	res.render('get', {
			user:user,
		table:req.params.table,
		btn: btn,
		flag: false,
		link: link
	});
});


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=
//filtering rows from query page
app.post("/query/:table", function(req, res){
	req.params.table = req.params.table.toUpperCase();
	console.log(req.params.table);

	console.log("filtering = ");
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


		var colQuery = "SELECT column_name,data_type FROM all_tab_cols WHERE table_name = :tn order by COLUMN_ID";

		var attribute2 = [];
		console.log("oracle entered");

		connection.execute(colQuery, [req.params.table], function (err, attribute) {
			if (err) {
				console.log("1st error = " + err);
				return;
			} else {
				console.log("no error in query1");
			}

			console.log("column names are = " + attribute.rows);


			console.log("checking1..............");
			var flag = false;
			var sqlQuery2 = `select * from ${req.params.table} where `;
			var defaultSQL2 = `select * from ${req.params.table} `;

			var index = 0;

			var cnt = 0;
			for (var property in req.body) {
				cnt++;
			}


			for (var property in req.body) {
				if (req.body.hasOwnProperty(property)) {

					console.log("property = " + property + " value entered = " + req.body[property]);
					console.log("attribute = " + attribute.rows[index] + " index = " + index);

					if(attribute.rows[index][1] == "VARCHAR2")
					{
						if(req.body[property] != ''){
							console.log("varchar2");
							if(flag == true)
								sqlQuery2 += ` AND `;
							sqlQuery2 += ` ${property} = '${req.body[property]}' `;
							flag = true;

							console.log("temp sqlquery2 = " + sqlQuery2);
						}
						index++;
						continue;
					}

					if(req.body[property][0] != ''){

						// console.log("property1 = " + req.body[property][0].length);
						if(flag == true)
							sqlQuery2 += ` AND `;

						if (attribute.rows[index][1] == "DATE")
							sqlQuery2 += ` ${property} >= TO_DATE('${req.body[property][0]}', 'yyyy/mm/dd') `;
						else
							sqlQuery2 += ` ${property} >= ${req.body[property][0]} `;

						flag = true;
					}

					if(req.body[property][1] != ''){

						// console.log("property1 = " + req.body[property][1].length);
						if(flag == true)
							sqlQuery2 += ` AND `;

						if (attribute.rows[index][1] == "DATE")
							sqlQuery2 += ` ${property} <= TO_DATE('${req.body[property][1]}', 'yyyy/mm/dd') `;
						else
							sqlQuery2 += ` ${property} >= ${req.body[property][1]} `;

						flag = true;
					}

					index ++;
				}
			}

			console.log("sqlQuery = " + sqlQuery2);
			if(flag == false)	sqlQuery2 = defaultSQL2;
			// console.log(attribute.rows);
			connection.execute(sqlQuery2, function (err, result) {
				if (err) {
					console.log(err);
					return;
				} else {
					console.log("no error in query2");
				}

				var MX = result.rows.length;
				var len = attribute.rows.length;

				res.render('query', {
					user: user,
					tn: req.params.table,
					btn: btn,
					attribute: attribute.rows,
					value: result.rows,
					link: link,
					MX: MX,
					len: len
				});
			});

		});
	});
});

app.get("/register", function (req, res) {
		log=1;

	res.render('login', {
		login_flag:true,
			user:user,
		btn:btn,
		log:log,
		flag:true,
		link: link
	});
});
//++++++++++++++++++++++++++++++++++++++++++++++++++END++++++++++++++++++++++++++++++++++++++++++++++++++++++++=

//++++++++++++++++++++++++++++++++++++++++++++++++++START+++++++++++++++++++++++++++++++++++++++++++++++++++++++=
//rendering login page for registration
app.post("/submitted", function (req, res) {
	// console.log(req.body);

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
				t2: req.body.password,
				t3: req.body.email,
				t4: req.body.role,
				t5: "DENIED"
			}];
			var sqlQuery = 'INSERT INTO user_requests VALUES (:t1,:t2,:t3,:t4,:t5)';

			connection.execute(sqlQuery, binds[0], {
				autoCommit: true
			}, function (err, result) {
				if (err) {
					console.log(err);
					return;
				} else{
					console.log('Rows inserted: ' + result.rowsAffected);
					// console.log(binds);
					return;
				}
			});
		}
	);

	res.render('login', {
		login_flag:true,
			user:user,
		btn:btn,
		log:log,
		flag: false,
		link: link
	});
});
//++++++++++++++++++++++++++++++++++++++++++++++++++END++++++++++++++++++++++++++++++++++++++++++++++++++++++++=

//++++++++++++++++++++++++++++++++++++++++++++++++++START+++++++++++++++++++++++++++++++++++++++++++++++++++++++=
//rendering login page for login
app.post("/logged", function (req, res) {
	// console.log(req.body);

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
			if (err || result.rows.length==0 ||(btn==1 && binds[0].t4!='VIEWER')||(btn==2 && binds[0].t4!='DEVELOPER')||(btn==3 && binds[0].t4!='ADMIN')||(btn==21 && binds[0].t4!='Health Volunteer')) {
				console.log("login failed!!");
				// console.log(btn);
				//btn=1;
				log=3;

				res.render('login', {
					login_flag:false,
					tables:tables,
					user:user,
					btn:btn,
					log:log,
					flag: true,
					link: link
				});
				return;
			} else {
				// console.log("login successful!!");
					login_flag=true;
				log=3;
				user=req.body.name;
				email_g=req.body.email;
				var table_Query = "SELECT view_name from user_view where email= :em";

				var attribute2 = [];
				// console.log("oracle entered");

				connection.execute(table_Query,[email_g], {
					autoCommit: true
				} ,function (err, result) {
					if (err) {
						console.log(err);
						return;
					} else {
						// console.log("no error in query1");
						// console.log(result.rows);
					//	console.log(result.rows[0][0]);
					}


						tables=result.rows;
						var page;
						if(btn==1 || btn==2 ) page='home';
						else if(btn==21) page='volunteer_do';
						else page='admin_do';
						res.render(page, {
						news:news,
						tables:tables,
						user:user,
						btn:btn,
						link: link
					});
			});
			}

		});
		}
	);



});
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ 	NEW UPDATES START $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
app.get("/new", function (req, res) {

	res.render('maternalDashboard', {
		data:data,
			user:user,
		log:log,
		btn:btn,
		link: link
	});
});







//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ 	NEW UPDATES END  $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Mothers Profile Adding %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

var mother_name;
var mother_id;
var profile_data;
var profile_data2;
var report_data;

app.get("/m_login", function (req, res) {

	res.render('mother_login',{
		flag:true,
		login_flag:true,
		btn:6,
		log:3,
		user:user,
		link:link
	});
});

app.post("/m_logged", function (req, res) {
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
			binds=[{
				t1:req.body.email,
				t2:req.body.id
			}];

			var sqlQuery = "select * from PERSON where   person_id= :t2 ";

			connection.execute(sqlQuery,[binds[0].t2], function (err, result) {
			if (err || result.rows.length==0 || result.rows[0][0]!=req.body.id || result.rows[0][1]!=req.body.name || result.rows[0][3]!=req.body.email ) {
				// console.log("login failed!!");
				// console.log(btn);
				//btn=1;
			//	log=3;
 //console.log(result.rows);
				res.render('mother_login', {
					login_flag:false,
					tables:tables,
					user:user,
					btn:6,
					log:3,
					flag: true,
					link: link
				});
				return;
			} else {
				// console.log("login successful!!");
				profile_data=result.rows;
				 console.log(result.rows);
				 binds=[{
					 t1:req.body.email,
					 t2:req.body.id
				 }];

				 var sqlQuery = "select * from mothers_pregnancy_info where  person_id= :t2 ";

				 connection.execute(sqlQuery,[binds[0].t2], function (err, result) {
				 if (err ) {

					 console.log(err);
					 return;
				 } else {
					 // console.log("login successful!!");
						console.log(result.rows);


							 profile_data2=result.rows;

							 res.render('profile',{
								 mother_name:mother_name,
								 data1:profile_data,
								 data2:profile_data2,
								 link:link
							 });

				 }

			 });


			}

		});
		}
	);
	mother_name=req.body.name;
	mother_id=req.body.id;

});

app.post("/update", function (req, res) {
	console.log("will update to this->>"+req.body.dob);

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
			binds=[{
				t1:req.body.name,
				t2:req.body.dob,
				t3:req.body.email,
				t4:req.body.nationality,
				t5:req.body.blood,
				t6:req.body.religion,
				t7:'FeMale',
				t8:req.body.city,
				t9:req.body.zip,
				t10:req.body.street,
				t11:req.body.appartment,
				t12:req.body.id
			}];

			var sqlQuery = "update PERSON set NAME = :t1,DATE_OF_BIRTH=to_date(:t2,'dd/mm/yyyy'),EMAIL_ADDRESS= :t3,NATIONALITY= :t4,BLOOD_GROUP= :t5,RELIGION= :t6,GENDER=:t7,CITY= :t8,ZIP_CODE= :t9,STREET_NAME= :t10,APARTMENT_NO= :t11 where PERSON_ID= :t12";

			connection.execute(sqlQuery,[binds[0].t1,binds[0].t2,binds[0].t3,binds[0].t4,binds[0].t5,binds[0].t6,binds[0].t7,binds[0].t8,binds[0].t9,binds[0].t10,binds[0].t11,binds[0].t12], {
				autoCommit: true
			} ,function (err, result) {
			if (err  ) {
				// console.log("login failed!!");
				 console.log(err);
				//btn=1;
			//	log=3;
 //console.log(result.rows);

 res.render('profile',{
	 mother_name:mother_name,
	 data1:profile_data,
	 data2:profile_data2,
	 link:link
 });
				return;
			} else {
				 console.log("update successful!!");
				 console.log(result.rowsAffected);
				 res.render('update',{
					 user:"",
					 btn:btn,
					 link:link
				 });



			}

		});
		}
	);

});

app.post("/update-health", function (req, res) {
	console.log("will update to this->>"+req.body.dob);

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
			binds=[{
				t1:req.body.id2,
				t2:req.body.gravidity,
				t3:req.body.parity,
				t4:req.body.lmp,
				t5:req.body.place
			}];

			var sqlQuery = "update mothers_pregnancy_info set gravidity=:t2,parity=:t3,LMP_DATE=to_date(:t4,'dd/mm/yyyy'),PREVIOUS_DELIVARY_PLACE=:t5 where PERSON_ID= :t1";

			connection.execute(sqlQuery,[binds[0].t2,binds[0].t3,binds[0].t4,binds[0].t5,binds[0].t1], {
				autoCommit: true
			} ,function (err, result) {
			if (err  ) {
				// console.log("login failed!!");
				 console.log(err);
				//btn=1;
			//	log=3;
 //console.log(result.rows);

 res.render('profile',{
	 mother_name:mother_name,
 	data1:profile_data,
 	data2:profile_data2,
 	link:link
 });
				return;
			} else {
				 console.log("update successful!!");
				 console.log(result.rowsAffected);
				 res.render('update',{
					 user:"",
					 btn:btn,
					 link:link
				 });



			}

		});
		}
	);

});

app.get("/profile", function (req, res) {

	res.render('profile',{
			mother_name:mother_name,
			data:profile_data,
		link:link
	});
});
var col_title=[];
app.get("/report", function (req, res) {

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
			binds=[{
				t1:mother_id
			}];

			var sqlQuery = "select date_of_visit ,RBC_COUNT,BLOOD_SUGAR_LEVEL,HDL_CHOLESTEROL,LDL_CHOLESTEROL,BLOOD_UREA,HEMOGLOBIN,BLOOD_PRESSURE from blood_test join during_pregnancy_report using(patient_id,date_of_visit) where person_id=:pid";
			var colQuery;

			connection.execute(sqlQuery,[binds[0].t1], function (err, result) {
			if (err) {
				 console.log(err);
				 res.send("<center><h1>"+err+"</h1></center>");
				// console.log(btn);
				//btn=1;
			//	log=3;
 //console.log(result.rows);
	} else {

	report_data=result.rows;
	console.log(report_data);
	colQuery = "SELECT column_name FROM all_tab_cols WHERE table_name = 'BLOOD_TEST' and column_name!='PLATELET_COUNT' order by COLUMN_ID";
	connection.execute(colQuery, function (err, result) {
	if (err) {
		console.log(err);
		res.send("<center><h1>"+err+"</h1></center>");
	} else {

	for( i=2;i<result.rows.length;i++)
	{
			col_title.push(result.rows[i][0]);
	}
	console.log(col_title);

	console.log("Here is report!!!");
	console.log(report_data.length);

		res.render('report',{
			mother_name:mother_name,
			col_title:col_title,
			report_data:report_data,
			link:link
		});

	}

	});


	}

	});
	}
	);

});

app.get("/medicine", function (req, res) {


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
			binds=[
				{
					t1:mother_id
				}
			]

			var sqlQuery = "select PRESCRIBED_MEDICINE,DAILY_DOSE,ILLNESS_CURING from medicine where person_id=:t1";

			connection.execute(sqlQuery,[binds[0].t1], {
				autoCommit: true
			} ,function (err, result) {
			if (err  ) {
				// console.log("login failed!!");
				 console.log(err);

				return;
			} else {
				console.log(result.rows);
				 res.render('medicine',{
					 mother_name:mother_name,
					 data:result.rows,
					 link:link
				 });
			}

		});
		}
	);

});
var cure_data=[];
app.post("/find-cure", function (req, res) {
	console.log("this will be searched "+req.body.search);
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
			binds=[
				{
					t1:req.body.search
				}
			]
			var str =req.body.search;
			var str_search = str.toLowerCase();
			var sqlQuery = `select * from disease where lower(DISEASE_NAME) like '%${str_search}%' or lower(DISEASE_TYPE) like '%${str_search}%'`;

			connection.execute(sqlQuery,function (err, result) {
			if (err  ) {
				// console.log("login failed!!");
				 console.log(err);

				return;
			} else {
			//	console.log(result.rows);
				cure_data=result.rows;
				res.render('cure',{
					mother_name:mother_name,
					data:cure_data,
					link:link
				});
			}

		});
		}
	);

});

app.get("/cure", function (req, res) {

	res.render('cure',{
		mother_name:mother_name,
			data:cure_data,
		link:link
	});
});

var emergency_data=[];

app.get("/emergency", function (req, res) {

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
			binds=[
				{
					t1:mother_id
				}
			]

			var sqlQuery = "select person_id,to_char(date_of_visit,'dd/mm/yyyy'),patient_id,status from during_pregnancy_report  where person_id=:pid";

			connection.execute(sqlQuery,[binds[0].t1],function (err, result) {
			if (err  ) {
				// console.log("login failed!!");
				 console.log(err);

				return;
			} else {
				console.log(result.rows);
				emergency_data=result.rows;
				res.render('emergency',{
					mother_name:mother_name,
					data:emergency_data,
					link:link
				});
			}

		});
		}
	);

});

app.post("/askHelp", function (req, res) {
	console.log(req.body.help);
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
			binds=[{
				t1:mother_id
			}]

			var sqlQuery = "insert into during_pregnancy_report (person_id,date_of_visit,patient_id,status) values(:pid,trunc(sysdate),concat('PP00',to_char(patient_id_seq.nextval)),'unsafe')";

			connection.execute(sqlQuery,[binds[0].t1],function (err, result) {
			if (err  ) {
				// console.log("login failed!!");
				 console.log(err);

				return;
			} else {
			//	console.log(result.rows);
			var sqlQuery = "select person_id,to_char(date_of_visit,'dd/mm/yyyy'),patient_id,status from during_pregnancy_report  where person_id=:pid";

			connection.execute(sqlQuery,[binds[0].t1],function (err, result) {
			if (err  ) {
				// console.log("login failed!!");
				 console.log(err);

				return;
			} else {
				console.log(result.rows);
					emergency_data=result.rows;
				res.render('emergency',{
					mother_name:mother_name,
					data:emergency_data,
					link:link
				});
			}

		});

			}

		});
		}
	);

});
var data1;
var data2;
app.get("/contact", function (req, res) {

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
			binds=[
				{
					t1:mother_id
				}
			]

			var sqlQuery = "select * from users";

			connection.execute(sqlQuery,function (err, result) {
			if (err  ) {
				// console.log("login failed!!");
				 console.log(err);

				return;
			} else {
				data1=result.rows;
				var sqlQuery = "select * from send_message where person_id=:pid";

				connection.execute(sqlQuery,[binds[0].t1],function (err, result) {
				if (err  ) {
					// console.log("login failed!!");
					 console.log(err);

					return;
				} else {
						data2=result.rows;
					console.log(result.rows);

						res.render('contact',{
							mother_name:mother_name,
							data1:data1,
							data2:data2,
							link:link
						});
				}

				});


			}

		});
		}
	);

});

app.post("/contacted", function (req, res) {

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
			binds=[
				{
					t1:mother_id,
					t2:req.body.msg,
					t3:req.body.email
				}
			]

			var sqlQuery = "insert into send_message values(concat('sent_',to_char(send_message_seq.nextval)),:msg,:pid,:em)";

			connection.execute(sqlQuery,[binds[0].t2,binds[0].t1,binds[0].t3],function (err, result) {
			if (err  ) {
				// console.log("login failed!!");
				 console.log(err);

				return;
			} else {
				console.log("message sent!!");

				binds=[
					{
						t1:mother_id
					}
				]

				var sqlQuery = "select * from users";

				connection.execute(sqlQuery,function (err, result) {
				if (err  ) {
					// console.log("login failed!!");
					 console.log(err);

					return;
				} else {
					data1=result.rows;
					var sqlQuery = "select * from send_message where person_id=:pid";

					connection.execute(sqlQuery,[binds[0].t1],function (err, result) {
					if (err  ) {
						// console.log("login failed!!");
						 console.log(err);

						return;
					} else {
							data2=result.rows;
						console.log(result.rows);

							res.render('contact',{
								mother_name:mother_name,
								data1:data1,
								data2:data2,
								link:link
							});
					}

					});
				}

			});
			}

		});
		}
	);

});


app.get("/notifications", function (req, res) {

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
			binds=[
				{
					t1:mother_id
				}
			]

			var sqlQuery = "select * from doctor_notification where person_id=:pid";

			connection.execute(sqlQuery,[binds[0].t1],function (err, result) {
			if (err  ) {
				// console.log("login failed!!");
				 console.log(err);

				return;
			} else {
				console.log(result.rows);

	res.render('notifications',{
	mother_name:mother_name,
	data:result.rows,
	link:link
		});
			}

		});
		}
	);

});

app.get("/help", function (req, res) {

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
			binds=[
				{
					t1:mother_id
				}
			]

			var sqlQuery = "select * from financial_aid where person_id=:pid";

			connection.execute(sqlQuery,[binds[0].t1],function (err, result) {
			if (err  ) {
				// console.log("login failed!!");
				 console.log(err);

				return;
			} else {
				console.log(result.rows);

				res.render('help',{
					mother_name:mother_name,
					data:result.rows,
					link:link
				});
			}

		});
		}
	);


});





	var help_data=[];
app.post("/help-received", function (req, res) {

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
			binds=[{
				t1:req.body.req_amount,
				t2:0,
				t3:req.body.cause,
				t4:mother_id,
				t5:"Pending"
			}]


			var sqlQuery = "insert into financial_aid values(concat('f_',to_char(financial_aid_seq.nextval)),:req,:req_amount,:rec_amount,:cause,:pid)";



			connection.execute(sqlQuery,[binds[0].t5,binds[0].t1,binds[0].t2,binds[0].t3,binds[0].t4],function (err, result) {
			if (err  ) {
				// console.log("login failed!!");
				 console.log(err);
				 	console.log("financial aid failed!!");

				return;
			} else {
					console.log(result.rowsAffected);
				binds=[
					{
						t1:mother_id
					}
				]

			var sqlQuery = "select * from financial_aid where person_id=:pid";

				connection.execute(sqlQuery,[binds[0].t1],function (err, result) {
				if (err  ) {

					 console.log(err);

					return;
				} else {
					help_data=result.rows;
					console.log(help_data);

					res.render('help',{
						mother_name:mother_name,
						data:help_data,
						link:link
					});
				}

				});

			}

		});
		}
	);


});



//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Mothers Profile Ended  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% vlunteer profile %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

app.get("/contact-patient", function (req, res) {
	// console.log(req.params.table);

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

			binds=[{
				t1:email_g
			}]

			var colQuery = "select * from send_message where doctor_email=:em";
			var data1;
			var data2;
			var attribute2 = [];
			// console.log("oracle entered");

			connection.execute(colQuery,[binds[0].t1], function (err, result) {
				if (err) {
					console.log(err);
					return;
				} else {
					 console.log("no error in q now!! " + email_g);
					 data1=result.rows;
					 binds=[{
					 	t1:email_g
					 }]

					 var colQuery = "select * from doctor_notification where doctor_email=:em";

					 var attribute2 = [];
					 // console.log("oracle entered");

					 connection.execute(colQuery,[binds[0].t1], function (err, result) {
					 	if (err) {
					 		console.log(err);
					 		return;
					 	} else {
					 		 console.log("no error in q now!! " + email_g);
							 data2=result.rows;
							 console.log("Now watch begins1...");
							 console.log(data1);
							 console.log("Now watch begins 2...")
							 console.log(data2);
							 res.render('contact_patient', {
								user:user,
								 data1: data1,
								 data2: data2,
								 btn: btn,
								 flag: true,
								 link: link
							 });
					 	}


					 	// console.log(result.rows[2][1]);


					 });

				}


				// console.log(result.rows[2][1]);


		});
	});

});

app.post("/notification-sent", function (req, res) {
	//gets everything if above get function are not used

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


				binds=[{
				 t1:email_g,
				 t2:req.body.msg,
				 t3:req.body.id
				}]

				var colQuery = "insert into doctor_notification values(concat('n_',doctor_notification_seq.nextval),:msg,:pid,:em)";

				var data1;
				var data2;
				var attribute2 = [];
				// console.log("oracle entered");
				connection.execute(colQuery,[binds[0].t2,binds[0].t3,binds[0].t1], function (err, result) {
					if (err) {
						console.log(err);
						return;
					} else {
						 console.log("no error in q now!! " + email_g);

						 binds=[{
						 	t1:email_g
						 }]

						 var colQuery = "select * from doctor_notification where doctor_email=:em";

						 var attribute2 = [];
						 // console.log("oracle entered");

						 connection.execute(colQuery,[binds[0].t1], function (err, result) {
						 	if (err) {
						 		console.log(err);
						 		return;
						 	} else {
									data2=result.rows;
										binds=[{
													t1:email_g
												}]


								var colQuery = "select * from send_message where doctor_email=:em";
								var attribute2 = [];
								// console.log("oracle entered");
								connection.execute(colQuery,[binds[0].t1], function (err, result) {

								 if (err) {
									 console.log(err);
									 return;
								 } else {
										console.log("no error in q now!! " + email_g);
										data1=result.rows;
										console.log("Now watch begins1...");
										console.log(data1);
										console.log("Now watch begins 2...")
										console.log(data2);
										console.log(result.rowsAffected);

										res.render('contact_patient', {
										 user:user,
											data1: data1,
											data2: data2,
											btn: btn,
											flag: true,
											link: link
										});
								 }


								 // console.log(result.rows[2][1]);


								});

						 	}

						 });

					}

			});
		});
});

app.get("/fund-requests", function (req, res) {
	//gets everything if above get function are not used
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


			var colQuery = "select * from financial_aid where request='Pending'";

			var attribute2 = [];
			// console.log("oracle entered");

			connection.execute(colQuery, function (err, result) {
				if (err) {
					console.log(err);
					return;
				} else {
					// console.log("no error in query1");
				}

				// console.log(result.rows);
				// console.log(result.rows[2][1]);

			res.render('fund_req', {
					user:user,
				table: req.params.table,
				data: result.rows,
				btn: btn,
				flag: true,
				link: link
			});
		});
	});
});


app.post("/fund-requested", function (req, res) {
	//gets everything if above get function are not used
	console.log("value received!!");
	console.log(req.body.email);
	console.log(req.body.access);
	console.log(req.body.gamount);
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
			binds=[{
				t1:req.body.email,
				t2:req.body.access,
				t3:req.body.gamount
			}]

			var colQuery = "update financial_aid set request = :req,granted_amount= :ga where record_no=:pid";

			var attribute2 = [];
			// console.log("oracle entered");

			connection.execute(colQuery,[binds[0].t2,binds[0].t3,binds[0].t1], function (err, result) {
				if (err) {
					console.log(err);
					res.send("<h1><center>"+"Not Enough Fund!!"+"</center></h1>");
					return;
				} else {
					// console.log("no error in query1");


								var colQuery = "select * from financial_aid where request='Pending' or request='denied'";

								var attribute2 = [];
								// console.log("oracle entered");

								connection.execute(colQuery, function (err, result) {
									if (err) {
										console.log(err);
										return;
									} else {
										// console.log("no error in query1");
										res.render('fund_req', {
												user:user,
											table: req.params.table,
											data: result.rows,
											btn: btn,
											flag: true,
											link: link
										});

									}

									// console.log(result.rows);
									// console.log(result.rows[2][1]);
							});

				}

				// console.log(result.rows);
				// console.log(result.rows[2][1]);


		});
	});
});

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% vlunteer profile Ended%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ donation @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

app.get("/assist", function (req, res) {
	//gets everything if above get function are not used
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


			var colQuery = "SELECT * from emergency_help where Status='unsafe'";
			var data11=[];
			var data12=[];
			var attribute2 = [];
			// console.log("oracle entered");

			connection.execute(colQuery, function (err, result) {
				if (err) {
					console.log(err);
					return;
				} else {
					data11=result.rows;
					var colQuery = "select person_id,to_char(date_of_visit),patient_id,status from during_pregnancy_report where Status='unsafe'";

					var attribute2 = [];
					// console.log("oracle entered");

					connection.execute(colQuery, function (err, result) {
						if (err) {
							console.log(err);
							return;
						} else {
							data12=result.rows;
							// console.log("no error in query1");
						}

						// console.log(result.rows);
						// console.log(result.rows[2][1]);

					res.render('emergency_respond', {
							user:user,
						table: req.params.table,
						data2: data12,
						btn: btn,
						flag: true,
						link: link
					});
				});
					// console.log("no error in query1");
				}


		});
	});
});

var assisted_person_id;
app.post("/assisted", function (req, res) {
	//gets everything if above get function are not used
	console.log(req.body.pid);
	assisted_person_id=req.body.pid;
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
	binds=[{
		t1:req.body.email
	}]

			var colQuery = "update during_pregnancy_report set Status='safe' where patient_id=:id";

			var attribute2 = [];
			// console.log("oracle entered");

			connection.execute(colQuery,[binds[0].t1], function (err, result) {
				if (err) {
					console.log(err);
					return;
				} else {
					var colQuery = "select person_id,to_char(date_of_visit),patient_id,status from during_pregnancy_report where Status='unsafe'";

					var attribute2 = [];
					// console.log("oracle entered");

					connection.execute(colQuery, function (err, result) {
						if (err) {
							console.log(err);
							return;
						} else {
							// console.log("no error in query1");
						}

						// console.log(result.rows);
						// console.log(result.rows[2][1]);

					res.render('emergency_respond', {
							user:user,
						table: req.params.table,
						data2: result.rows,
						btn: btn,
						flag: true,
						link: link
					});
				});
				}

		});
	});
});

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ donation end @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//++++++++++++++++++++++++++++++++++++++++++++++++++END++++++++++++++++++++++++++++++++++++++++++++++++++++++++=
app.get("/*", function (req, res) {
	//gets everything if above get function are not used
	res.send("<h1><center>"+"Error 404 : PAGE NOT FOUND!!"+"</center></h1>");
});

//+++++++++++++++++++++++++++++++++++++++++++++++++START+++++++++++++++++++++++++++++++++++++++++++++++++++++=
//server is running with command node server.js
app.listen(port, host, function (err) {

	if (err){
		console.log("error happend");
	}
	console.log("server has started on link : " + link);
});

//end

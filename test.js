app.post("/post/:table", function (req, res) {
	console.log(req.params.table);

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

			var sqlQuery = 'INSERT INTO ' + req.params.table + ' VALUES (';

			for (var property in object) {
				if (object.hasOwnProperty(property)) {
					sqlQuery += property + ',';
				}
			}

			sqlQuery[sqlQuery.length] = ')';
			sqlQuery +=';'

			console.log("oracle entered bind=" + binds[0]);
			console.log("sql = " + sqlQuery);
			
			connection.execute(sqlQuery,  {
				autoCommit: true
			}, function (err, result) {
				if (err) {
					console.log(err);
					return;
				} else {
					console.log('Rows inserted: ' + result.rowsAffected);
					return;
				}
			});
		}
	);

	res.render('get', {
		btn: btn,
		flag: false,
		link: link
	});
});
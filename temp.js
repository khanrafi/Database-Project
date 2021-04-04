var oracledb = require('oracledb');

var username = "database";
var pass = "112358";
var binds;





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

		var sqlQuery = 'INSERT INTO person VALUES (:t1,:t2,:t23,:t24,:t25,:t2,:t27,:t28,:t29,:t210,:t211,:t212,:t213)';
		binds = [{
			t1: req.body.name,
			t2: req.body.ID,
			t3: req.body.Nationality,
			t4: req.body.Religion,
			t5: req.body.Gender,
			t6: req.body.Email_address,
			t7: req.body.mobile,
			t8: req.body.Birth_Date,
			t9: req.body.city,
			t10: req.body.Street,
			t11: req.body.Zip_code,
			t12: req.body.Height,
			t13: req.body.Weight
		}];

		console.log("oracle entered");

		connection.execute(sqlQuery, binds[0], {
			autoCommit: true
		}, function (err, result) {
			if (err) {
				console.log(err);
				return;
			} else
				console.log('Rows inserted: ' + result.rowsAffected);
		});
	}
);
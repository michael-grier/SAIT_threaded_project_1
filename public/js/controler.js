// Author: Robert Geipel
// Date: 6/9/2020


const dp = require("../View/DynPage.js");

exports.updateDataSql = function update(req, conn)
{
// insert only if no such record		
	var sql_sel = {
		"sql": "SELECT * from agents where AgtLastName = ?",
		"values": req.body.lname
	};
		conn.query(sql_sel, (err, result, fields)=>{
		if (err = "NULL") {
			console.log("Selection executed");
		}
		if (result.length > 0) {
// data set not empty -> update agent
			var sql_upd = { 
				"sql": "UPDATE agents SET AgtFirstName = ?, AgtLastName = ?, AgtEmail = ?, AgtBusPhone = ?" + 
							"WHERE AgentId = ?",
				"values": [req.body.fname, req.body.lname, req.body.email, req.body.phone, result[0].AgentId]
			};
			conn.query(sql_upd, (err, result, fields)=>{
				if (err = "NULL") console.log("Update executed");
			});
		}
		else
// data set empty -> insert new agent
		{
			var sql_ins = { 
				"sql": "INSERT INTO agents (AgtFirstName, AgtLastName, AgtEmail, AgtBusPhone)" + 
							"VALUES (?, ?, ?, ?)",
				"values": [req.body.fname, req.body.lname, req.body.email, req.body.phone]
			};
			conn.query(sql_ins, (err, result, fields)=>{ 
				if (err = "NULL") console.log("Insert executed");
			});
		};
	});					    	
}


exports.updateDataMongo = function update(req, conn)
{
// insert only if no such record		
    var dbo = conn.db("travelexperts");
	var query = { AgtLastName: `${ req.body.lname }`};
	dbo.collection("agents").find(query).toArray(function(err, result) {
		if (err = "NULL") {
			console.log("Select executed");
			console.log(result.length);
		}
 	if (result.length > 0) {
// data set not empty -> update agent
            console.log(result[0]._id);
			var myquery = { _id: result[0]._id };
			var myobj = { $set: { AgtFirstName: req.body.fname, AgtLastName: req.body.lname, AgtEmail: req.body.email } };
			dbo.collection("agents").updateOne(myquery, myobj, function(err, res) {
				if (err = "NULL") console.log("Update executed");    
			});		
		}
		else
// data set empty -> insert new agent
		{
			var myobj = { AgtLastName: `${ req.body.lname }`, AgtFirstName: `${ req.body.fname }` };
			dbo.collection("agents").insertOne(myobj, function(err, res) {
				if (err = "NULL") console.log("Insert executed");    
			});
		};
   });
}



exports.selData = (lname, conn, lv_view, res)=>{

// run query to get updated record confirmed
	var sql = {
		"sql": "SELECT * from agents where AgtLastName = ?",
		"values": lname
	};	

// update view
	conn.query(sql, (err, result, fields)=>{
		if (err) throw err;
		dp.genConfirm(result, lv_view, res);
	});
	
}

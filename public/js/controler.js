const dp = require("../View/DynPage.js");

exports.updateDataSql = function update(result, conn, req)
{
// insert only if no such record		
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
}


exports.updateDataMongo = function update(result, dbo, req)
{
// insert only if no such record		
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

}


exports.selDataSql = (parameters, callbackFunc)=>{

// run query to get record 
	var sql = {
		"sql": "SELECT * from agents where AgtLastName = ?",
		"values": parameters[0]
	};	

// update view or database depending on callback function
	parameters[1].query(sql, (err, result, fields)=>{
		if (err) throw err;
		if (callbackFunc == dp.genConfirm)
		{
			parameters[0] = result;
			parameters[1] = parameters[2];
			parameters[2] = parameters[3];
			callbackFunc.apply(null, parameters);
		}
		else 
		{
			parameters[0] = result;
			console.log(result);
			callbackFunc.apply(null, parameters);
		};
	});
		
}

exports.selDataMongo = (parameters, callbackFunc)=>{

// run query to get record
	var dbo = parameters[1].db("travelexperts");
	var query = { AgtLastName: `${ parameters[0] }`};

// update view or database depending on callback function
	dbo.collection("agents").find(query).toArray(function(err, result) {
		if (err) throw err;

		if (callbackFunc == dp.genConfirm)
		{
			parameters[0] = result;
			parameters[1] = parameters[2];
			parameters[2] = parameters[3];
			callbackFunc.apply(null, parameters);
		}
		else 
		{
			parameters[0] = result;
			parameters[1] = dbo
			console.log("selected data: " + result);
			callbackFunc.apply(null, parameters);
		};
	});
		
}


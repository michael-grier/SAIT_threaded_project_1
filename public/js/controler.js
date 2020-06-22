// Author: Daechul Lee (picture related coding)/Robert Geipel (remaining code)
// Date: 6/18/2020
// OOSD APR16
// Description: controller package

const dp = require("../../views/thanks.js");

exports.updateDataSql = function update(result, conn, req) {
  // insert only if no such record		
  if (result.length > 0) {
    // data set not empty -> update agent
    var sql_upd = {
      "sql": "UPDATE agents SET AgtFirstName = ?, AgtLastName = ?, AgtEmail = ?, AgtBusPhone = ?" +
        "WHERE AgentId = ?",
      "values": [req.body.fname, req.body.lname, req.body.email, req.body.phone, result[0].AgentId]
    };
    conn.query(sql_upd, (err, result, fields) => {
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
    conn.query(sql_ins, (err, result, fields) => {
      if (err = "NULL") console.log("Insert executed");
    });
  };
}


exports.updateDataMongo = function update(result, dbo, req) {
  // insert only if no such record		
  if (result.length > 0) {
    // data set not empty -> update agent
    console.log(result[0]._id);
    var myquery = { _id: result[0]._id };
    var myobj = { $set: { AgtFirstName: req.body.fname, AgtLastName: req.body.lname, AgtEmail: req.body.Email } };
    dbo.collection("agents").updateOne(myquery, myobj, function (err, res) {
      if (err = "NULL") console.log("Update executed");
      //			if (err) throw err;
    });
  }
  else
  // data set empty -> insert new agent
  {
    // get current sequence number
    dbo.collection("Counter").findOne({}, function (err, result_add) {
      if (err) throw err;
      if (err = "NULL") console.log("Sequence Number selected: " + result_add.sequence_value);
      var myobj = { _id: `${result_add.sequence_value}`, AgentId: `${result_add.sequence_value}`, AgtLastName: `${req.body.lname}`, AgtFirstName: `${req.body.fname}`, AgtEmail: `${req.body.Email}` };
      // actual insert
      dbo.collection("agents").insertOne(myobj, function (err, res) {
        if (err) throw err;
        if (err = "NULL") console.log("Insert executed");
        // increment sequence number
        result_add.sequence_value = result_add.sequence_value + 1;
        var myquery = { _id: result_add._id };
        var myobj = { $set: { sequence_value: result_add.sequence_value } };
        // update water level marker
        dbo.collection("Counter").updateOne(myquery, myobj, function (err, res) {
          if (err) throw err;
          if (err = "NULL") console.log("Counter incremented");
        });
      });
    });
  };

}


exports.selDataSql = (parameters, callbackFunc) => {

  // run query to get record 
  var sql = {
    "sql": "SELECT * from agents where AgtLastName = ?",
    "values": parameters[0]
  };

  // update view or database depending on callback function
  parameters[1].query(sql, (err, result, fields) => {
    if (err) throw err;
    if (callbackFunc == dp.genConfirm) {
      parameters[0] = result;
      parameters[1] = parameters[2];
      parameters[2] = parameters[3];
      callbackFunc.apply(null, parameters);
    }
    else {
      parameters[0] = result;
      console.log(result);
      callbackFunc.apply(null, parameters);
    };
  });

}

exports.selDataMongo = (parameters, callbackFunc)=>{

// run query to get record by email address
	var dbo = parameters[1].db("travelexperts");
	var query = { AgtEmail: `${ parameters[0] }`};


// update view or database depending on callback function
	dbo.collection("agents").find(query).toArray(function(err, result) {
		if (err) throw err;
// paramter mapping wouldn't necessary if we followed a convention when controller and view are called (not implemented)
		if (callbackFunc == dp.genThanks)
		{
			parameters[0] = result;
			parameters[1] = parameters[2];
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

// insert pic data to mongodb

exports.insertPic = (para, callbackFunc) => {

  // run query to get record
  var dbo = para[1].db("travelexperts");
  var query = { AgtEmail: `${para[0]}` };

  // update view or database depending on callback function
  dbo.collection("agents").find(query).toArray(function (err, result) {
    if (err) throw err;

    // console.log(result)
    const agentID = result.pop().AgentId;
    const headShotPic = para[2];
    const headShotPicDate = para[3];
    const userIDPic = para[4];
    const userIDPicPath = para[5];

    let agentInfo = {
      _id: `${agentID}`,
      AgentId: `${agentID}`, 
      headShotPic: `${headShotPic}`,
      headShotPicDate: `${headShotPicDate}`,
      userIDPic: `${userIDPic}`,
      userIDPicPath: `${userIDPicPath}`,
    };
    dbo.collection("userPics").insertOne({agentInfo},function(err, res) {
      if (err) throw err;

      console.log("the data has been inserted");
    })

  });

}
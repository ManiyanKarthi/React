var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var dbo;

var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, database) {
  if(err) throw err;
  dbo = database.db("BCPM");
});


var database = function() {
	return dbo;
};


var getDatafromDb = function(req,res,tableName,myQuery) {
      dbo.collection(tableName).find(myQuery).toArray(function(err, result) {
                if (err) throw err;
                  res.send(JSON.stringify(result));
        });
};

var insertDatatoDb = function(req,res,tableName,myQuery) {
      dbo.collection(tableName).insertOne(myQuery, function(err, result) {
              if (err) throw err;
              console.log("1 document inserted");
              res.send(JSON.stringify({"result":"ok"}));
          });
};


var updateDatainDb = function(req,res,tableName,myQuery,newvalues) {
      dbo.collection(tableName).updateOne(myQuery, newvalues, function(err, result) {
                    if (err) throw err;
                    console.log("1 document updated");
                      res.send(JSON.stringify({"result":"ok"}));

                });

};

var updateManyDatainDb = function(req,res,tableName,myQuery,newvalues) {
      dbo.collection(tableName).updateMany(myQuery, newvalues, function(err, result) {
                    if (err) throw err;
                    console.log("1 document updated");
                      res.send(JSON.stringify({"result":"ok"}));

                });

};


var deleteDatainDb = function(req,res,tableName,myQuery) {
      dbo.collection(tableName).deleteOne(myQuery, function(err, result) {
            if (err) throw err;
            console.log("1 document deleted");
        });
    

};


var updatestatusQuery = function(tableName,findquery,newValue) {
            dbo.collection(tableName).find(findquery).toArray(function(err, parsedata) {
                if (err) throw err;
                  var myQuery;
                    console.log(parsedata.length);
                     for(var i=0;i<parsedata.length;i++) {
                       myQuery = { _id:ObjectId(parsedata[i]._id)};
                        dbo.collection(tableName).updateOne(myQuery,newValue, function(err, result) {
                          if (err) throw err;
                          console.log("1 document updated");
                      });
                    }
        });
}


module.exports = {database,getDatafromDb,insertDatatoDb,updateDatainDb,updateManyDatainDb,deleteDatainDb,updatestatusQuery};
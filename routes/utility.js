var express = require('express')
var router = express.Router();
var mongodb = require('../db/mongodb');
var bodyParser = require('body-parser')
var ObjectId = require('mongodb').ObjectID;

var jsonParser = bodyParser.json()
var myquery;

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

// define the home page route
router.get('/getemployeedetails', (req, res,next) => {
  var myQuery={};
  if(req.query.role!=null){
    myQuery = {role:req.query.role};
  }
  mongodb.getDatafromDb(req,res,"EMPLOYEE",myQuery);
})


// define the home page route
router.get('/getlocationdetails', (req, res,next) => {
  mongodb.getDatafromDb(req,res,"LOCATION",{});
})

router.get('/getprojectdetails', (req, res,next) => {
  mongodb.getDatafromDb(req,res,"PROJECT",{});
})


// define the home page route
router.post('/addemployee',jsonParser, (req,res,next) => {
  myquery = req.body
  mongodb.insertDatatoDb(req,res,"EMPLOYEE",myquery);
})

// define the home page route
router.post('/addproject',jsonParser, (req, res,next) => {
   myquery = req.body
  mongodb.insertDatatoDb(req,res,"PROJECT",myquery);
})

// define the home page route
router.post('/addlocation',jsonParser, (req, res,next) => {
   myquery = req.body
  mongodb.insertDatatoDb(req,res,"LOCATION",myquery);
})


router.post('/updateemployee',jsonParser, (req, res,next) => {
  console.log(req.body);
   var parsedata = req.body; 
       myquery = { _id: ObjectId(parsedata._id)};
      var newvalues = { $set: parsedata };
      delete parsedata._id;
      
      mongodb.updateDatainDb(req,res,"EMPLOYEE",myquery,newvalues);

})


router.post('/updatelocation',jsonParser, (req, res,next) => {
  console.log(req.body);
   var parsedata = req.body; 
       myquery = { _id: ObjectId(parsedata._id)};
      var newvalues = { $set: parsedata };
      delete parsedata._id;
      
      mongodb.updateDatainDb(req,res,"LOCATION",myquery,newvalues);

})

router.post('/updateproject',jsonParser, (req, res,next) => {
  console.log(req.body);
   var parsedata = req.body; 
       myquery = { _id: ObjectId(parsedata._id)};
      var newvalues = { $set: parsedata };
      delete parsedata._id;
      
      mongodb.updateDatainDb(req,res,"PROJECT",myquery,newvalues);

})

router.post('/deleteemployee',jsonParser, (req, res,next) => {
  console.log(req.body);
   var parsedata = req.body; 
 for(var i=0;i<parsedata.length;i++) {
           myquery = { _id:ObjectId(parsedata[i]._id)};
            mongodb.deleteDatainDb(req,res,"EMPLOYEE",myquery);
        }
      res.send(JSON.stringify({"result":"ok"}));

})

router.post('/deleteproject',jsonParser, (req, res,next) => {
  console.log(req.body);
   var parsedata = req.body; 
 for(var i=0;i<parsedata.length;i++) {
           myquery = { _id:ObjectId(parsedata[i]._id)};
            mongodb.deleteDatainDb(req,res,"PROJECT",myquery);
        }
    res.send(JSON.stringify({"result":"ok"}));

})
 
 router.post('/deletelocation',jsonParser, (req, res,next) => {
  console.log(req.body);
   var parsedata = req.body; 
    for(var i=0;i<parsedata.length;i++) {
           myquery = { _id:ObjectId(parsedata[i]._id)};
            mongodb.deleteDatainDb(req,res,"LOCATION",myquery);
        }
                    res.send(JSON.stringify({"result":"ok"}));
})
 

module.exports=router;
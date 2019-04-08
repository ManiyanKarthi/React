var express = require('express')
var router = express.Router();
var mongodb = require('../db/mongodb');
var bodyParser = require('body-parser')
var myquery;
var jsonParser = bodyParser.json()
var ObjectId = require('mongodb').ObjectID;

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})


router.post('/addtestplan',jsonParser, (req, res,next) => {
  myquery = req.body;
   
  mongodb.insertDatatoDb(req,res,"COMMUNICATION_TEST_DETAILS",myquery);
})

router.post('/addtestplancomments',jsonParser, (req, res,next) => {
  myquery = req.body;
   
  mongodb.insertDatatoDb(req,res,"COMMUNICATION_TEST_DETAILS_COMMENTS",myquery);
})



router.get('/getCommunicationtestplanning', (req, res,next) => {
   res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
var myQuery={};
  if(req.query.projectDetails){
        myQuery = {location:req.query.location,project:req.query.project,status:req.query.status,projectDetails:req.query.projectDetails}
  } else {
        myQuery = {location:req.query.location,project:req.query.project,status:req.query.status}
  }
  mongodb.getDatafromDb(req,res,"COMMUNICATION_TEST_DETAILS",myQuery);
   
})


router.post('/updatetestplanstatus',jsonParser, (req, res,next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      var parsedata = req.body; 
      var newvalues = { $set: parsedata };
      var myQuery={};
      if(req.query.projectDetails){
            myQuery = {location:req.query.location,project:req.query.project,status:req.query.status,projectDetails:req.query.projectDetails}
      } else {
            myQuery = {location:req.query.location,project:req.query.project,status:req.query.status}
      }
      
      mongodb.updateManyDatainDb(req,res,"COMMUNICATION_TEST_DETAILS",myQuery,newvalues);

})

router.post('/updatetestplancomments',jsonParser, (req, res,next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      var parsedata = req.body; 
       myquery = { _id: ObjectId(req.query._id)};
      var newvalues = { $set: parsedata };
      
      mongodb.updateDatainDb(req,res,"COMMUNICATION_TEST_DETAILS_COMMENTS",myquery,newvalues);

})

router.get('/getTestplanComments', (req, res,next) => {
 res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  mongodb.getDatafromDb(req,res,"COMMUNICATION_TEST_DETAILS_COMMENTS",{location:req.query.location,project:req.query.project});
   
})

router.post('/removecommunicationDetails',jsonParser, (req, res,next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      var parsedata = req.body; 
       myquery = { _id: ObjectId(parsedata._id)};
     mongodb.deleteDatainDb(req,res,"COMMUNICATION_TEST_DETAILS",myquery);
         res.send(JSON.stringify({"result":"ok"}));

})

router.post('/updatecommunicationDetails',jsonParser, (req, res,next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      var parsedata = req.body; 
       myquery = { _id: ObjectId(parsedata._id)};
      var newvalues = { $set: parsedata };
      delete parsedata._id;
      
      mongodb.updateDatainDb(req,res,"COMMUNICATION_TEST_DETAILS",myquery,newvalues);

})





module.exports=router;
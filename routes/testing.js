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
  console.log(req.query.typeoftest.replace("%20",""));
   res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
var myQuery={};
  if(req.query.projectDetails){
       if(req.query.reportstatus){
            myQuery = {location:req.query.location,project:req.query.project,reportstatus:req.query.reportstatus,projectDetails:req.query.projectDetails,typeoftest:req.query.typeoftest}
          } else if(req.query.location){
            myQuery = {location:req.query.location,project:req.query.project,status:req.query.status,projectDetails:req.query.projectDetails,typeoftest:req.query.typeoftest}
          } else {
            myQuery = {status:req.query.status.replace("%20",""),projectDetails:req.query.projectDetails.replace("%20",""),typeoftest:req.query.typeoftest.replace("%20","")}
          }
  } else {
          if(req.query.reportstatus){
             myQuery = {location:req.query.location,project:req.query.project,reportstatus:req.query.reportstatus,typeoftest:req.query.typeoftest}
          } else if(req.query.location && req.query.project && req.query.status && req.query.typeoftest){
            myQuery = {location:req.query.location,project:req.query.project,typeoftest:req.query.typeoftest,status:req.query.status}
          } else {
            myQuery = {location:req.query.location,project:req.query.project,typeoftest:req.query.typeoftest}
          }
       
  }
  mongodb.getDatafromDb(req,res,"COMMUNICATION_TEST_DETAILS",myQuery);
   
})


router.post('/updatetestplanstatus',jsonParser, (req, res,next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      var parsedata = req.body;
      console.log(parsedata) 
      var newvalues = { $set: parsedata };
      var myQuery={};
      if(req.query.projectDetails){
          if(req.query.reportstatus){
            myQuery = {location:req.query.location,project:req.query.project,reportstatus:req.query.reportstatus,projectDetails:req.query.projectDetails}
          } else {
            myQuery = {location:req.query.location,project:req.query.project,status:req.query.status,projectDetails:req.query.projectDetails}
          }
            
      } else {
            myQuery = {location:req.query.location,project:req.query.project,status:req.query.status}
      }

      console.log(myQuery);
      
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
  mongodb.getDatafromDb(req,res,"COMMUNICATION_TEST_DETAILS_COMMENTS",{location:req.query.location,project:req.query.project,typeoftest:req.query.typeoftest,projectDetails:req.query.projectDetails});
   
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
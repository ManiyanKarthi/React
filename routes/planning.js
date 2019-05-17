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



router.get('/getSeatingInformationDraft', (req, res,next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  mongodb.getDatafromDb(req,res,"SEATINGINFORMATION",{location:req.query.location,project:req.query.project,STATUS:req.query.status});
})


router.get('/getRiskAssessmentDraft', (req, res,next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  mongodb.getDatafromDb(req,res,"RISKASSESSMENT",{location:req.query.location,project:req.query.project,STATUS:req.query.status});
})


router.get('/getRecoveryObjectivesDraft', (req, res,next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  mongodb.getDatafromDb(req,res,"RECOVERYOBJECTIVES",{location:req.query.location,project:req.query.project,STATUS:req.query.status});
})


router.get('/getCommunicationsTreeDraft', (req, res,next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  mongodb.getDatafromDb(req,res,"COMMUNICATIONTREE",{location:req.query.location,project:req.query.project,STATUS:req.query.status});
})


router.get('/getbusinessimpactDraft', (req, res,next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  mongodb.getDatafromDb(req,res,"BUSINESSIMPACT",{location:req.query.location,project:req.query.project,STATUS:req.query.status});
})


router.get('/getAwayTeamDraft', (req, res,next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  mongodb.getDatafromDb(req,res,"AWAYTEAM",{location:req.query.location,project:req.query.project,STATUS:req.query.status});
})



router.get('/getCommunicationPlanDraft', (req, res,next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  mongodb.getDatafromDb(req,res,"COMMUNICATIONPLAN",{location:req.query.location,project:req.query.project,STATUS:req.query.status});
})


router.get('/getSoftwareSpecificationsDraft', (req, res,next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  mongodb.getDatafromDb(req,res,"SOFTWARESPECIFICATIONS",{location:req.query.location,project:req.query.project,STATUS:req.query.status});
})


router.get('/getHardwareSpecificationsDraft', (req, res,next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  mongodb.getDatafromDb(req,res,"HARDWARESPECIFICATIONS",{location:req.query.location,project:req.query.project,STATUS:req.query.status});
})

router.get('/getTestPlanningDraft', (req, res,next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  mongodb.getDatafromDb(req,res,"TESTPLANNING",{location:req.query.location,project:req.query.project,STATUS:req.query.status});
})


router.get('/getSeatingInformation', (req, res,next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  mongodb.getDatafromDb(req,res,"SEATINGINFORMATION",{location:req.query.location,project:req.query.project});
})


router.get('/getRiskAssessment', (req, res,next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  mongodb.getDatafromDb(req,res,"RISKASSESSMENT",{location:req.query.location,project:req.query.project});
})


router.get('/getRecoveryObjectives', (req, res,next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  mongodb.getDatafromDb(req,res,"RECOVERYOBJECTIVES",{location:req.query.location,project:req.query.project});
})


router.get('/getCommunicationsTree', (req, res,next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  mongodb.getDatafromDb(req,res,"COMMUNICATIONTREE",{location:req.query.location,project:req.query.project});
})

router.get('/getbusinessimpact', (req, res,next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  mongodb.getDatafromDb(req,res,"BUSINESSIMPACT",{location:req.query.location,project:req.query.project});
})


router.get('/getAwayTeam', (req, res,next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  mongodb.getDatafromDb(req,res,"AWAYTEAM",{location:req.query.location,project:req.query.project});
})



router.get('/getCommunicationPlan', (req, res,next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  mongodb.getDatafromDb(req,res,"COMMUNICATIONPLAN",{location:req.query.location,project:req.query.project});
})


router.get('/getSoftwareSpecifications', (req, res,next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  mongodb.getDatafromDb(req,res,"SOFTWARESPECIFICATIONS",{location:req.query.location,project:req.query.project});
})


router.get('/getHardwareSpecifications', (req, res,next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  mongodb.getDatafromDb(req,res,"HARDWARESPECIFICATIONS",{location:req.query.location,project:req.query.project});
})

router.get('/getTestPlanning', (req, res,next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  mongodb.getDatafromDb(req,res,"TESTPLANNING",{location:req.query.location,project:req.query.project});
})

router.get('/fetchAllData', (req, res,next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  mongodb.getDatafromDb(req,res,req.query.type,{});
})



router.post('/addRiskAssessment',jsonParser, (req, res,next) => {
      myquery = req.body;
       myquery.STATUS = "Draft"
      myquery.location = req.query.location;
  myquery.project = req.query.project;
  mongodb.insertDatatoDb(req,res,"RISKASSESSMENT",myquery);
})


router.post('/addRecoveryObjectives',jsonParser, (req, res,next) => {
      myquery = req.body;
       myquery.STATUS = "Draft"
      myquery.location = req.query.location;
  myquery.project = req.query.project;
  mongodb.insertDatatoDb(req,res,"RECOVERYOBJECTIVES",myquery);
})


router.post('/addCommunicationsTree',jsonParser, (req, res,next) => {
  myquery = req.body;
   myquery.STATUS = "Draft"
  myquery.location = req.query.location;
  myquery.project = req.query.project;
  mongodb.insertDatatoDb(req,res,"COMMUNICATIONTREE",myquery);
})


router.post('/addbusinessimpact',jsonParser, (req, res,next) => {
  myquery = req.body;
   myquery.STATUS = "Draft"
  myquery.location = req.query.location;
  myquery.project = req.query.project;
  mongodb.insertDatatoDb(req,res,"BUSINESSIMPACT",myquery);
})


router.post('/addAwayTeam',jsonParser, (req, res,next) => {
  myquery = req.body;
   myquery.STATUS = "Draft"
  myquery.location = req.query.location;
  myquery.project = req.query.project;

  mongodb.insertDatatoDb(req,res,"AWAYTEAM",myquery);
})



router.post('/addCommunicationPlan',jsonParser, (req, res,next) => {
  myquery = req.body;
   myquery.STATUS = "Draft"
  myquery.location = req.query.location;
  myquery.project = req.query.project;
  mongodb.insertDatatoDb(req,res,"COMMUNICATIONPLAN",myquery);
})


router.post('/addSoftwareSpecifications',jsonParser, (req, res,next) => {
  myquery = req.body;
   myquery.STATUS = "Draft"
  myquery.location = req.query.location;
  myquery.project = req.query.project;
  mongodb.insertDatatoDb(req,res,"SOFTWARESPECIFICATIONS",myquery);
})


router.post('/addHardwareSpecifications',jsonParser, (req, res,next) => {
  myquery = req.body;
   myquery.STATUS = "Draft"
  myquery.location = req.query.location;
  myquery.project = req.query.project;
  mongodb.insertDatatoDb(req,res,"HARDWARESPECIFICATIONS",myquery);
})

router.post('/addTestPlanning',jsonParser, (req, res,next) => {
  myquery = req.body;
   myquery.STATUS = "Draft"
  myquery.location = req.query.location;
  myquery.project = req.query.project;
  mongodb.insertDatatoDb(req,res,"TESTPLANNING",myquery);
})


router.post('/addSeatingInformation',jsonParser, (req, res,next) => {
  myquery = req.body;
  myquery.STATUS = "Draft"
  myquery.location = req.query.location;
  myquery.project = req.query.project;
  console.log(myquery);
  mongodb.insertDatatoDb(req,res,"SEATINGINFORMATION",myquery);
})


router.post('/updateRiskAssessment',jsonParser, (req, res,next) => {
   var parsedata = req.body; 
      myquery = { _id: ObjectId(parsedata._id) };
      var newvalues = { $set: parsedata };
      delete parsedata._id;
  mongodb.updateDatainDb(req,res,"RISKASSESSMENT",myquery,newvalues);
})


router.post('/updateRecoveryObjectives',jsonParser, (req, res,next) => {
  var parsedata = req.body; 
      var myquery = { _id: ObjectId(parsedata._id) };
      var newvalues = { $set: parsedata };
      delete parsedata._id;
  mongodb.updateDatainDb(req,res,"RECOVERYOBJECTIVES",myquery,newvalues);
})

router.post('/updateSeatingInformation',jsonParser, (req, res,next) => {
  var parsedata = req.body; 
      var myquery = { _id: ObjectId(parsedata._id) };
      var newvalues = { $set: parsedata };
      delete parsedata._id;
      console.log(myquery);
      console.log(newvalues);

  mongodb.updateDatainDb(req,res,"SEATINGINFORMATION",myquery,newvalues);
})


router.post('/updateCommunicationsTree',jsonParser, (req, res,next) => {
  var parsedata = req.body; 
      var myquery = { _id: ObjectId(parsedata._id) };
      var newvalues = { $set: parsedata };
      delete parsedata._id;
  mongodb.updateDatainDb(req,res,"COMMUNICATIONTREE",myquery,newvalues);
})


router.post('/updatebusinessimpact',jsonParser, (req, res,next) => {
   var parsedata = req.body; 
      var myquery = { _id: ObjectId(parsedata._id) };
      var newvalues = { $set: parsedata };
      delete parsedata._id;
  mongodb.updateDatainDb(req,res,"BUSINESSIMPACT",myquery,newvalues);
})


router.post('/updateAwayTeam',jsonParser, (req, res,next) => {
   var parsedata = req.body; 
      var myquery = { _id: ObjectId(parsedata._id) };
      var newvalues = { $set: parsedata };
      delete parsedata._id;
  mongodb.updateDatainDb(req,res,"AWAYTEAM",myquery,newvalues);
})



router.post('/updateCommunicationPlan',jsonParser, (req, res,next) => {
    var parsedata = req.body; 
      var myquery = { _id: ObjectId(parsedata._id) };
      var newvalues = { $set: parsedata };
      delete parsedata._id;
  mongodb.updateDatainDb(req,res,"COMMUNICATIONPLAN",myquery,newvalues);
})


router.post('/updateSoftwareSpecifications',jsonParser, (req, res,next) => {
   var parsedata = req.body; 
      var myquery = { _id: ObjectId(parsedata._id) };
      var newvalues = { $set: parsedata };
      delete parsedata._id;
  mongodb.updateDatainDb(req,res,"SOFTWARESPECIFICATIONS",myquery,newvalues);
})


router.post('/updateHardwareSpecifications',jsonParser, (req, res,next) => {
   var parsedata = req.body; 
      var myquery = { _id: ObjectId(parsedata._id) };
      var newvalues = { $set: parsedata };
      delete parsedata._id;
  mongodb.updateDatainDb(req,res,"HARDWARESPECIFICATIONS",myquery,newvalues);
})

router.post('/updateTestPlanning',jsonParser, (req, res,next) => {
  var parsedata = req.body; 
       myquery = { _id: ObjectId(parsedata._id)};
      var newvalues = { $set: parsedata };
      delete parsedata._id;
  mongodb.updateDatainDb(req,res,"TESTPLANNING",myquery,newvalues);
})


router.post('/deleteSeatingInformation',jsonParser, (req, res,next) => {
  var parsedata = req.body; 
  for(var i=0;i<parsedata.length;i++) {
           myquery = { _id:ObjectId(parsedata[i]._id)};
            mongodb.deleteDatainDb(req,res,"SEATINGINFORMATION",myquery);
        }
       res.send(JSON.stringify({"result":"ok"}));

})


router.post('/deleteRiskAssessment',jsonParser, (req, res,next) => {
  var parsedata = req.body; 
    for(var i=0;i<parsedata.length;i++) {
           myquery = { _id:ObjectId(parsedata[i]._id)};
            mongodb.deleteDatainDb(req,res,"RISKASSESSMENT",myquery);
        }
        res.send(JSON.stringify({"result":"ok"}));
})


router.post('/deleteRecoveryObjectives',jsonParser, (req, res,next) => {
  var parsedata = req.body; 
   for(var i=0;i<parsedata.length;i++) {
           myquery = { _id:ObjectId(parsedata[i]._id)};
            mongodb.deleteDatainDb(req,res,"RECOVERYOBJECTIVES",myquery);
        }
        res.send(JSON.stringify({"result":"ok"}));
})


router.post('/deleteCommunicationsTree',jsonParser, (req, res,next) => {
  var parsedata = req.body; 
     for(var i=0;i<parsedata.length;i++) {
           myquery = { _id:ObjectId(parsedata[i]._id)};
            mongodb.deleteDatainDb(req,res,"COMMUNICATIONTREE",myquery);
        }
        res.send(JSON.stringify({"result":"ok"}));
})


router.post('/deletebusinessimpact',jsonParser, (req, res,next) => {
  var parsedata = req.body; 
   for(var i=0;i<parsedata.length;i++) {
           myquery = { _id:ObjectId(parsedata[i]._id)};
            mongodb.deleteDatainDb(req,res,"BUSINESSIMPACT",myquery);
        }
        res.send(JSON.stringify({"result":"ok"}));
})


router.post('/deleteAwayTeam',jsonParser, (req, res,next) => {
  var parsedata = req.body; 
     for(var i=0;i<parsedata.length;i++) {
           myquery = { _id:ObjectId(parsedata[i]._id)};
            mongodb.deleteDatainDb(req,res,"AWAYTEAM",myquery);
        }
        res.send(JSON.stringify({"result":"ok"}));
})



router.post('/deleteCommunicationPlan',jsonParser, (req, res,next) => {
  var parsedata = req.body; 
    for(var i=0;i<parsedata.length;i++) {
           myquery = { _id:ObjectId(parsedata[i]._id)};
            mongodb.deleteDatainDb(req,res,"COMMUNICATIONPLAN",myquery);
        }
        res.send(JSON.stringify({"result":"ok"}));
})


router.post('/deleteSoftwareSpecifications',jsonParser, (req, res,next) => {
  var parsedata = req.body; 
    for(var i=0;i<parsedata.length;i++) {
           myquery = { _id:ObjectId(parsedata[i]._id)};
            mongodb.deleteDatainDb(req,res,"SOFTWARESPECIFICATIONS",myquery);
        }
        res.send(JSON.stringify({"result":"ok"}));
})


router.post('/deleteHardwareSpecifications',jsonParser, (req, res,next) => {
  var parsedata = req.body; 
     for(var i=0;i<parsedata.length;i++) {
           myquery = { _id:ObjectId(parsedata[i]._id)};
            mongodb.deleteDatainDb(req,res,"HARDWARESPECIFICATIONS",myquery);
        }
        res.send(JSON.stringify({"result":"ok"}));
  
})

router.post('/deleteTestPlanning',jsonParser, (req, res,next) => {
  var parsedata = req.body; 
    for(var i=0;i<parsedata.length;i++) {
           myquery = { _id:ObjectId(parsedata[i]._id)};
            mongodb.deleteDatainDb(req,res,"TESTPLANNING",myquery);
        }
        res.send(JSON.stringify({"result":"ok"}));
})



router.post('/plansubmit',jsonParser, (req, res,next) => {
  var status ="Draft";
  if(req.query.status=="Draft" || req.query.status=="Waiting for Rework"){
    status="Review Pending";
  } else if(req.query.status=="Review Pending" && req.query.sendcomments!=null && req.query.sendcomments=="true"){
    status="Waiting for Rework";
  } else if(req.query.status=="Review Pending") {
    status = "Approved";
  } 
  
  mongodb.updatestatusQuery("BUSINESSIMPACT",{location:req.query.location,project:req.query.project,STATUS:req.query.status},{ $set: {STATUS:status} });
  mongodb.updatestatusQuery("RISKASSESSMENT",{location:req.query.location,project:req.query.project,STATUS:req.query.status},{ $set: {STATUS:status} });
  mongodb.updatestatusQuery("RECOVERYOBJECTIVES",{location:req.query.location,project:req.query.project,STATUS:req.query.status},{ $set: {STATUS:status} });
  mongodb.updatestatusQuery("COMMUNICATIONTREE",{location:req.query.location,project:req.query.project,STATUS:req.query.status},{ $set: {STATUS:status} });
  mongodb.updatestatusQuery("AWAYTEAM",{location:req.query.location,project:req.query.project,STATUS:req.query.status},{ $set: {STATUS:status} });
  mongodb.updatestatusQuery("COMMUNICATIONPLAN",{location:req.query.location,project:req.query.project,STATUS:req.query.status},{ $set: {STATUS:status} });
  mongodb.updatestatusQuery("SOFTWARESPECIFICATIONS",{location:req.query.location,project:req.query.project,STATUS:req.query.status},{ $set: {STATUS:status} });
  mongodb.updatestatusQuery("HARDWARESPECIFICATIONS",{location:req.query.location,project:req.query.project,STATUS:req.query.status},{ $set: {STATUS:status} });
  mongodb.updatestatusQuery("TESTPLANNING",{location:req.query.location,project:req.query.project,STATUS:req.query.status},{ $set: {STATUS:status} });
  mongodb.updatestatusQuery("SEATINGINFORMATION",{location:req.query.location,project:req.query.project,STATUS:req.query.status},{ $set: {STATUS:status} });


        res.send(JSON.stringify({"result":"ok"}));
})


module.exports=router;
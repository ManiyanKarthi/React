var express = require('express')
var router = express.Router();
var mongodb = require('../db/mongodb');
var bodyParser = require('body-parser')
var myquery;
var jsonParser = bodyParser.json()
const nodemailer = require("nodemailer");


// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})


router.post('/authenticate',jsonParser, (req, res,next) => {
  myquery = req.body;
  mongodb.getDatafromDb(req,res,"EMPLOYEE",myquery);
})




  let transporter = nodemailer.createTransport({
        host: '10.124.45.55',
        auth: {
          user: 'karthikeyan.maniyan@soprasteria.com',
          pass: 'KArthikeya@888'
        }
      });
  //("smtp://kmaniyan@10.124.45.55");

router.get('/sendmail', async (req, res,next) => {
 res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');

const sendmail = require('sendmail')();

sendmail({
  from: 'karthikeyan.maniyan@soprasteria.com',
  to: 'karthikeyan.maniyan@soprasteria.com',
  subject: 'Hello World',
  html: 'Mail of test sendmail '
}, function (err, reply) {
  console.log(err && err.stack)
  console.dir(reply)
})
/*
 var mailOptions = {
  from: 'karthikeyan.maniyan@soprasteria.com',
  to: 'karthikeyan.maniyan@soprasteria.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

 transporter.verify(function(error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});


  let info = transporter.sendMail({
    from: 'karthikeyan.maniyan@soprasteria.com', // sender address
    to: "karthikeyan.maniyan@soprasteria.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>" // html body
  });
*/
res.send(JSON.stringify({"result":"ok"}));
   
})



module.exports=router;
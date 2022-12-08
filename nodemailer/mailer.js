var nodemailer = require("nodemailer")
var smtpTransport = require('nodemailer-smtp-transport');
const mailer = async(req,res)=>{
    var transporter = nodemailer.createTransport(smtpTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: 'saivendoti27@gmail.com',
        pass: 'jgbqucqlzodrxqho'
      }
    }));
    var mailOptions = {
      from: 'saivendoti27@gmail.com',
      to: 'cmssfamily@gmail.com',
      subject: 'Sending Email using Node.js[nodemailer]',
      text: 'That was easy!'
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent:hello did you understand the mail ' + info.response);
      }
    })};
    
    module.exports = {mailer}
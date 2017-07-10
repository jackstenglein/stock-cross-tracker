const nodemailer = require('nodemailer');
const AWS = require('aws-sdk');
const ejs = require('ejs');
const Promise = require('bluebird');

AWS.config = new AWS.Config({
  accessKeyId: process.env.AWS_KEY, secretAccessKey: process.env.AWS_SECRET, region: 'us-west-2'
});

var transporter = nodemailer.createTransport({
  SES: new AWS.SES({
    apiVersion: '2010-12-01'
  })
});

module.exports = {

  send: function(to, subject, templateName, parameters) {

    return new Promise(function(resolve, reject) {
      var template = process.cwd() + '/views/emailTemplates/' + templateName + '.ejs';

      ejs.renderFile(template, parameters, {}, function(err, html) {
        if(err) {
          err.code = '500';
          return reject(err);
        }

        transporter.sendMail({
          from: process.env.SENDER_EMAIL,
          to: to,
          subject: subject,
          html: html
        }, (err, info) => {
          if(err) {
            err.code = '500';
            return reject(err);
          }
          return resolve({'info': info});
        });
      });
    });
  },

  sendErrorEmail: function(err) {
    return MailService.send(process.env.ERROR_EMAIL, 'Stock Cross Tracker: 500 Server Error', 'errorNotification', {'error': err})
    .then(function(response) {
      return response;
    }).catch(function(error) {
      console.log('Error in sending error email: %j', error);
      return error;
    });
  }
}

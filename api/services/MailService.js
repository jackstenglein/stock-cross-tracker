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
          return resolve({'message': 'Email sent successfully'});
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
  },

  purchaseStock: function(price, performance, ema, ticker) {
    return MailService.send(
      'jackstenglein@utexas.edu',
      'Buy Signal — ' + ticker,
      'purchaseNotification',
      {
        'basis': {
          'name': 'daily',
          'prevPeriod': 'Yesterday',
          'currPeriod': 'Today'
        },
        'ticker': ticker,
        'prevEMA10': ema.prevEMA10,
        'prevEMA20': ema.prevEMA20,
        'currEMA10': ema.ema10,
        'currEMA20': ema.ema20,
        'shares': 200,
        'price': price,
        'totalInvestment': performance.totalInvestment,
        'percentReturn': performance.percentReturn
      }
    );
  },

  sellStock: function(price, performance, ema, ticker) {
    return MailService.send(
      'jackstenglein@utexas.edu',
      'Sell Signal — ' + ticker,
      'saleNotification',
      {
        'basis': {
          'name': 'daily',
          'prevPeriod': 'Yesterday',
          'currPeriod': 'Today'
        },
        'ticker': ticker,
        'prevEMA10': ema.prevEMA10,
        'prevEMA20': ema.prevEMA20,
        'currEMA10': ema.ema10,
        'currEMA20': ema.ema20,
        'shares': 200,
        'price': price,
        'totalInvestment': performance.totalInvestment,
        'percentReturn': performance.percentReturn
      }
    );
  }
}

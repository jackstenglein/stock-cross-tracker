/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

const Scheduler = require('node-schedule');
var _ = require('lodash');
const Promise = require('bluebird');


module.exports.bootstrap = function(cb) {


  var updateStocks = Scheduler.scheduleJob('* * * * *', function() {

    console.log('Updating the stocks');
    StockService.updateAllStocks().then(function(updatedStocks) {
      console.log('updated stocks: %j', updatedStocks);
    })
  });


  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};

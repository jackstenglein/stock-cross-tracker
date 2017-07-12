const Request = require('request');

module.exports = {

  calculateFullDailyEMA: function(ticker) {
    return new Promise(function(resolve, reject) {
      Request('http://www.google.com/finance/historical?q=NASDAQ:AAPL&output=csv', function(err, response, body) {
        if(err) reject(err);
        console.log('Response: %j', response);
        console.log('\n\nBody: %j', body);
        var closes = [];
        var lines = body.split('\n');
        const length = lines.length - 1;
        for(var i = 1; i < length; i ++) {
          var close = lines[i].split(',')[4];
          closes.push(parseFloat(close));
        }
        resolve(closes);
      });
    });
  }


}

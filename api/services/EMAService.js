const Request = require('request');


const EMA10_MULTIPLIER = 0.1818;

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
  },


  calculateEMA10: function(closes) {

    return new Promise(function(resolve, reject) {
      // first find the SMA10 to use as the previous EMA10
      let ema10 = 0.0;
      for(let i = 0; i < 10; i++) {
        ema10 += closes[closes.length - 1 - i];
      }
      ema10 /= 10;

      // calculate the real EMA10
      for(let i = closes.length - 11; i > -1; i--) {
        ema10 = ((closes[i] - ema10) * EMA10_MULTIPLIER) + ema10;
      }

      if(isNaN(ema10)) {
        reject('EMA10 was not a number');
      } else {
        resolve(ema10);
      }
    });
  }


}

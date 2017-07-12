const Request = require('request');


const EMA10_MULTIPLIER = 0.1818;
const EMA20_MULTIPLIER = 0.0952;



function calculateEMA(closes, period, multiplier) {
  // first find the SMA to use as the previous EMA
  let ema = 0.0;
  for(let i = 0; i < period; i++) {
    ema += closes[closes.length - 1 - i];
  }
  ema /= period;

  // calculate the real EMA
  for(let i = closes.length - period - 1; i > -1; i--) {
    ema = ((closes[i] - ema) * multiplier) + ema;
  }

  return ema;
}


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
      let ema10 = calculateEMA(closes, 10, EMA10_MULTIPLIER);
      if(isNaN(ema10)) {
        reject('EMA10 was not a number');
      } else {
        resolve(Number(Math.round(ema10 + 'e2') + 'e-2'));
      }
    });
  },


  calculateEMA20: function(closes) {
    return new Promise(function(resolve, reject) {
      let ema20 = calculateEMA(closes, 20, EMA20_MULTIPLIER);
      if(isNaN(ema20)) {
        reject('EMA20 was not a number');
      } else {
        resolve(Number(Math.round(ema20 + 'e2') + 'e-2'));
      }
    });
  }




}

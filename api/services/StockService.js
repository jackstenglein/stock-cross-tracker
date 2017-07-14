const Err = require('err');
var Promise = require('bluebird');
var _ = require('lodash');
const Moment = require('moment');



function calculateTotalInvestment(purchases) {
  var sum = 0.0;
  var length = purchases.length;
  for(var i = 0; i < length; i++) {
    sum += purchases[i].price * purchases[i].shares;
  }
  return sum;
}


function calculateTotalSales(sales) {
  var sum = 0.0;
  var length = sales.length;
  for(var i = 0; i < length; i++) {
    sum += sales[i].price * sales[i].shares;
  }
  return sum;
}


function purchaseStock(stockID, price, ema, ticker) {
  console.log('Purchase stock: ' + ticker);
  return Transaction.create({
    purchase: stockID,
    type: 0,
    price: price,
    date: Moment().toDate(),
    shares: 200
  }).then(function(newTransaction, err) {
    if(err) throw err;
    return Stock.update(stockID, {shares: 200})
    .then(function(updatedStocks, err) {
      return StockService.getStockPerformanceByID(stockID)
      .then(function(response) {
        return MailService.purchaseStock(price, response.performance, ema, ticker)
        .then(function(mail) {
          return 'Golden cross';
        });
      });
    });
  });
}


function sellStock(stockID, price, ema, ticker) {
  console.log('Sell stock: ' + ticker);
  return Transaction.create({
    sale: stockID,
    type: 1,
    price: price,
    date: Moment().toDate(),
    shares: 200
  }).then(function(newTransaction, err) {
    if(err) throw err;
    return Stock.update(stockID, {shares: 0})
    .then(function(updatedStocks, err) {
      return StockService.getStockPerformanceByID(stockID)
      .then(function(response) {
        return MailService.sellStock(price, response.performance, ema, ticker)
        .then(function(mail) {
          return 'Dead cross';
        });
      });
    });
  });
}


module.exports = {

  addStock(name, ticker) {
    return DownloadService.downloadYearCloses(ticker)
    .then(function(closes) {
      return EMAService.calculateBothEMAs(closes)
      .then(function(ema) {
        return Stock.create({
          name: name,
          ticker: ticker,
          price: closes[0],
          dailyEMA10: ema.ema10,
          dailyEMA20 ema.ema20
        }).then(function(newStock, err) {
          if(err) throw err;
          return {
            'message': 'Stock added',
            'stock': newStock
          };
        });
      })
          return res.json({'ema10': ema10, 'ema20': ema20});
        });
      });
    });

  },


  getAllTransactions: function(ticker) {
    return Stock.findOne({ticker: ticker})
    .populate('purchases')
    .populate('sales')
    .then(function(stock, err) {
      if(err) throw err;
      if(!stock) throw new Err('Ticker not found', 400);

      return {
        'message': 'Found transactions',
        'purchases': stock.purchases,
        'sales': stock.sales
      };
    });
  },


  getPurchases: function(ticker) {
    return Stock.findOne({ticker: ticker})
    .populate('purchases')
    .then(function(stock, err) {
      if(err) throw err;
      if(!stock) throw new Err('Ticker not found', 400);

      return {
        'message': 'Found purchases',
        'purchases': stock.purchases
      };
    });
  },


  getSales: function(ticker) {
    return Stock.findOne({ticker: ticker})
    .populate('sales')
    .then(function(stock, err) {
      if(err) throw err;
      if(!stock) throw new Err('Ticker not found', 400);

      return {
        'message': 'Found sales',
        'sales': stock.sales
      };
    });
  },


  getStockPerformance: function(ticker) {
    return Stock.findOne({ticker: ticker})
    .populate('purchases')
    .populate('sales')
    .then(function(stock, err) {
      if(err) throw err;
      if(!stock) throw new Err('Ticker not found', 400);

      // do the calculations to get the necesary values
      let totalInvestment = calculateTotalInvestment(stock.purchases);
      let totalMoneyOut = calculateTotalSales(stock.sales);
      if(stock.price && stock.shares) {
        totalMoneyOut += stock.price * stock.shares;
      }
      let moneyEarned = totalMoneyOut - totalInvestment;
      let percentReturn = 0;
      if(totalInvestment !== 0) {
        percentReturn = (moneyEarned * 100.0) / totalInvestment;
      }

      return {
        'message': 'Found performance',
        'performance': {
          'moneyEarned': moneyEarned,
          'totalInvestment': totalInvestment,
          'percentReturn': percentReturn,
          'sharesOwned': stock.shares,
          'numberOfPurchases': stock.purchases.length,
          'numberOfSales': stock.sales.length
        }
      };
    });
  },

  getStockPerformanceByID: function(stockID) {
    return Stock.findOne(stockID)
    .populate('purchases')
    .populate('sales')
    .then(function(stock, err) {
      if(err) throw err;
      if(!stock) throw new Err('Ticker not found', 400);

      // do the calculations to get the necesary values
      let totalInvestment = calculateTotalInvestment(stock.purchases);
      let totalMoneyOut = calculateTotalSales(stock.sales);
      if(stock.price && stock.shares) {
        totalMoneyOut += stock.price * stock.shares;
      }
      let moneyEarned = totalMoneyOut - totalInvestment;
      let percentReturn = 0;
      if(totalInvestment !== 0) {
        percentReturn = (moneyEarned * 100.0) / totalInvestment;
      }

      return {
        'message': 'Found performance',
        'performance': {
          'moneyEarned': moneyEarned,
          'totalInvestment': totalInvestment,
          'percentReturn': percentReturn,
          'sharesOwned': stock.shares,
          'numberOfPurchases': stock.purchases.length,
          'numberOfSales': stock.sales.length
        }
      };
    });
  },


  removeStock: function(ticker) {
    return Stock.destroy({
      ticker: ticker
    }).then(function(destroyedRecords, err) {
      if(err) throw err;
      if(!destroyedRecords[0]) throw new Err('Ticker not found', 400);
      return {
        'message': 'Stock removed',
        'stock': destroyedRecords[0]
      };
    });
  },


  updateAllStocks: function() {
    return Stock.find()
    .populate('purchases')
    .populate('sales')
    .then(function(stocks, err) {
      if(err) throw err;
      var promise = _.map(stocks, function(stock) {
        //console.log('Finding the closes for: %j', stock);
        return DownloadService.downloadYearCloses(stock.ticker)
        .then(function(closes) {
          return EMAService.calculateBothEMAs(closes)
          .then(function(ema) {
            return Stock.update(stock.id, {
              dailyEMA10: ema.ema10,
              dailyEMA20: ema.ema20,
              price: closes[0]
            }).then(function(updatedStocks, err) {
              if(err) throw err;

              ema.prevEMA10 = stock.dailyEMA10;
              ema.prevEMA20 = stock.dailyEMA20;
              console.log('Stock sales: %j', stock.sales);

              // check for a golden cross, then dead cross
              if(ema.ema10 > ema.ema20 && stock.dailyEMA10 <= stock.dailyEMA20 && stock.purchases.length === stock.sales.length) {
                return purchaseStock(stock.id, closes[0], ema, stock.ticker);
              } else if(ema.ema10 < ema.ema20 && stock.dailyEMA10 >= stock.dailyEMA20 && stock.purchases.length > stock.sales.length) {
                return sellStock(stock.id, closes[0], ema, stock.ticker);
              } else {
                return 'No cross';
              }
            });
          });
        });
      });

      return Promise.all(promise);
    });
  }

}

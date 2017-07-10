const Err = require('err');



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



module.exports = {

  addStock(name, ticker) {
    return Stock.create({
      name: name,
      ticker: ticker
    }).then(function(newStock, err) {
      if(err) throw err;
      return {
        'message': 'Stock added',
        'stock': newStock
      };
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
      let percentChange = 0;
      if(totalInvestment !== 0) {
        percentChange = (moneyEarned * 100.0) / totalInvestment;
      }

      return {
        'message': 'Found performance',
        'performance': {
          'moneyEarned': moneyEarned,
          'totalInvestment': totalInvestment,
          'percentChange': percentChange,
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
  }

}

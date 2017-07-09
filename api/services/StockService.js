const Err = require('err');

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

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

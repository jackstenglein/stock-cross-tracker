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
  }

}

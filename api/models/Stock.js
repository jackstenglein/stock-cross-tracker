/**
 * Stock.js
 *
 * @description :: The Stock model represents the stocks that the server will track.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },

    ticker: {
      type: 'string',
      required: true,
      unique: true
    },

    purchases: {
      collection: 'transaction',
      via: 'purchase'
    },

    sales: {
      collection: 'transaction',
      via: 'sale'
    },

    price: {
      type: 'float'
    },

    shares: {
      type: 'integer'
    },

    dailyEMA10: {
      type: 'float'
    },

    dailyEMA20: {
      type: 'float'
    }
  },

  afterDestroy: function(destroyedRecords, cb) {
    Transaction.destroy({stock: _.pluck(destroyedRecords, 'id')}).exec(cb);
  }
};

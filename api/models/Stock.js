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
      required: true
    },

    purchases: {
      collection: 'transaction',
      via: 'stock'
    },

    sales: {
      collection: 'transaction',
      via: 'stock'
    },

    price: {
      type: 'float'
    },

    shares: {
      type: 'integer'
    }
  }
};

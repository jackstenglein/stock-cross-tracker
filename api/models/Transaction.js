/**
 * Transaction.js
 *
 * @description :: The Transaction model represents the purchase or sale of a stock. A new Transaction is created when a golden cross or a dead cross is detected by the server.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    purchase: {
      model: 'stock'
    },

    sale: {
      model: 'stock'
    },

    type: {
      type: 'integer',
      required: true,
      enum: [0, 1]
    },

    price: {
      type: 'float',
      required: true
    },

    date: {
      type: 'datetime',
      required: true
    },

    shares: {
      type: 'integer',
      required: true
    }
  }
};

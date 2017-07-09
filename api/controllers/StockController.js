/**
 * StockController
 *
 * @description :: Server-side logic for managing stocks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const CheckParams = require('check-params');

module.exports = {

	addStock: function(req, res) {
		CheckParams(req, {
			bodyParams: [
				'name',
				'ticker'
			]
		}).then(function() {
			return StockService.addStock(req.body.name, req.body.ticker.toUpperCase())
			.then(function(response) {
				return res.json(response);
			});
		}).catch(function(err) {
			return HelperService.handleError(err, res);
		});
	},

	removeStock: function(req, res) {
		CheckParams(req, {
			bodyParams: [
				'ticker'
			]
		}).then(function() {
			return StockService.removeStock(req.body.ticker.toUpperCase())
			.then(function(response) {
				return res.json(response);
			});
		}).catch(function(err) {
			return HelperService.handleError(err, res);
		});
	}
};

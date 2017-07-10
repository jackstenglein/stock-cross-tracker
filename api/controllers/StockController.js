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
			if(err.invalidAttributes && err.invalidAttributes.ticker) {
				err.code = 400;
				err.message = 'Ticker already exists';
			}
			return HelperService.handleError(err, res);
		});
	},


	getAllTransactions: function(req, res) {
		CheckParams(req, {
			queryParams: [
				'ticker'
			]
		}).then(function() {
			return StockService.getAllTransactions(req.query.ticker.toUpperCase())
			.then(function(response) {
				return res.json(response);
			});
		}).catch(function(err) {
			return HelperService.handleError(err, res);
		});
	},


	getPurchases: function(req, res) {
		CheckParams(req, {
			queryParams: [
				'ticker'
			]
		}).then(function() {
			return StockService.getPurchases(req.query.ticker.toUpperCase())
			.then(function(response) {
				return res.json(response);
			});
		}).catch(function(err) {
			return HelperService.handleError(err, res);
		});
	},


	getSales: function(req, res) {
		CheckParams(req, {
			queryParams: [
				'ticker'
			]
		}).then(function() {
			return StockService.getSales(req.query.ticker.toUpperCase())
			.then(function(response) {
				return res.json(response);
			});
		}).catch(function(err) {
			return HelperService.handleError(err, res);
		});
	},


	getStockPerformance: function(req, res) {
		CheckParams(req, {
			queryParams: [
				'ticker'
			]
		}).then(function() {
			return StockService.getStockPerformance(req.query.ticker.toUpperCase())
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

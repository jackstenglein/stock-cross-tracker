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

		}).catch(function(err) {
			return HelperService.handleError(err, res);
		});
	}
};

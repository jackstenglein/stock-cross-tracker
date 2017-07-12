module.exports = {

  sendTestEmail: function(req, res) {
    return MailService.send(
      'jackstenglein@utexas.edu',
      'Test Email from Stock Cross Tracker',
      'testEmail',
      {
        'senderName': 'Test Controller'
      }
    ).then(function(response) {
      return res.json(response);
    }).catch(function(err) {
      return HelperService.handleError(err, res);
    });
  },


  getFullDailyEMA: function(req, res) {
    return DownloadService.downloadYearCloses('AAPL').then(function(response) {
      return res.json(response);
    });
  },

  sendTestDailyPurchase: function(req, res) {
    return MailService.send(
      'jackstenglein@utexas.edu',
      'Test Daily Purchase — Stock Cross Tracker',
      'purchaseNotification',
      {
        'basis': {
          'name': 'daily',
          'prevPeriod': 'Yesterday',
          'currPeriod': 'Today'
        },
        'ticker': 'OPK',
        'prevEMA10': 12.13,
        'prevEMA20': 15.09,
        'currEMA10': 16.53,
        'currEMA20': 14.92,
        'shares': 150,
        'price': 75.65,
        'totalInvestment': 15000,
        'percentReturn': 28
      }
    ).then(function(response) {
      return res.json(response);
    }).catch(function(err) {
      return HelperService.handleError(err, res);
    });
  },

  sendTestWeeklyPurchase: function(req, res) {
    return MailService.send(
      'jackstenglein@utexas.edu',
      'Test Weekly Purchase — Stock Cross Tracker',
      'purchaseNotification',
      {
        'basis': {
          'name': 'weekly',
          'prevPeriod': 'Last Week',
          'currPeriod': 'This Week'
        },
        'ticker': 'OPK',
        'prevEMA10': 12.13,
        'prevEMA20': 15.09,
        'currEMA10': 16.53,
        'currEMA20': 14.92,
        'shares': 150,
        'price': 75.65,
        'totalInvestment': 15000,
        'percentReturn': 28
      }
    ).then(function(response) {
      return res.json(response);
    }).catch(function(err) {
      return HelperService.handleError(err, res);
    });
  },

  sendTestDailySale: function(req, res) {
    return MailService.send(
      'jackstenglein@utexas.edu',
      'Test Daily Sale — Stock Cross Tracker',
      'saleNotification',
      {
        'basis': {
          'name': 'daily',
          'prevPeriod': 'Yesterday',
          'currPeriod': 'Today'
        },
        'ticker': 'OPK',
        'prevEMA10': 15.09,
        'prevEMA20': 12.13,
        'currEMA10': 14.92,
        'currEMA20': 16.73,
        'shares': 150,
        'price': 75.65,
        'totalInvestment': 15000,
        'percentReturn': 28
      }
    ).then(function(response) {
      return res.json(response);
    }).catch(function(err) {
      return HelperService.handleError(err, res);
    });
  },

  sendTestWeeklySale: function(req, res) {
    return MailService.send(
      'jackstenglein@utexas.edu',
      'Test Weekly Sale — Stock Cross Tracker',
      'saleNotification',
      {
        'basis': {
          'name': 'weekly',
          'prevPeriod': 'Last Week',
          'currPeriod': 'This Week'
        },
        'ticker': 'OPK',
        'prevEMA10': 15.09,
        'prevEMA20': 12.13,
        'currEMA10': 14.92,
        'currEMA20': 16.73,
        'shares': 150,
        'price': 75.65,
        'totalInvestment': 15000,
        'percentReturn': 28
      }
    ).then(function(response) {
      return res.json(response);
    }).catch(function(err) {
      return HelperService.handleError(err, res);
    });
  }
}

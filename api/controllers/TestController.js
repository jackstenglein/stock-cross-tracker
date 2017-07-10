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
  }
}

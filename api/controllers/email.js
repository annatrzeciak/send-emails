const Email = require('../models/email');

exports.getEmails = () => {
  return Email.find();
};

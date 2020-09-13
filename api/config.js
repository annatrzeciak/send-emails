const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  mongoURI: process.env.mongoURI,
  mailUser: process.env.mailUser,
  mailPass: process.env.mailPass,
};

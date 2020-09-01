const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  const { emails } = req.body;
  console.log('Send emails to : ');
  console.log(emails);
  res.send(emails);
});
module.exports = router;

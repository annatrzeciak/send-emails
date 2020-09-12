const express = require('express');

const router = express.Router();
const Email = require('../models/email');
const emailController = require('../controllers/email');

router.post('/', async (req, res) => {
  const { emails } = req.body;
  let result = '';

  await Email.insertMany(
    emails.map((item) => ({
      email: item.Email,
      name: item.Name,
      date: new Date(),
      status: 'Added email to the queue',
    })),
    (err, docs) => {
      if (err) {
        res.status(400).send(`Error: ${err.message}`);
      } else {
        result = docs;
        res.status(200).json(result);
      }
    }
  );
});

router.get('/', async (req, res) => {
  await emailController
    .getEmails()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => res.status(400).send(`Error: ${err.message}`));
});
module.exports = router;

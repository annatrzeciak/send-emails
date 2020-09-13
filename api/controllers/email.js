const nodemailer = require('nodemailer');
const Email = require('../models/email');
const config = require('../config');

exports.getEmails = () => {
  return Email.find();
};

const transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: config.mailUser,
    pass: config.mailPass,
  },
});

const generateMail = (name, email) => ({
  from: '"Anna Trzeciak" <atrzeciak.editor@gmail.com>',
  to: email,
  subject: 'Test message',
  text: `Hey ${name}, it’s test message`,
});

exports.sendEmails = async (io, people) => {
  for (const person of people) {
    // eslint-disable-next-line no-await-in-loop
    await Email.findOneAndUpdate(
      // eslint-disable-next-line no-underscore-dangle
      { _id: person._id },
      {
        status: 2,
        status_message: 'Sending email',
      },
      { new: true },
      (err, doc) => {
        if (err) {
          io.emit('SENDING_ERROR', err);
        } else {
          io.emit('UPDATE_STATUS', doc);
        }
      }
    );

    // eslint-disable-next-line no-await-in-loop
    await transport.sendMail(
      generateMail(person.name, person.email),
      (err, info) => {
        if (err) {
          Email.findOneAndUpdate(
            // eslint-disable-next-line no-underscore-dangle
            { _id: person._id },
            {
              status: 4,
              status_message: `Sending email failed, ${err.message}`,
            },
            { new: true },
            (error, doc) => {
              if (error) {
                io.emit('SENDING_ERROR', err);
              } else {
                io.emit('UPDATE_STATUS', doc);
              }
            }
          );
        } else if (info) {
          Email.findOneAndUpdate(
            // eslint-disable-next-line no-underscore-dangle
            { _id: person._id },
            {
              status: 3,
              status_message: 'Sending email completed successfully ',
            },
            { new: true },
            (error, doc) => {
              if (error) {
                io.emit('SENDING_ERROR', err);
              } else {
                io.emit('UPDATE_STATUS', doc);
              }
            }
          );
        }
      }
    );
  }
};

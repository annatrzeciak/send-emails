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

exports.sendEmails = (people) => {
  people.forEach((person) => {
    Email.findByIdAndUpdate(person.id, {
      status: 2,
      status_message: 'Sending email',
    });
    transport.sendMail(
      generateMail(person.name, person.email),
      (error, info) => {
        if (error) {
          console.log(error);
          Email.findByIdAndUpdate(
            person.id,
            {
              status: 4,
              status_message: `Sending email failed, ${error.message}`,
            },
            (err, doc) => {
              console.log(doc);
            }
          );
        } else {
          setTimeout(() => {
            Email.findByIdAndUpdate(
              person.id,
              {
                status: 3,
                status_message: 'Sending email completed successfully ',
              },
              (err, doc) => {
                console.log(doc);
              }
            );
            console.log(info);
          }, 5000);
        }
      }
    );
  });
};

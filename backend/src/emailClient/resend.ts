import { Resend } from 'resend';

const resend = new Resend('re_FuZZx8Qu_25ciKPy5mAvRe8mBtmcUdgG1');

resend.emails.send({
  from: 'dominikdolejsi96@gmail.com',
  to: 'bukefalus007@gmail.com',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
});
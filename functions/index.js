const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');
const cors = require('cors')({ origin: true });

admin.initializeApp();

const airtableKey = functions.config().airtable.key;
const googleKey = functions.config().google.key;
const playlistId = 'PL8zglt-LDl-iywBxcoGUoG-Sh0_1IaoQJ';

exports.getWebinars = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/playlistItems?key=${googleKey}&part=snippet&playlistId=${playlistId}&maxResults=50`,
      )
      .then((response) => {
        return res.status(200).json({
          message: response.data,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          error: err,
        });
      });
  });
});

exports.getData = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    axios
      .get(`https://api.airtable.com/v0/appWPIPmVSmXaMhey/${req.query.urlType}`, {
        headers: { Authorization: `Bearer ${airtableKey}` },
      })
      .then((response) => {
        return res.status(200).json({
          message: response.data,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          error: err,
        });
      });
  });
});

const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');


exports.emailMessage = functions.https.onRequest((req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');

  res.set('Access-Control-Allow-Headers', '*');

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  console.log(req.params);
  const { name, email, phone, message } = req.query;
  return cors(req, res, () => {
    var text = `<div>
      <h4>Information</h4>
      <ul>
        <li>
          Name - ${name || ""}
        </li>
        <li>
          Email - ${email || ""}
        </li>
        <li>
          Phone - ${phone || ""}
        </li>
      </ul>
      <h4>Message</h4>
      <p>${message || ""}</p>
    </div>`;
    let transporter = nodemailer.createTransport({
      service: 'gmail',
  
      auth: {
          user: 'testnodemailercssg@gmail.com', // generated ethereal user
          pass: 'Test123!'  // generated ethereal password
      },
      tls:{
        rejectUnauthorized:false
      }
    });
  
    const mailOptions = {
      to: "calciumphosphate0@gmail.com",
      from: "testnodemailercssg@gmail.com",
      subject: `${name} sent you a new message`,
      text: text,
      html: text
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('contact', {msg:'Email has been sent'});
  });
  })
});
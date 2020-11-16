const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');
const cors = require('cors')({ origin: true });
const nodemailer = require('nodemailer');

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

/* UNDERSTANDING CLOUD FUNCTIONS
   - created with help of this link: https://firebase.google.com/docs/functions/http-events
   - using functions.https will create a function that handles https events 
   - event handler for the HTTP function listens for the onRequest() even
   - the Request object will then give access to the properties of the HTTPS request sent */

/* INSTALLATION AND SETUP
   - make sure you have firebase firebase-tools installed
   - you will need to import functions, admin, axios, and cors to load the firebase-functions and firebase-admin modules
   - after all of this, you will have to initialize the app instance from which cloud changes can be made (admin.initializeApp();)
*/

/* HOW DOES THE getData FUNCTION WORK?
   - this function is called through it's firebase cloud function link with params passed into it
   - each param varies depending on the airtable you would like to access
   - for instance, if I want to access the Announcements airtable, I would simply pass in an object with "Announcements" as its value
   - you can find this example in the index.js in the Resources component
   - when this function is called, the function accesses it request object and retrieves the params in it which is then passed into the
   api link to get the correct airtable
*/

/* TESTING IF YOUR CLOUD FUNCTION WORKS
   - this link helped me test the cloud function even before I deployed it: https://firebase.google.com/docs/functions/local-emulator
   - running an emulator for the specific function was done through this command: firebase emulators:start --only functions
   - this way I could pass in any object and check if I was executing my function correctly
*/

exports.getData = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    axios
      .get(
        `https://api.airtable.com/v0/appWPIPmVSmXaMhey/${req.query.urlType}`,
        {
          headers: { Authorization: `Bearer ${airtableKey}` },
        },
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

const contactEmail = functions.config().contact.email;
const contactPassword = functions.config().contact.password;

exports.emailMessage = functions.https.onRequest((req, res) => {
  const { name, email, phone, message } = req.body;
  console.log(req.body);

  cors(req, res, () => {
    var text = `<div>
      <h4>Information</h4>
      <ul>
        <li>
          Name - ${name || ''}
        </li>
        <li>
          Email - ${email || ''}
        </li>
        <li>
          Phone - ${phone || ''}
        </li>
      </ul>
      <h4>Message</h4>
      <p>${message || ''}</p>
    </div>`;

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: contactEmail, // generated ethereal user
        pass: contactPassword, // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      to: contactEmail,
      from: contactEmail,
      subject: `${name} sent you a new message`,
      text: text,
      html: text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.status(200).send({
        message: 'success',
      });
    });
  });
});

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

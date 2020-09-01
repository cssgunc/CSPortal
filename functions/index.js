const axios = require('axios');
const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });

// const airtableKey = functions.config().airtable.key;
const googleKey = functions.config().google.key;
const playlistId = 'PL8zglt-LDl-iywBxcoGUoG-Sh0_1IaoQJ';

exports.getWebinars = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/playlistItems?key=${googleKey}&part=snippet&playlistId=${playlistId}&maxResults=50`,
      )
      .then((response) => {
        console.log(response);
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

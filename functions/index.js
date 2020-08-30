const axios = require('axios');
const functions = require('firebase-functions');

exports.returnMessage = functions.https.onCall((data, context) => {
  return { output: 'function ran' };
});

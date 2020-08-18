import axios from 'axios';

const functions = require('firebase-functions');
export const airtableKey = process.env.REACT_APP_AIRTABLE_API_KEY;


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.samplePost = functions.https.onRequest((request, response) => {
    axios.post(`https://api.airtable.com/v0/app4bBP7ysJFDeHQk/Users`, {fields: {Name: "Rupali"}}, {headers:{Authorization: `Bearer ${airtableKey}`, "Content-Type": "application/json"}})
      .then(result => result)
      .catch(error => {response.send(error);})
})

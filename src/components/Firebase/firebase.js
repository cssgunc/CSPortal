import app from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const airtableKey = process.env.REACT_APP_AIRTABLE_API_KEY;

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
  }

  // PLEASE READ:
  // add conditions so only user already in Directory can sign up below
  // the list of allowed emails can be accessed in the Airtable database:
  // https://airtable.com/invite/l?inviteId=invUlo8HaLCbPq2ZC&inviteToken=1be33a9d46def5811f63b756c370cbdec080b3d799521b6bc1ac99abb63d37a6
  // checkout Landing > index.js for an example on how you can fetch the emails or you can use cloud functions (checkout the "cloudfunctions" branch)
  // here's how you can access the different fields in the database
  // (you need click the above link first and log into/create an account with Airtable before you can access this link):
  // https://airtable.com/appWPIPmVSmXaMhey/api/docs#curl/table:directory

  // Gets array of emails from airtable
  getEmails = async () => {
    try {
      const response = await axios
        .get(`https://api.airtable.com/v0/appWPIPmVSmXaMhey/Directory`, {
          headers: { Authorization: `Bearer ${airtableKey}` },
        });
      return response.data.records.map((x) => x.fields.Email);
    }
    catch (error) {
      console.log(error);
    }

    return [];
  };

  //only signs user up if provided email is in rtc directory
  doCreateUserWithEmailAndPassword = async (email, password) => {
    const val = await this.getEmails();
    if (val.includes(email)) {
      return this.auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.auth.currentUser.sendEmailVerification();
        this.auth.signOut();
      });
    } else {
      return Promise.reject(new Error("The provided email is not in the RTC directory."));
    }
  }

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);
}

export default Firebase;

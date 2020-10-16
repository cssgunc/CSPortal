import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { withAuthorization } from '../Session';
import Heading from '../General/Heading';

function Webinars() {
  const airtableKey = process.env.REACT_APP_AIRTABLE_API_KEY;
  // all the webinars data is stored here
  const [webinars, setWebinars] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.airtable.com/v0/appWPIPmVSmXaMhey/Videos`, {
        headers: { Authorization: `Bearer ${airtableKey}` },
      })
      .then((result) => {
        setWebinars(result.data.records);
        console.log(result.data.records);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [airtableKey]);

  // PLEASE READ:
  // to access the data for all the webinars, use the 'webinars' variable initialized above.
  // check out the structure of the data in your browser's console (in the developer tools).
  // check out the /Landing/index.js for an example of how to access and render the different variables.
  // use this link to see how the AirTable is set up:
  // https://airtable.com/invite/l?inviteId=invUlo8HaLCbPq2ZC&inviteToken=1be33a9d46def5811f63b756c370cbdec080b3d799521b6bc1ac99abb63d37a6
  // here's how you can access the different fields in the database
  // (you need click the above link first and log into/create an account with Airtable before you can access this link):
  // https://airtable.com/appWPIPmVSmXaMhey/api/docs#curl/table:videos

  return (
    <Router>
      <div>
        <section className="section is-white">
          <Link to={`/webinars/${webinars.id}`}>
            <Heading>Webinars</Heading>
          </Link>
        </section>
      </div>
    </Router>
  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(Webinars);

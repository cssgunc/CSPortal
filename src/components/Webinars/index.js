import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  // use this link to see how the API works: https://airtable.com/appWPIPmVSmXaMhey/api/docs#curl/table:videos

  return (
    <div>
      <section className="section is-white">
        <Heading>Webinars</Heading>
      </section>
    </div>
  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(Webinars);

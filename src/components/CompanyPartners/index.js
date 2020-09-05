import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withAuthorization } from '../Session';
import Heading from '../General/Heading';

function CompanyPartners() {
  const airtableKey = process.env.REACT_APP_AIRTABLE_API_KEY;
  // all the companies data is stored here
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.airtable.com/v0/appWPIPmVSmXaMhey/Companies`, {
        headers: { Authorization: `Bearer ${airtableKey}` },
      })
      .then((result) => {
        setCompanies(result.data.records);
        console.log(result.data.records);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [airtableKey]);

  // PLEASE READ:
  // to access the data for all the companies, use the 'companies' variable initialized above.
  // check out the structure of the data in your browser's console (in the developer tools).
  // check out the /Landing/index.js for an example of how to access and render the different variables.
  // use this link to see how the API works: https://airtable.com/appWPIPmVSmXaMhey/api/docs#curl/table:companies

  return (
    <div>
      <section className="section is-white">
        <Heading>Company Partners</Heading>
      </section>
    </div>
  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(CompanyPartners);

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withAuthorization } from '../Session';
import Heading from '../General/Heading';

function OpportunitiesSubPage() {
  const airtableKey = process.env.REACT_APP_AIRTABLE_API_KEY;
  // all the data for the particular opportunity is stored here
  const [opportunity, setOpportunity] = useState([]);

  // change to different IDs from the airtable here. right now, it fetches one I chose at random.
  const currentOpportunityID = 'recPgc9d3om1ioAcx';

  useEffect(() => {
    axios
      .get(
        `https://api.airtable.com/v0/appWPIPmVSmXaMhey/Opportunities/${currentOpportunityID}`,
        {
          headers: { Authorization: `Bearer ${airtableKey}` },
        },
      )
      .then((result) => {
        setOpportunity(result.data.fields);
        console.log(result.data.fields);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [airtableKey]);

  return (
    <div>
      <section className="section is-white">
        <Heading>{opportunity.Title}</Heading>
        <p>{opportunity.CompanyName}</p>
      </section>
    </div>
  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(OpportunitiesSubPage);

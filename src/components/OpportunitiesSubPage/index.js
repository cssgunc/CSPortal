import React, { useState, useEffect } from 'react';
import Airtable from 'airtable';

import * as AIRTABLE from '../../constants/airtable';
import { withAuthorization } from '../Session';
import Heading from '../General/Heading';

function OpportunitiesSubPage(props) {
  const airtableKey = process.env.REACT_APP_AIRTABLE_API_KEY;
  // all the data for the particular opportunity is stored here
  const [opportunity, setOpportunity] = useState([]);

  const { match } = props;
  const currentOpportunityID = match.params.id;

  useEffect(() => {
    const updateOpportunity = async () => {
      let base = new Airtable({apiKey: airtableKey}).base(AIRTABLE.BASE_ID);

      let record = await base(AIRTABLE.OPPORTUNITIES_TABLE).find(currentOpportunityID);

      setOpportunity(record.fields);
    }

    updateOpportunity();
  }, [airtableKey, currentOpportunityID]);

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

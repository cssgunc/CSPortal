import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Airtable from 'airtable';

import * as AIRTABLE from '../../constants/airtable';
import { withAuthorization } from '../Session';
import Heading from '../General/Heading';
import ViewWithTopBorder from '../General/ViewWithTopBorder';
import * as ROUTES from '../../constants/routes';

// import CompanyPartners from '../CompanyPartners/index.js';

function Opportunities() {
  const airtableKey = process.env.REACT_APP_AIRTABLE_API_KEY;
  // all the opportunities data is stored here
  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    const updateOpportunities = async () => {        
      let base = new Airtable({apiKey: airtableKey}).base(AIRTABLE.BASE_ID);

      let records = await base(AIRTABLE.OPPORTUNITIES_TABLE).select().all();

      setOpportunities(records);
    }

    updateOpportunities();
  }, [airtableKey]);

  // PLEASE READ:
  // to access the data for all the opportunities, use the 'opportunities' variable initialized above.
  // check out the structure of the data in your browser's console (in the developer tools).
  // check out the /Landing/index.js for an example of how to access and render the different variables.
  // use this link to see how the AirTable is set up:
  // https://airtable.com/invite/l?inviteId=invUlo8HaLCbPq2ZC&inviteToken=1be33a9d46def5811f63b756c370cbdec080b3d799521b6bc1ac99abb63d37a6
  // here's how you can access the different fields in the database
  // (you need click the above link first and log into/create an account with Airtable before you can access this link):
  // https://airtable.com/appWPIPmVSmXaMhey/api/docs#curl/table:opportunities

  return (
    <div>
      <section className="section is-white">
        <ViewWithTopBorder>
          <Heading>Featured Opportunities</Heading>
          <div className="columns is-multiline">
            {opportunities.length === 0 ? (
              <div className="box">
                <div className="content">
                  <p>
                    <strong>No Opportunities yet! Check back later! </strong>
                  </p>
                </div>
              </div>
            ) : (
              opportunities
                .filter((role) => role.fields.Featured)
                .map((role) => (
                  <div className="column is-one-quarter">
                    <div className="box" key={role.id}>
                      <img
                        src={role.fields.CompanyLogo[0].thumbnails.small.url}
                        alt="Logo"
                      />
                      <div className="content">
                        <p>
                          <Link to={`${ROUTES.OPPORTUNITIES}/${role.id}`}>
                            <strong>{role.fields.Title}</strong>
                          </Link>
                          <br />
                          {role.fields.CompanyName}
                          <br />
                          {role.fields.Location}
                          <br />
                          {role.fields.Start}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>
        </ViewWithTopBorder>
      </section>
    </div>
  );
}
// {role.fields.CompanyLogo[0].url}
const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(Opportunities);

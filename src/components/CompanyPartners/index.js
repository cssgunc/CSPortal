import React, { useState, useEffect } from 'react';
import Airtable from 'airtable';

import * as AIRTABLE from '../../constants/airtable';
import { withAuthorization } from '../Session';
import Heading from '../General/Heading';
import ViewWithTopBorder from '../General/ViewWithTopBorder';
import colors from '../../constants/RTCColors';

function CompanyPartners() {
  const airtableKey = process.env.REACT_APP_AIRTABLE_API_KEY;
  // all the companies data is stored here
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const updateCompanies = async () => {
      let base = new Airtable({apiKey: airtableKey}).base(AIRTABLE.BASE_ID);

      let records = await base(AIRTABLE.COMPANIES_TABLE).select().all();
      setCompanies(records);
    }

    updateCompanies();
  }, [airtableKey]);

  // PLEASE READ:
  // to access the data for all the companies, use the 'companies' variable initialized above.
  // check out the structure of the data in your browser's console (in the developer tools).
  // check out the /Landing/index.js for an example of how to access and render the different variables.
  // use this link to see how the AirTable is set up:
  // https://airtable.com/invite/l?inviteId=invUlo8HaLCbPq2ZC&inviteToken=1be33a9d46def5811f63b756c370cbdec080b3d799521b6bc1ac99abb63d37a6
  // here's how you can access the different fields in the database
  // (you need click the above link first and log into/create an account with Airtable before you can access this link):
  // https://airtable.com/appWPIPmVSmXaMhey/api/docs#curl/table:companies

  const formattedCompanies = companies.map((company) => {
    return {
      logo: company.fields.Logo[0].thumbnails.full.url,
      name: company.fields.Name,
      description: company.fields.Description,
    };
  });

  const styles = {
    // Centers images of different aspect ratios within a portion of the box
    imageStyle: {
      position: 'relative',
      top: '50%',
      transform: 'translateY(-50%)',
    },

    boxStyle: {
      width: '200px',
      height: '200px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },

    figureStyle: {
      width: '100px',
      height: '100px',
    },

    rowStyle: {
      height: '80%',
    },

    topBorderStyle: {
      minHeight: '100vh',
    },
  };

  return (
    <div>
      <section className="column">
        <ViewWithTopBorder style={styles.topBorderStyle}>
          <Heading>Company Partners</Heading>
          <div className="columns is-mobile is-multiline">
            {formattedCompanies.length === 0 ? (
              <div className="column">
                <div className="row">
                  <div className="subtitle">
                    Company Partners to be added soon! Check back later!
                  </div>
                </div>
              </div>
            ) : (
              formattedCompanies.map((company) => (
                <div className="column" key={company.name}>
                  <div
                    className="box has-text-centered"
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.boxShadow = `0 0 5px ${colors.gray}`)
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '')}
                    style={styles.boxStyle}
                  >
                    <div className="row" style={styles.rowStyle}>
                      <figure
                        className="is-128x128 is-inline-block"
                        style={styles.figureStyle}
                      >
                        <img
                          src={company.logo}
                          alt={`${company.name} Logo`}
                          style={styles.imageStyle}
                        />
                      </figure>
                    </div>
                    <div className="row">
                      <div className="subtitle">{company.name}</div>
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

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(CompanyPartners);

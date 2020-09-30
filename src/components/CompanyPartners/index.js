import React, { useState, useEffect } from "react";
import axios from "axios";
import { withAuthorization } from "../Session";
import Heading from "../General/Heading";

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
  // use this link to see how the AirTable is set up:
  // https://airtable.com/invite/l?inviteId=invUlo8HaLCbPq2ZC&inviteToken=1be33a9d46def5811f63b756c370cbdec080b3d799521b6bc1ac99abb63d37a6
  // here's how you can access the different fields in the database
  // (you need click the above link first and log into/create an account with Airtable before you can access this link):
  // https://airtable.com/appWPIPmVSmXaMhey/api/docs#curl/table:companies

  const formattedCompanies = companies.map((company) => {
    return {
      // Logo -> Name -> Description -> Opportunities
      logo: company.fields.Logo[0].thumbnails.full.url,
      name: company.fields.Name,
      description: company.fields.Description,
    };
  });
  console.log(formattedCompanies);

  return (
    <div>
      <section className="section is-white">
        <Heading>Company Partners</Heading>
      </section>
      <section className="section">
        {/* <body>
            {formattedCompanies.map(obj => (
              <li>
                {obj.name} - {obj.description}
              </li>
            ))}
          </body> */}
          
        {formattedCompanies.map((obj) => (
          <div className="box">
            <article className="media">
              <div className="media-left is-vcentered">
                <figure className="image is-128x128">
                <img src={obj.logo} alt={obj.name + " Logo"}></img>
                </figure>
              </div>
              <div className="media-content">
                <div className="content">
                    <div className="title">
                      <strong>{obj.name}</strong>
                    </div>
                    <br></br>
                    {obj.description}
                </div>
              </div>
            </article>
          </div>
        ))}
      </section>
    </div>
  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(CompanyPartners);

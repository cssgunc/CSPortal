import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { withAuthorization } from '../Session';
import Heading from '../General/Heading';
import ViewWithTopBorder from '../General/ViewWithTopBorder';
import * as ROUTES from '../../constants/routes';

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

  if (webinars.length > 5) {
    setWebinars(webinars.slice(0, 5));
  }

  return (
    <div>
      <section className="section is-white">
        <ViewWithTopBorder>
        <Heading>Webinars</Heading>
        <div className="columns is-multiline">
        {webinars.length === 0 ? (
          <div className="box">
            <div className="content">
              <p>
                <strong>No videos yet! Check back later :)</strong>
              </p>
            </div>
          </div>
        ) : (
          webinars.map((vid) => (
            <div className="column is-half" >
            <div className="box" key={vid.id} style = {{height: `550px`}}>
              <div className="content">
                <p style = {{height: `150px`}}>
                  <Link to={`${ROUTES.WEBINARS}/${vid.id}`}>
                    <a href={vid.fields.VideoLink} style = {{fontSize: "24px"}}>
                      <strong >{vid.fields.Title}</strong>
                    </a>
                  </Link>
                  <br />
                  <br />
                  {vid.fields.Description}
                </p>
                <iframe width="560" height="315" src={vid.fields.VideoLink.replace("watch?v=", "embed/").split("&")[0]} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                </iframe>
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

export default withAuthorization(condition)(Webinars);

import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import axios from 'axios';
import { withAuthorization } from '../Session';
import Heading from '../General/Heading';
import ViewWithTopBorder from '../General/ViewWithTopBorder';
import colors from '../../constants/RTCColors';

function MeetTheTeam() {
  const airtableKey = process.env.REACT_APP_AIRTABLE_API_KEY;
  // all the announcements data is stored here
  const [team, setTeam] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.airtable.com/v0/appWPIPmVSmXaMhey/MeetTheTeam`, {
        headers: { Authorization: `Bearer ${airtableKey}` },
      })
      .then((result) => {
        setTeam(result.data.records);
        console.log(result.data.records);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [airtableKey]);

  // PLEASE READ:
  // to access the data for all the team members, use the 'team' variable initialized above.
  // check out the structure of the data in your browser's console (in the developer tools).
  // use this link to see how the AirTable is set up:
  // https://airtable.com/invite/l?inviteId=invUlo8HaLCbPq2ZC&inviteToken=1be33a9d46def5811f63b756c370cbdec080b3d799521b6bc1ac99abb63d37a6
  // here's how you can access the different fields in the database:
  // (you need click the above link first and log into/create an account with Airtable before you can access this link):
  // https://airtable.com/appWPIPmVSmXaMhey/api/docs#curl/table:meettheteam

  // Example Data
  // Real data to be imported from AirTable
  const data = [
    {
      id: '1',
      fields: {
        name: 'George Harrison',
        bio: 'this is me, george bleh blah hello',
      },
    },
    {
      id: '2',
      fields: {
        name: 'John Lennon',
        bio: 'wndklwend lennon weridjerod',
      },
    },
    {
      id: '3',
      fields: {
        name: 'Paul McCartney',
        bio: 'dkjfnrkfwekldfj',
      },
    },
    {
      id: '4',
      fields: {
        name: 'Ringo',
        bio: 'dkjfnrkfwekldfj',
      },
    },
  ];

  return (
    <div>
      <section className="section is-white">
        <Heading>Meet The Team</Heading>
      </section>
      <section className="section">
        <div className="columns">
          {data.slice(0, 10).map((person) => (
            <div className="column">
              <div
                className="container"
                key={person.id}
                style={{ textAlign: 'center', alignContent: 'center' }}
              >
                <ViewWithTopBorder color={colors.darkBlue}>
                  <Heading style={{ marginTop: '20px' }}>
                    {person.fields.name}
                  </Heading>
                  <figure className="image" style={{ margin: '10%' }}>
                    <img
                      className="is-rounded"
                      src="https://bulma.io/images/placeholders/128x128.png"
                    />
                  </figure>
                  <br />
                  <p className="card-content">{person.fields.bio}</p>
                </ViewWithTopBorder>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(MeetTheTeam);

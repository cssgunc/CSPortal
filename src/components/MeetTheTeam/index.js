import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import Airtable from 'airtable';

import * as AIRTABLE from '../../constants/airtable';
import { withAuthorization } from '../Session';
import Heading from '../General/Heading';
import ViewWithTopBorder from '../General/ViewWithTopBorder';
import colors from '../../constants/RTCColors';

function MeetTheTeam() {
  const airtableKey = process.env.REACT_APP_AIRTABLE_API_KEY;
  // all the announcements data is stored here
  const [team, setTeam] = useState([]);

  useEffect(() => {
      const updateTeam = async () => {        
        let base = new Airtable({apiKey: airtableKey}).base(AIRTABLE.BASE_ID);
  
        let records = await base(AIRTABLE.TEAM_TABLE).select().all();
  
        setTeam(records);
      }

      updateTeam();

  }, [airtableKey]);

  // PLEASE READ:
  // to access the data for all the team members, use the 'team' variable initialized above.
  // check out the structure of the data in your browser's console (in the developer tools).
  // use this link to see how the AirTable is set up:
  // https://airtable.com/invite/l?inviteId=invUlo8HaLCbPq2ZC&inviteToken=1be33a9d46def5811f63b756c370cbdec080b3d799521b6bc1ac99abb63d37a6
  // here's how you can access the different fields in the database:
  // (you need click the above link first and log into/create an account with Airtable before you can access this link):
  // https://airtable.com/appWPIPmVSmXaMhey/api/docs#curl/table:meettheteam

  console.log(team);

  const styles = {
    // Centers images of different aspect ratios within a portion of the box
    imageStyle: {
      width: '200px',
      height: '200px',
      alignItems: 'centered',
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '10px',
    },

    personCard: {
      width: '400px',
      height: '300px',
      marginLeft: 'auto',
      marginRight: 'auto',
      backgroundColor: 'white',
      textAlign: 'center',
      alignItems: 'center',
      alignObjects: 'center',
      margin: '20px',
      padding: '15px',
      borderRadius: '15px',
    },

    nameText: {
      color: 'grey',
      fontSize: '25px',
    },

    bioText: {
      overflow: 'scroll',
      display: 'none',
      height: '400px',
    },
  };

  function showBio(id) {
    const target = document.getElementById(id);
    const bio = document.getElementById(id.concat('bio'));
    const img = document.getElementById(id.concat('img'));
    target.style.height = '500px';
    bio.style.display = 'block';
    img.style.display = 'none';
  }

  function hideBio(id) {
    const target = document.getElementById(id);
    const bio = document.getElementById(id.concat('bio'));
    const img = document.getElementById(id.concat('img'));
    target.style.height = '300px';
    bio.style.display = 'none';
    img.style.display = 'block';
  }

  return (
    <div>
      <section className="section is-white">
        <ViewWithTopBorder color={colors.darkBlue}>
          <Heading>Meet The Team</Heading>
          <div className="columns is-mobile is-multiline">
            {team.slice(0, 10).map((person) => (
              // <div className="column" key={person.id} style = {{width: '400px'}}>
              <div
                className="box"
                id={person.id}
                style={styles.personCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 5px ${colors.gray}`;
                  showBio(person.id);
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '';
                  hideBio(person.id);
                }}
              >
                <p style={styles.nameText}>{person.fields.Name}</p>
                <figure className="image">
                  <img
                    className="displayed" // add is-rounded class
                    src={person.fields.ProfileImage[0].url}
                    alt="img not found"
                    style={styles.imageStyle}
                    id={person.id.concat('img')}
                  />
                </figure>
                <br />
                <p
                  className="card-content"
                  id={person.id.concat('bio')}
                  style={styles.bioText}
                >
                  {person.fields.Bio}
                </p>
              </div>
              // </div>
            ))}
          </div>
        </ViewWithTopBorder>
      </section>
    </div>
  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(MeetTheTeam);

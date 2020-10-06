import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import { withAuthorization } from '../Session';
import Heading from '../General/Heading';
import ViewWithTopBorder from '../General/ViewWithTopBorder';
import colors from '../../constants/RTCColors';
import axios from 'axios';


//import axios from 'axios';


function MeetTheTeam() {

  const airtableKey = process.env.REACT_APP_AIRTABLE_API_KEY;

  //Example Data
  //Real data to be imported from AirTable
  const data = [
      {id: "1", fields: {
        name: "George Harrison",
        bio: "this is me, george bleh blah hello"
          }},
      {id: "2", fields: {
        name: "John Lennon",
        bio: "wndklwend lennon weridjerod"
      }},
      {id: "3", fields: {
        name: "Paul McCartney",
        bio: "dkjfnrkfwekldfj"
      }},
      {id: "4", fields: {
        name: "Ringo",
        bio: "dkjfnrkfwekldfj"
      }}
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
                <div className="container" key={person.id} style={{textAlign: 'center', alignContent: 'center'}}>   
                  <ViewWithTopBorder color={colors.darkBlue}>
                    <Heading style={{marginTop: '20px'}}>
                      {person.fields.name}
                    </Heading>
                    <figure className= "image" style={{margin: '10%'}}>
                        <img className="is-rounded" src="https://bulma.io/images/placeholders/128x128.png"></img>
                    </figure>
                    <br />
                    <p className="card-content">
                    {person.fields.bio}
                  </p>
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

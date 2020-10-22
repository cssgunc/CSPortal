import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withAuthorization } from '../Session';
import Heading from '../General/Heading';
import ViewWithTopBorder from '../General/ViewWithTopBorder';

function WebinarsSubPage(props) {
  const airtableKey = process.env.REACT_APP_AIRTABLE_API_KEY;
  // all the data for the particular webinar is stored here
  const [webinar, setWebinar] = useState([]);

  const { match } = props;
  const currentWebinarID = match.params.id;

  useEffect(() => {
    axios
      .get(
        `https://api.airtable.com/v0/appWPIPmVSmXaMhey/Videos/${currentWebinarID}`,
        {
          headers: { Authorization: `Bearer ${airtableKey}` },
        },
      )
      .then((result) => {
        setWebinar(result.data.fields);
        console.log(result.data.fields);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [airtableKey]);

  return (
    <div>
      <section className="section is-white" defer>
        <ViewWithTopBorder>
          <Heading>{webinar.Title}</Heading>
          <p>{webinar.Description}</p>
          <div >
            <iframe width="560" height="315" src={webinar.VideoLink !== undefined
              ? webinar.VideoLink.replace('watch?v=', 'embed/').split('&')[0]
              : null}frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
            </iframe>
          </div>
        </ViewWithTopBorder>
      </section>
    </div>
  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(WebinarsSubPage);

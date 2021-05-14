import React, { useState, useEffect } from "react";
import Airtable from "airtable";
import Markdown from "react-markdown";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import { withAuthorization } from "../Session";
import Heading from "../General/Heading";
import ViewWithTopBorder from '../General/ViewWithTopBorder';
import Loading from "../General/Loading";
import * as ROUTES from "../../constants/routes";
import * as AIRTABLE from '../../constants/airtable';

function Communities() {
  const airtableKey = process.env.REACT_APP_AIRTABLE_API_KEY;
  // all the clubs data is stored here
  const [clubs, setClubs] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    let updateClubs = async () => {
      let base = new Airtable({apiKey: airtableKey}).base(AIRTABLE.BASE_ID);

      let records = await base(AIRTABLE.CLUBS_TABLE).select({
        sort: [{field: "Name", direction: "asc"}]
      }).all();

      setClubs(records);
      console.log(records);
      setDataLoaded(true);
    }
    updateClubs();
  }, [airtableKey]);

  return (
    <div className="container">
      { dataLoaded ? (
        <section className="section is-white">
          <ViewWithTopBorder>
            <Heading>Communities</Heading>
            <div className="columns is-multiline">
              { clubs.length === 0 ? (
                <div className="box">
                  <div className="content">
                    <p>
                      <strong>No clubs yet! Check back later! </strong>
                    </p>
                  </div>
                </div>
              ) : (
                clubs
                  .map((club) => (
                    <div className="column is-flex is-one-quarter" key={club.id}>
                      <div className="box" key={club.id}> 
                        <div className="mb-2">
                          {club.fields.Logo && club.fields.Logo.length > 0 ? (
                            <figure className="image is-128x128">
                              <img
                                src={club.fields.Logo[0].url}
                                alt="Logo"
                              />
                            </figure>
                          ) : (
                            <Avatar round={true} size="128px" />
                          )}
                        </div>
                        <div className="content">
                          <p>
                            <Link to={`${ROUTES.COMMUNITIES}/${club.id}`}>
                              <strong>{club.fields.Name}</strong>
                            </Link>
                          </p>
                          <Markdown
                            children={club.fields.Description}/>
                        </div>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </ViewWithTopBorder>
        </section>
      ) : (
        <Loading />
      )}
    </div>
  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(Communities);

import React, { useState, useEffect } from "react";
import Airtable from 'airtable';
import { Link } from "react-router-dom";
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

      let records = await base(AIRTABLE.CLUBS_TABLE).select().all();

      setClubs(records);
      console.log(records);
      setDataLoaded(true);
    }
    updateClubs();
  }, [airtableKey]);

  return (
    <div>
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
                        {/* {club.fields.Logo &&
                          <img
                            src={club.fields.Logo.url}
                            alt="Logo"
                          />
                        } */}
                        <div className="content">
                          <p>
                            <Link to={`${ROUTES.COMMUNITIES}/${club.id}`}>
                              <strong>{club.fields.Name}</strong>
                            </Link>
                            <br />
                            {club.fields.Description}
                          </p>
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

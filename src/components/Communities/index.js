import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { withAuthorization } from "../Session";
import Heading from "../General/Heading";
import * as ROUTES from "../../constants/routes";

function Communities() {
  const airtableKey = process.env.REACT_APP_AIRTABLE_API_KEY;
  // all the clubs data is stored here
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.airtable.com/v0/appWPIPmVSmXaMhey/Clubs`, {
        headers: { Authorization: `Bearer ${airtableKey}` },
      })
      .then((result) => {
        setClubs(result.data.records);
        console.log(result.data.records);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [airtableKey]);

  return (
    <div>
      <section className="section is-white">
        <Heading>Communities</Heading>
        {clubs.map((club) => (
          <p>
            <Link to={`${ROUTES.COMMUNITIES}/${club.id}`}>
              {club.fields.Name}
            </Link>
            <br />
          </p>
        ))}
      </section>
    </div>
  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(Communities);

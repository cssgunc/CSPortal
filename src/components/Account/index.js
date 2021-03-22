import React from 'react';
import { withAuthorization } from '../Session';

import * as ROUTES from '../../constants/routes';

var Airtable = require('airtable');
const airtableKey = process.env.REACT_APP_AIRTABLE_API_KEY;
var base = new Airtable({apiKey: airtableKey}).base('appWPIPmVSmXaMhey');

function Account(props) {
  const { authUser } = props;

  // get record id 
  base('Directory').select({
    filterByFormula: `{Email} = "${authUser.email}"`
  }).eachPage(function page(records, fetchNextPage) {
    records.forEach(function(record) {
        console.log('Retrieved', record.id);
	    console.dir(record);  // show full record JS object
    })
  });
  
  return (
    <div>
      <section className="section is-white">
        <h1>Email: {authUser.email}</h1>
        <button
          className="button is-link"
          onClick={() => props.history.push(ROUTES.UPDATE_EMAIL)}
          type="button"
        >
          Change Email
        </button>
      </section>
    </div>
  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(Account);

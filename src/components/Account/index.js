import React from 'react';
import { withAuthorization } from '../Session';

import * as ROUTES from '../../constants/routes';

var Airtable = require('airtable');
const airtableKey = process.env.REACT_APP_AIRTABLE_API_KEY;
var base = new Airtable({apiKey: airtableKey}).base('appWPIPmVSmXaMhey');

function Account(props) {
  const { authUser } = props;

let user_info = [];

const getUserInfo = async function() {
  try {
    const records = await base('Directory').select({filterByFormula: `{Email} = "${authUser.email}"`}).all()
    let record = records[0]
    user_info.push({"id": record.id, "fields": record.fields});
    return user_info;
  } catch (e) {
    console.error(e)
  }
}

getUserInfo().then((data) => {
  let id = data.id;
  function updateFields(field, event){
    base('Directory').update([
    {
      "id": id,
      "fields": {
        // field: event (whatever input the user puts in)
      }
    }
    ])
  }

})  

  return (
    <div>
      <section className="section is-white">
        <h1>Email: {authUser.email}</h1>
        <button
          className="button is-link"
          onClick={() => props.history.push(ROUTES.UPDATE_EMAIL)}
          type="button">
          Change Email
        </button>
      </section>
    </div>
  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(Account);



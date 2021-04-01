import React, { useState, useEffect } from 'react';
import { withAuthorization } from '../Session';

import * as ROUTES from '../../constants/routes';

var Airtable = require('airtable');
const airtableKey = process.env.REACT_APP_AIRTABLE_API_KEY;
var base = new Airtable({apiKey: airtableKey}).base('appWPIPmVSmXaMhey');

function Account(props) {
  const { authUser } = props;

  const [userInfo, setUserInfo] = useState({
    id: "",
    fields: []
  });

  useEffect(() => {

      base('Directory').select({filterByFormula: `Email = "${authUser.email}"`}).
      firstPage(function(err, records) {
        if (err) { console.error(err); return; }
        records.forEach(function(record) {
            setUserInfo(userInfo => ({"id": record.id, "fields": record.fields}))
        });
    }, [props.fields]);

  })

  const onChangeField = (event) => {
    let field_name = event.target.className  // get field name
    let value = event.target.value;    // need to change to this value
    let field = "";

    switch(field_name){
      case 'input firstName': 
        field = "First Name";
        break;
      case 'input lastName':
        field = "Last Name"
        break;
      default:
        field = "";
    }


    // base('Directory').update([
    //   {
    //     "id": userInfo.id,
    //     "fields": {
    //       field: value
    //     }
    //   }
    // ], function(err, records) {
    //   if (err) {
    //     console.error(err);
    //     return;
    //   }
    //   records.forEach(function(record) {
    //     console.log(record.id);
    //   });
    // });
  };

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
        <div className="field">
    <label className="label">First Name</label>
    <div className="control">
      <input className="input firstName" type="text" onChange = {onChangeField} placeholder="Text input" defaultValue={userInfo.fields['First Name']}/> 
    </div>
    </div>
    </section>
      

    </div>
    
  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(Account);



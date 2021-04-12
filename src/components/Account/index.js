import React, { useState, useEffect } from 'react';
import { withAuthorization } from '../Session';

import * as ROUTES from '../../constants/routes';

var Airtable = require('airtable');
const airtableKey = process.env.REACT_APP_AIRTABLE_API_KEY;
var base = new Airtable({ apiKey: airtableKey }).base('appWPIPmVSmXaMhey');

function Account(props) {
  const { authUser } = props;

  const [userInfo, setUserInfo] = useState({
    id: "",
    fields: []
  });
  const [img, setImg] = useState(null);
  const [update, setUpdate] = useState(false); // better way to do this ?

  useEffect(() => {

    base('Directory').select({ filterByFormula: `Email = "${authUser.email}"` }).
      firstPage(function (err, records) {
        if (err) { console.error(err); return; }
        records.forEach(function (record) {
          setUserInfo(userInfo => ({ "id": record.id, "fields": record.fields }))
        });
      });

  }, [update, authUser.email])

  // const onSubmit = (event) => {
  //   let value = document.getElementsByClassName('input firstName')
  //   console.log(value)
  // }

  const handleChange = (event) => {
    setImg(event.target.files[0]);
  }

  const handleUpload = (event) => {
    event.preventDefault();
    props.firebase.doPfpUpload(img).then((snapshot) => {
      snapshot.ref.getDownloadURL().then((url) => {
        base('Directory').update([
          {
            "id": userInfo.id,
            "fields": {
              "Profile Picture": [
                {
                  "url": url
                }
              ]
            }
          }
        ], function (err, records) {
          if (err) {
            console.error(err);
            return;
          }
          setUpdate(!update);
          records.forEach(function (record) {
            console.log(record.id);
          });
        });
      });
    }
    );
  }

  const onChangeField = (event) => {
    let field_name = event.target.className  // get field name
    let value = event.target.value;    // need to change to this value
    let field = "";

    switch (field_name) {
      case 'input firstName':
        field = "First Name";
        break;
      case 'input lastName':
        field = "Last Name"
        break;
      default:
        field = "";
    }

    base('Directory').update([
      {
        "id": userInfo.id,
        "fields": {
          [field]: value
        }
      }
    ], function (err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function (record) {
        console.log(record.id);
      });
    });
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
            <input className="input firstName" type="text" placeholder="Text input" onChange={onChangeField} defaultValue={userInfo.fields['First Name']} />
          </div>
          {/* <div class="control">
  <button class="button is-primary" onClick= {onSubmit} >Submit</button>
</div> */}
        </div>
        <form onSubmit={handleUpload}>
          <input type="file" onChange={handleChange} />
          <button disabled={!img}>Upload</button>
        </form>
        <img src={userInfo.fields['Profile Picture'] != null ? userInfo.fields['Profile Picture'][0].url : null} alt=""></img>
      </section>


    </div>

  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(Account);



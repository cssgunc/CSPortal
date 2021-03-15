import React, { useState, useEffect } from 'react';
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';

import * as ROUTES from '../../constants/routes';

function Account(props) {
  const { authUser } = props;
  const [img, setImg] = useState(null);
  const [imgURL, setImgURL] = useState('');

  useEffect(() => {
    props.firebase.fetchPfpURL().then((url) => setImgURL(url)).catch((err) => setImgURL(''));
  });

  const handleChange = (event) => {
    setImg(event.target.files[0]);
  }

  const handleUpload = (event) => {
    event.preventDefault();
    props.firebase.doPfpUpload(img).then((snapshot) => {
      snapshot.ref.getDownloadURL().then((url) => setImgURL(url));
    }
    );
  }

  return (
    <div>
      <section className="section is-white">
        <h1>Hello {authUser.displayName}!</h1>
        <h1>Email: {authUser.email}</h1>

        <button
          className="button is-link"
          onClick={() => props.history.push(ROUTES.UPDATE_EMAIL)}
          type="button"
        >
          Change Email
        </button>

        <form onSubmit={handleUpload}>
          <input type="file" onChange={handleChange} />
          <button disabled={!img}>Upload</button>
        </form>
        <img src={imgURL} alt="" />
      </section>
    </div>
  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(withFirebase(Account));

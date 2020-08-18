import React from 'react';
import { withAuthorization } from '../Session';

function Directory() {
  return (
    <div>
      <section className="section is-white">
        <div className="container">
          <h4 className="title is-4">RTC Member Directory:</h4>
          <h5 className="title is-5">
            (No this is actually a Married at First Sight participant list{' '}
            <span role="img" aria-label=":P">
              😛
            </span>
            )
          </h5>
          <hr />
          <div className="card">
            <iframe
              title="RTCDirectoryAirtableView"
              className="airtable-embed airtable"
              src="https://airtable.com/embed/shrJwsY95Lra56HSu?backgroundColor=teal&viewControls=on"
              frameBorder="0"
              width="100%"
              height="533"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(Directory);

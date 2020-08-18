/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import 'bulma/css/bulma.css';

function Landing() {
  return (
    <div>
      <section className="section is-white">
        <div className="container">
          <h4 className="title is-4">
            Deployed through Firebase{' '}
            <span role="img" aria-label="check">
              ✅
            </span>
          </h4>
          <hr />
          <div className="card">
            <header className="card-header">
              <p className="card-content">
                This test project is being hosted on Firebase right now at{' '}
                <a href="https://rtctesting-2637c.web.app/">this link.</a> If we
                want to stick with Firebase, we can add RTC's{' '}
                <a href="https://firebase.google.com/docs/hosting/custom-domain">
                  custom domain later
                </a>{' '}
                and they will provide a SSL certification as well. Although, I
                have read that since Firebase has not been around that long,
                there may be some long term issues that we may not know about
                and it can get expensive. So I will also look into other hosting
                platforms.
              </p>
            </header>
          </div>
        </div>
      </section>
      <section className="section is-white">
        <div className="container">
          <h4 className="title is-4">
            Authenticated through Firebase{' '}
            <span role="img" aria-label="check">
              ✅
            </span>
          </h4>
          <hr />
          <div className="card">
            <ul className="list">
              <li className="list-item">
                Right now, I have configured a simple Email-Password
                authentication system through Firebase. Anyone can sign up and
                see the site.
              </li>
              <li className="list-item">
                For the RTC site, I'm thinking that we link the sign-up process
                through the member database in Airtable. So a person cannot sign
                up unless the email they are using is in the existing member
                database.
              </li>
              <li className="list-item">
                For the admins, we can either save each users data and
                permissions in the Firestore or make another spreadsheet on
                Airtable that only has the emails of the people allowed to be
                admins so we can crosscheck it there. The second one is like a
                hacky workaround for this but it might work lol.
              </li>
              <li className="list-item">
                The thing with Airtable is that for security purposes, we can
                only implement a read-only API because the authorization tokens
                are visible in the headers on the network section of the browser
                development tools, which is why I don't want to post user data
                from our website to Airtable.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Landing;

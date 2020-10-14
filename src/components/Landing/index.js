/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bulma/css/bulma.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Heading from '../General/Heading';
import ViewWithTopBorder from '../General/ViewWithTopBorder';
import colors from '../../constants/RTCColors';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'font-awesome/css/font-awesome.min.css';
import GoogleCalendar from '../General/GoogleCalendar';
import ScrollMenu from 'react-horizontal-scrolling-menu';

function Landing() {
  const airtableKey = process.env.REACT_APP_AIRTABLE_API_KEY;
  const calendarId =
    'rewritingthecode.org_kfhaeluivti168r0cbn5hj40qs@group.calendar.google.com';

  // all the announcements data is stored here
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.airtable.com/v0/appWPIPmVSmXaMhey/Announcements`, {
        headers: { Authorization: `Bearer ${airtableKey}` },
      })
      .then((result) => {
        setAnnouncements(result.data.records);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [airtableKey]);

  const styles = {
    view: {
      padding: '25px',
    },

    oppsSize: {
      height: '365px',
    },

    oppsHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '30px',
    },

    oppsLineHeight: {
      lineHeight: '30px',
    },

    oppsNav: {
      fontSize: '20px',
      paddingRight: '20px',
    },
  };

  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.airtable.com/v0/appWPIPmVSmXaMhey/Opportunities`, {
        headers: { Authorization: `Bearer ${airtableKey}` },
      })
      .then((result) => {
        setOpportunities(result.data.records);
        console.log(result.data.records);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [airtableKey]);

  // PLEASE READ:
  // to access the data for all the announcements, use the 'announcements' variable initialized above.
  // check out the structure of the data in your browser's console (in the developer tools).
  // check out the code below for an example of how to access and render the different variables.
  // use this link to see how the AirTable is set up:
  // https://airtable.com/invite/l?inviteId=invUlo8HaLCbPq2ZC&inviteToken=1be33a9d46def5811f63b756c370cbdec080b3d799521b6bc1ac99abb63d37a6
  // here's how you can access the different fields in the database:
  // (you need click the above link first and log into/create an account with Airtable before you can access this link):
  // https://airtable.com/appWPIPmVSmXaMhey/api/docs#curl/table:announcements

  return (
    <div>
      <section className="section is-white">
        <div className="columns is-variable is-6">
          <div className="column is-6">
            <ViewWithTopBorder color={colors.green}>
              <Heading>Calendar</Heading>
              <GoogleCalendar
          eventsColor={colors.lightGreen}
          calendarId={calendarId}
        />
            </ViewWithTopBorder>
          </div>
          <div className="column is-6">
            <div className="columns is-variable is-6">
              <div className="column">
                <ViewWithTopBorder
                  style={styles.oppsSize}
                  color={colors.darkBlue}
                >
                  <Heading>Announcements</Heading>
                  {announcements.slice(0, 10).map((user) => (
                    <div className="card" key={user.id}>
                      <header className="card-header">
                        <p className="card-content">
                          <strong>{user.fields.Title}</strong>
                          <br />
                          {user.fields.Content}
                        </p>
                      </header>
                    </div>
                  ))}
                </ViewWithTopBorder>
              </div>
            </div>
            <div className="columns is-variable is-2">
              <div className="column">
                <ViewWithTopBorder
                  style={styles.oppsSize}
                  color={colors.limeGreen}
                >
                  <div style={styles.oppsHeader}>
                    <div>
                      <Heading>Opportunities</Heading>
                    </div>
                    <div style={styles.oppsLineHeight}>
                      <a href="/" style={styles.oppsNav}>
                        See All
                      </a>
                      <a href="/">
                        <span className="icon">
                          <i className="fa fa-angle-left" aria-hidden="true" />
                        </span>
                      </a>
                      <a href="/">
                        <span className="icon">
                          <i className="fa fa-angle-right" aria-hidden="true" />
                        </span>
                      </a>
                    </div>
                  </div>
                  <div className="columns is-multiline">
            {opportunities.length === 0 ? (
              <div className="box">
                <div className="content">
                  <p>
                    <strong>No Opportunities yet! Check back later! </strong>
                  </p>
                </div>
              </div>
            ) : (
              opportunities
                .filter((role) => role.fields.Featured)
                .map((role) => (
                  <div className="column is-one-quarter">
                    <div className="box" key={role.id}>
                      <img
                        src={role.fields.CompanyLogo[0].thumbnails.small.url}
                        alt="Logo"
                      />
                      <div className="content">
                        <p>
                          <a id={role.id} href={`/opportunities/${role.id}`}>
                            <strong>{role.fields.Title}</strong>
                          </a>
                          <br />
                          {role.fields.CompanyName}
                          <br />
                          {role.fields.Location}
                          <br />
                          {role.fields.Start}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>
                  {/* <div className="tile is-ancestor">
                    <div className="tile is-parent">
                      <div className="tile is-child box">
                        <p className="title is-4">Opportunity</p>
                        <p className="subtitle is-6">image & info here</p>
                        <figure className="image is-4by3" />
                      </div>
                    </div>
                    <div className="tile is-parent">
                      <div className="tile is-child box">
                        <p className="title is-4">Opportunity</p>
                        <p className="subtitle is-6">image & info here</p>
                        <figure className="image is-4by3" />
                      </div>
                    </div>
                    <div className="tile is-parent">
                      <div className="tile is-child box">
                        <p className="title is-4">Opportunity</p>
                        <p className="subtitle is-6">image & info here</p>
                        <figure className="image is-4by3" />
                      </div>
                    </div>
                  </div> */}
                </ViewWithTopBorder>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Landing;

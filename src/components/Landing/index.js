/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import axios from "axios";
import "bulma/css/bulma.css";
import Heading from "../General/Heading";
import ViewWithTopBorder from "../General/ViewWithTopBorder";
import colors from "../../constants/RTCColors";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'font-awesome/css/font-awesome.min.css';

function Landing() {
  const airtableKey = process.env.REACT_APP_AIRTABLE_API_KEY;
  const calendarKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const calendarId =
    "rewritingthecode.org_kfhaeluivti168r0cbn5hj40qs@group.calendar.google.com";

  // all the announcements data is stored here
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);
  const localizer = momentLocalizer(moment);

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
      padding: "25px",
    },

    oppsSize: {
      height: "365px",
    },

    oppsHeader: {
      display: "flex",
      justifyContent: "space-between", 
      fontSize: "30px"
    },

    oppsLineHeight: {
      lineHeight: "30px"
    },

    oppsNav: {
      fontSize: "20px", 
      paddingRight: "20px"
    },
  };

  //To implement calendar 
  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${calendarKey}`
      )
      .then((result) => {
        setEvents(result.data.items);
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [calendarKey, calendarId]);

  // Formats events to suit React BigCalendar event objects
  const formattedEvents = events.map((obj) => {
    return {
      title: obj.summary,
      start: new Date(obj.start.dateTime.slice(0, 19)),
      end: new Date(obj.end.dateTime.slice(0, 19)),
      allDay: false,
      resource: null,
    };
  });

  // Edit styling for events in Calendar
  function eventStyleCreator(event, start, end, isSelected) {
    var style = {
      backgroundColor: "#CADDD1", // Light green from Figma calendar
      borderRadius: "0px",
      opacity: 0.8,
      color: "black",
      display: "block",
    };
    return {
      style: style,
    };
  }

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
              <Calendar
                localizer={ localizer }
                events={ formattedEvents }
                style={{ height: 650 }}
                eventPropGetter={ eventStyleCreator }
              />
            </ViewWithTopBorder>
          </div>
          <div className="column is-6">
            <div className="columns is-variable is-6">
              <div className="column">
                <ViewWithTopBorder style={styles.oppsSize} color={colors.darkBlue}>
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
            <div className="columns is-variable is-6">
              <div className="column">
                <ViewWithTopBorder style={styles.oppsSize} color={colors.limeGreen}>
                <div style={styles.oppsHeader}><div><Heading>Opportunities</Heading></div>
                <div style={styles.oppsLineHeight}>
                <a style={styles.oppsNav}>See All</a>
                <a><span className="icon"><i className="fa fa-angle-left" aria-hidden="true"></i></span></a>
                <a><span className="icon"><i className="fa fa-angle-right" aria-hidden="true"></i></span></a></div>
                </div>
                <div className="tile is-ancestor">
                  <div className="tile is-parent">
                    <div class="tile is-child box">
                      <p class="title is-4">Opportunity</p>
                      <p class="subtitle is-6">image & info here</p>
                      <figure class="image is-4by3">
                      </figure>
                    </div>
                  </div>
                  <div className="tile is-parent">
                    <div class="tile is-child box">
                      <p class="title is-4">Opportunity</p>
                      <p class="subtitle is-6">image & info here</p>
                      <figure class="image is-4by3">
                      </figure>
                    </div>
                  </div>
                  <div className="tile is-parent">
                    <div class="tile is-child box">
                      <p class="title is-4">Opportunity</p>
                      <p class="subtitle is-6">image & info here</p>
                      <figure class="image is-4by3">
                      </figure>
                    </div>
                  </div>
                </div>
                </ViewWithTopBorder>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="section is-white">
        <div className="container">
          <ViewWithTopBorder>
            <Heading>Announcements:</Heading>
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
      </section> 
      <section className="section is-white">
        <div className="container">
          <ViewWithTopBorder>
            <Heading>Deployed through Firebase</Heading>
            <p>
              This test project is being hosted on Firebase right now at{" "}
              <a href="https://rtctesting-2637c.web.app/">this link.</a> If we
              want to stick with Firebase, we can add RTC's{" "}
              <a href="https://firebase.google.com/docs/hosting/custom-domain">
                custom domain later
              </a>{" "}
              and they will provide a SSL certification as well. Although, I
              have read that since Firebase has not been around that long, there
              may be some long term issues that we may not know about and it can
              get expensive. So I will also look into other hosting platforms.
            </p>
          </ViewWithTopBorder>
        </div>
      </section>
      <section className="section is-white">
        <div className="container">
          <ViewWithTopBorder color={colors.darkBlue} style={styles.view}>
            <Heading>Authenticated through Firebase</Heading>
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
          </ViewWithTopBorder>
        </div>
      </section> */}
    </div> 
  );
}

export default Landing;

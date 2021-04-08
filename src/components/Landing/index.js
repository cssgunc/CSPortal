/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'font-awesome/css/font-awesome.min.css';
import { Link } from 'react-router-dom';
import Airtable from 'airtable';

import * as AIRTABLE from '../../constants/airtable';
import Heading from '../General/Heading';
import ViewWithTopBorder from '../General/ViewWithTopBorder';
import colors from '../../constants/RTCColors';
import GoogleCalendar from '../General/GoogleCalendar';
import * as ROUTES from '../../constants/routes';

function Landing() {
  const airtableKey = process.env.REACT_APP_AIRTABLE_API_KEY;
  const calendarId =
    'rewritingthecode.org_kfhaeluivti168r0cbn5hj40qs@group.calendar.google.com';

  // all the announcements data is stored here
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const updateAnnouncements = async () => {        
      let base = new Airtable({apiKey: airtableKey}).base(AIRTABLE.BASE_ID);

      let records = await base(AIRTABLE.ANNOUNCEMENTS_TABLE).select().all();

      setAnnouncements(records);
    }

    updateAnnouncements();
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

    oppsLogo: {
      width: '35%',
    },

    internal: {
      width: '43%',
      height: '100%',
      display: 'inline-block',
    },

    center: {
      overflow: 'hidden',
      height: '270px',
      whiteSpace: 'nowrap',
    },

    fullWidth: {
      width: '100%',
    },

    fullWidthHeight: {
      width: '100%',
      height: '100%',
    },

    wordBreak: {
      whiteSpace: 'pre-line',
    },

    location: {
      paddingRight: '6px',
      fontSize: '20px',
    },
  };

  // creates start date button graphic/color
  const StartDate = (startDate) => {
    const dateDiv = document.createElement('div');
    let dateButton;
    dateDiv.className = 'start-date';
    dateDiv.style.display = 'flex-wrap';
    // added this just bc our data rn has some areas that aren't filled out, will delete later when data comprehensive
    if (startDate === undefined) {
      return;
    }

    for (let i = 0; i < startDate.length; i += 1) {
      if (startDate[i].includes('Fall')) {
        dateButton = document.createElement('button');
        dateButton.className = 'button is-rounded is-small';
        dateButton.style.backgroundColor = '#DDAA9A';
        dateButton.style.color = 'white';
        dateButton.style.margin = '5px';
        dateButton.style.border = 'none';
        dateButton.innerText = startDate[i];
        dateDiv.appendChild(dateButton);
      } else if (startDate[i].includes('Spring')) {
        dateButton = document.createElement('button');
        dateButton.className = 'button is-rounded is-small';
        dateButton.style.backgroundColor = '#DDAA9A';
        dateButton.style.color = 'white';
        dateButton.style.margin = '5px';
        dateButton.style.border = 'none';
        dateButton.innerText = startDate[i];
        dateDiv.appendChild(dateButton);
      } else if (startDate[i].includes('Summer')) {
        dateButton = document.createElement('button');
        dateButton.className = 'button is-rounded is-small';
        dateButton.style.backgroundColor = '#9ACBDD';
        dateButton.style.color = 'white';
        dateButton.style.margin = '5px';
        dateButton.style.border = 'none';
        dateButton.innerText = startDate[i];
        dateDiv.appendChild(dateButton);
      }
    }

    return { __html: dateDiv.outerHTML };
  };

  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    const updateOpportunities = async () => {        
      let base = new Airtable({apiKey: airtableKey}).base(AIRTABLE.BASE_ID);

      let records = await base(AIRTABLE.OPPORTUNITIES_TABLE).select().all();

      setOpportunities(records);
    }

    updateOpportunities();
  }, [airtableKey]);

  // implements scrolling
  function scrollLeft(element, change, duration) {
    const start = element.scrollLeft;
    let currentTime = 0;
    const increment = 20;

    function animateScroll() {
      currentTime += increment;
      const val = Math.easeInOutQuad(currentTime, start, change, duration);
      element.scrollLeft = val;
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    }
    animateScroll();
  }

  // corresponds respective button to left/right scrolling movement
  function scrollLeftArrow() {
    scrollLeft(document.getElementById('content'), -300, 1000);
  }

  function scrollRightArrow() {
    scrollLeft(document.getElementById('content'), 300, 1000);
  }
  // calculates how much the div should scroll when left/right arrow is pressed
  Math.easeInOutQuad = function (currentTime, startValue, change, duration) {
    currentTime /= duration / 2;
    if (currentTime < 1)
      return (change / 2) * currentTime * currentTime + startValue;
    currentTime -= 1;
    return (-change / 2) * (currentTime * (currentTime - 2) - 1) + startValue;
  };

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
              <div className="column" style={styles.fullWidth}>
                <ViewWithTopBorder
                  style={styles.oppsSize}
                  color={colors.limeGreen}
                >
                  <div style={styles.oppsHeader}>
                    <div>
                      <Link to={`${ROUTES.OPPORTUNITIES}`}>
                        {' '}
                        <Heading>Opportunities</Heading>{' '}
                      </Link>
                    </div>
                    <div style={styles.oppsLineHeight}>
                      <Link
                        style={styles.oppsNav}
                        to={`${ROUTES.OPPORTUNITIES}`}
                      >
                        {' '}
                        See All{' '}
                      </Link>
                      <a id="left-arrow" onClick={scrollLeftArrow}>
                        <span id="left-arrow" className="icon">
                          <i className="fa fa-angle-left" aria-hidden="true" />
                        </span>
                      </a>
                      <a id="right-arrow" onClick={scrollRightArrow}>
                        <span id="right-arrow" className="icon">
                          <i className="fa fa-angle-right" aria-hidden="true" />
                        </span>
                      </a>
                    </div>
                  </div>
                  <div id="content" className="columns" style={styles.center}>
                    {opportunities.length === 0 ? (
                      <div className="box">
                        <div className="content">
                          <p>
                            <strong>
                              No Opportunities yet! Check back later!{' '}
                            </strong>
                          </p>
                        </div>
                      </div>
                    ) : (
                      opportunities
                        .filter((role) => role.fields)
                        .map((role) => (
                          <div
                            className="column is-one-third"
                            style={styles.internal}
                          >
                            <div
                              className="box"
                              key={role.id}
                              style={styles.fullWidthHeight}
                            >
                              <img
                                style={styles.oppsLogo}
                                src={
                                  role.fields.CompanyLogo[0].thumbnails.large
                                    .url
                                }
                                alt="Logo"
                              />
                              <div className="content">
                                <p style={styles.wordBreak}>
                                  <Link
                                    to={`${ROUTES.OPPORTUNITIES}/${role.id}`}
                                  >
                                    {' '}
                                    <strong>{role.fields.Title}</strong>{' '}
                                  </Link>
                                  <br />
                                  {role.fields.CompanyName}
                                  <br />
                                  <i
                                    className="fa fa-map-marker"
                                    style={styles.location}
                                  />
                                  {role.fields.Location}
                                  <br />
                                  <div
                                    dangerouslySetInnerHTML={StartDate(
                                      role.fields.Start,
                                    )}
                                  />
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                    )}
                  </div>
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

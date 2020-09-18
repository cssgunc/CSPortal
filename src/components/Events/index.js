import React, { useState, useEffect } from 'react';
import { withAuthorization } from '../Session';
import Heading from '../General/Heading';
import ViewWithTopBorder from '../General/ViewWithTopBorder';
import axios from 'axios';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'

function Events() {
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const calendarId = "rewritingthecode.org_kfhaeluivti168r0cbn5hj40qs@group.calendar.google.com";
  const [events, setEvents] = useState([]);
  const localizer = momentLocalizer(moment);

  useEffect(() => {
    axios 
      .get(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}`,
      )
      .then((result) => {
        setEvents(result.data.items);
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [apiKey, calendarId]);

  return (
    <div>
      <ViewWithTopBorder>
      <section>
        <Heading>Calendar</Heading>
      </section>
      <div>
        <Calendar
          localizer = {localizer}
          // TODO: FORMAT events for BigCalendar
          // TODO: Use another Calendar framework that includes description + time too
          events={events}
          style={{height: 500}}
        />
      </div>
      </ViewWithTopBorder>
    </div>
  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(Events);

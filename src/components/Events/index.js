import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withAuthorization } from '../Session';
import Heading from '../General/Heading';
import ViewWithTopBorder from '../General/ViewWithTopBorder';
import colors from '../../constants/RTCColors';
import GoogleCalendar from '../General/GoogleCalendar';

function Events() {
  const airtableKey = process.env.REACT_APP_AIRTABLE_API_KEY;
  // stores Google Calendar ID
  const [calendarId, setCalendarId] = useState('');

  useEffect(() => {
    axios
      .get(`https://api.airtable.com/v0/appWPIPmVSmXaMhey/MasterLinks`, {
        headers: { Authorization: `Bearer ${airtableKey}` },
      })
      .then((result) => {
        setCalendarId(
          result.data.records.filter(
            (obj) => obj.fields.Name === 'EventsCalendar',
          )[0].fields.Link,
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, [airtableKey]);

  return (
    <div className="column">
      <ViewWithTopBorder color={colors.green}>
        <section>
          <Heading>Calendar</Heading>
        </section>
        <GoogleCalendar
          eventsColor={colors.lightGreen}
          calendarId={calendarId}
        />
      </ViewWithTopBorder>
    </div>
  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(Events);

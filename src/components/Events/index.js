import React, { useState, useEffect } from 'react';
import Airtable from 'airtable';

import * as AIRTABLE from '../../constants/airtable';
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
    const updateCalendar = async () => {
      let base = new Airtable({apiKey: airtableKey}).base(AIRTABLE.BASE_ID);

      let records = await base(AIRTABLE.MASTERLINKS_TABLE).select({
        maxRecords: 1,
        filterByFormula: "{Name} = 'EventsCalendar'"
      }).all();

      setCalendarId(records[0].fields.Link);
    }

    updateCalendar();
  }, [airtableKey]);

  return (
    <div className="container column">
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

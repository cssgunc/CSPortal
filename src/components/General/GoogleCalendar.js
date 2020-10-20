import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import colors from '../../constants/RTCColors';

export default function GoogleCalendar(props) {
  const {
    eventsColor,
    apiKey = process.env.REACT_APP_GOOGLE_API_KEY,
    calendarId,
  } = props;
  const [events, setEvents] = useState([]); // Array of Event objects stored here
  const localizer = momentLocalizer(moment); // Localizer to account for international number/date format differences

  useEffect(() => {
    if (calendarId !== "") {
    axios
      .get(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}`,
      )
      .then((result) => {
        setEvents(result.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }, [apiKey, calendarId]);

  // Formats events to match React BigCalendar event objects
  const formattedEvents = events.map((obj) => {
    return {
      title: obj.summary,
      start: new Date(obj.start.dateTime.slice(0, 19)),
      end: new Date(obj.end.dateTime.slice(0, 19)),
      allDay: false,
      resource: null,
    };
  });

  // Edit styling for Events in the Calendar
  const eventStyleCreator = () => {
    const style = {
      backgroundColor: eventsColor ?? colors.lightGreen,
      borderRadius: '0px',
      opacity: 0.8,
      color: 'black',
    };
    return {
      style,
    };
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={formattedEvents}
        style={{ height: 650 }}
        eventPropGetter={eventStyleCreator}
      />
    </div>
  );
}

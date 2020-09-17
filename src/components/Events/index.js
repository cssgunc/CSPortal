import React from 'react';
import { withAuthorization } from '../Session';
import Heading from '../General/Heading';
import ViewWithTopBorder from '../General/ViewWithTopBorder';

function Events() {
  return (
    <div>
      <ViewWithTopBorder>
      <section>
        <Heading>Calendar</Heading>
      </section>
      <div>
      <iframe
              title="RTCDirectoryAirtableView"
              className="airtable-embed"
              src="https://calendar.google.com/calendar/embed?src=rewritingthecode.org_kfhaeluivti168r0cbn5hj40qs%40group.calendar.google.com&ctz=America%2FNew_York"
              frameBorder="0"
              width="100%"
              height="533"
            />
      </div>
      </ViewWithTopBorder>
    </div>
  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(Events);

import React from 'react';
import { withAuthorization } from '../Session';
import Heading from '../General/Heading';

function Events() {
  return (
    <div>
      <section className="section is-white">
        <Heading>Events</Heading>
      </section>
    </div>
  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(Events);

import React from 'react';
import { withAuthorization } from '../Session';
import Heading from '../General/Heading';

function MeetTheTeam() {
  return (
    <div>
      <section className="section is-white">
        <Heading>Meet the Team</Heading>
      </section>
    </div>
  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(MeetTheTeam);

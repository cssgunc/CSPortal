import React from 'react';
import { withAuthorization } from '../Session';
import Heading from '../General/Heading';

function FellowshipGuide() {
  return (
    <div>
      <section className="section is-white">
        <Heading>Fellowship Guide</Heading>
      </section>
    </div>
  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(FellowshipGuide);

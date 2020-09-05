import React from 'react';
import { withAuthorization } from '../Session';
import Heading from '../General/Heading';

function Webinars() {
  return (
    <div>
      <section className="section is-white">
        <Heading>Webinars</Heading>
      </section>
    </div>
  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(Webinars);

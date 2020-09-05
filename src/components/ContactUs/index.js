import React from 'react';
import { withAuthorization } from '../Session';
import Heading from '../General/Heading';

function ContactUs() {
  return (
    <div>
      <section className="section is-white">
        <Heading>Contact Us</Heading>
      </section>
    </div>
  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(ContactUs);

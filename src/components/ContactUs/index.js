import React, { useEffect } from 'react';
import axios from 'axios';
import { withAuthorization } from '../Session';
import Heading from '../General/Heading';

function ContactUs() {
  useEffect(() => {
    console.log('function called');
    axios
      .post(
        `https://us-central1-rtcportal-f1b6d.cloudfunctions.net/emailMessage`,
        {
          name: 'Bob',
          email: 'calciumphosphate0@gmail.com',
          phone: '9841234567',
          message: 'hi',
        },
      )
      .then(() => {
        console.log('email sent!');
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

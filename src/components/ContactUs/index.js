import React,{useEffect} from 'react';
import { withAuthorization } from '../Session';
import Heading from '../General/Heading';
import axios from 'axios';





function ContactUs() {
  useEffect(() => {
    console.log("function called");
    // CLOUD FUNCTIONS WAY:
    // TODO: ADD AUTHENTICATION HEADER TO THIS REQUEST
    axios
      .get(
        `https://us-central1-rtcportal-f1b6d.cloudfunctions.net/emailMessage`,{
        params: {name: 'Bob',email:'calciumphosphate0@gmail.com',phone:'9841234567',message:'hi'}
        })
      .then((result) => {
console.log("email sent!")
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

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
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { withAuthorization } from '../Session';
import Heading from '../General/Heading';
import ViewWithTopBorder from '../General/ViewWithTopBorder';

function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  const onSubmit = (event) => {
    // add call to firebase function to send email here
    // access details with name, email, and message variables
    console.log(name, email, message);
    if (error) {
      setError(error);
    }
    event.preventDefault();
  };

  const onChangeName = (event) => {
    setName(event.target.value);
  };
  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const onChangeMessage = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div>
      <section className="section is-white">
        <div className="container">
          <ViewWithTopBorder>
            <Heading>Contact Us:</Heading>
            <form onSubmit={onSubmit}>
              <div className="field">
                <label className="label">Full Name: </label>
                <div className="control">
                  <input
                    className="input is-rounded"
                    name="name"
                    value={name}
                    onChange={onChangeName}
                    type="text"
                    placeholder="Full Name"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Email: </label>
                <div className="control">
                  <input
                    className="input is-rounded"
                    name="email id"
                    value={email}
                    onChange={onChangeEmail}
                    type="text"
                    placeholder="Email Address"
                  />
                </div>
              </div>
              <div className="field">
                <label className="field">Message: </label>
                <div className="control">
                  <textarea
                    className="textarea is-rounded is-large"
                    name="message"
                    value={message}
                    onChange={onChangeMessage}
                    type="text"
                    placeholder="Message Goes Here!"
                  />
                </div>
              </div>
              <div className="field is-grouped">
                <div className="control">
                  <button type="submit" className="button is-link is-outlined">
                    Submit
                  </button>
                </div>
                <div className="control">
                  <button type="button" className="button is-light">
                    Cancel
                  </button>
                </div>
              </div>
            </form>

            {error && (
              <article className="message is-warning">
                <div className="message-body">{error.message}</div>
              </article>
            )}
          </ViewWithTopBorder>
        </div>
      </section>
    </div>
  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(ContactUs);

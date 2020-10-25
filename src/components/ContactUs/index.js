import { withAuthorization } from '../Session';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bulma/css/bulma.css';
import Heading from '../General/Heading';
import ViewWithTopBorder from '../General/ViewWithTopBorder';
import colors from '../../constants/RTCColors';

function ContactUs() {
  return (
    <div>
      <section className="section is-white">
        <div className="container">
          <ViewWithTopBorder>
            <Heading>Contact Us:</Heading>
            <div class = "field">
              <label class ="label">Full Name: </label>
              <div class = "control">
                <input class = "input is-rounded" type = "text" placeholder= "Full Name"></input>
              </div>
            </div>
            <div class = "field">
              <label class ="label">Email: </label>
              <div class = "control">
                <input class = "input is-rounded" type = "text" placeholder ="Email Address"></input>
              </div>
            </div>
            <div class = "field">
              <label class ="field">Message: </label>
              <div class = "control">
                <textarea class = "textarea is-rounded is-large" type = "text" placeholder ="Message Goes Here!"></textarea>
              </div>
            </div>
            <div class="field is-grouped">
              <div class="control">
                <button class="button is-link is-outlined">Submit</button>
              </div>
            <div class="control">
              <button class="button is-light">Cancel</button>
            </div>
            </div>
          </ViewWithTopBorder>
        </div>
      </section>
    </div>
  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(ContactUs);

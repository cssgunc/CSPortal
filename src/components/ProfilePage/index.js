import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import { withAuthorization } from '../Session';
import Heading from '../General/Heading';
import ViewWithTopBorder from '../General/ViewWithTopBorder';
import colors from '../../constants/RTCColors';

function ProfilePage() {
  const styles = {
 
  };

  return (
    <div>
      <section className="section is-white">
        <ViewWithTopBorder color={colors.darkBlue}>
          <Heading>Profile</Heading>
        </ViewWithTopBorder>
      </section>
    </div>
  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(ProfilePage);
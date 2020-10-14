import React from 'react';
import { withAuthorization } from '../Session';

function Account(props) {
  const { authUser } = props;
  return (
    <div>
      <section className="section is-white">
        <h1>Account: {authUser.email}</h1>
      </section>
    </div>
  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(Account);

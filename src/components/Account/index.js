import React from 'react';
import { withAuthorization } from '../Session';

import * as ROUTES from '../../constants/routes';

function Account(props) {
  const { authUser } = props;
  return (
    <div>
      <section className="section is-white">
        <h1>Email: {authUser.email}</h1>
        <button
          className="button is-link"
          onClick={() => props.history.push(ROUTES.UPDATE_EMAIL)}
          type="button"
        >
          Change Email
        </button>
      </section>
    </div>
  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(Account);

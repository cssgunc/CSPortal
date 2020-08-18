/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import AuthUserContext from './context';

const withAuthorization = (condition) => (Component) => {
  function WithAuthorization(props) {
    useEffect(() => {
      const listener = props.firebase.auth.onAuthStateChanged((authUser) => {
        if (!condition(authUser)) {
          props.history.push(ROUTES.SIGN_IN);
        }
      });

      return function cleanup() {
        listener();
      };
    });

    const authUser = useContext(AuthUserContext);
    return condition(authUser) ? (
      <Component {...props} authUser={authUser} />
    ) : null;
  }

  return withRouter(withFirebase(WithAuthorization));
};

export default withAuthorization;

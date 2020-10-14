import React from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';

import * as ROUTES from '../../constants/routes';

const styles = {
  form: {
    width: '50%',
    margin: 'auto',
    minWidth: '300px',
  },
};

const VerifyPage = () => {
  return (
    <div>
      <section className="section is-gray">
        <div className="card" style={styles.form}>
          <div className="card-content">
            <VerifyPageBase />
          </div>
        </div>
      </section>
    </div>
  );
};

function VerifyPageForm(props) {
  return (
    <div>
      <p>Please verify your email!</p>
      <br />
      <div>
        <button
          className="button is-link"
          onClick={() => props.history.push(ROUTES.SIGN_IN)}
          type="button"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

const VerifyPageBase = withRouter(withFirebase(VerifyPageForm));

export default VerifyPage;

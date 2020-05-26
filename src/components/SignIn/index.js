import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from "../Firebase"
import { SignUpLink } from "../SignUp"
 
import * as ROUTES from '../../constants/routes';
 
const SignInPage = () => (
  <div>
    <section className="section is-gray">
      <div className="card sign-form">
        <div className="card-content">
        <SignInForm />
        <SignUpLink />
        </div>
      </div>
    </section>
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};
 
class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = {...INITIAL_STATE}
  }
 
  onSubmit = event => {
    const {email, password} = this.state;
    this.props.firebase
    .doSignInWithEmailAndPassword(email, password)
    .then(() => {
      this.setState({...INITIAL_STATE});
      this.props.history.push(ROUTES.LANDING);
      console.log("logged in");
    })
    .catch(error => {this.setState({error})})

    event.preventDefault();
  }
 
  onChange = event => {
    this.setState({[event.target.name]: event.target.value})
  };
 
  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === ''

    return (
      <form onSubmit={this.onSubmit}>
        <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input 
              className="input"
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
              placeholder="Email Address"/>
            </div>
          </div>

          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input 
              className="input"
              name="password"
              value={password}
              onChange={this.onChange}
              type="password"
              placeholder="Enter Password"/>
            </div>
          </div>
          
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link" disabled={isInvalid} type="submit">Sign In</button>
            </div>
          </div>
 
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInForm = withRouter(withFirebase(SignInFormBase))
 
export default SignInPage;
 
export { SignInForm };
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from "../Firebase";
// import axios from 'axios';
 
import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
  <div>
    <section className="section is-gray">
      <div className="card sign-form">
        <div className="card-content">
        <SignUpForm />
        </div>
      </div>
    </section>
  </div>
  
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};
 
class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = {...INITIAL_STATE}
  }
 
  onSubmit = event => {
    const {email, passwordOne} = this.state;
    this.props.firebase
    .doCreateUserWithEmailAndPassword(email, passwordOne)
    .then(authUser => {
      this.setState({...INITIAL_STATE});
      this.props.history.push(ROUTES.LANDING);
      console.log("success");
    })
    .catch(error => {this.setState({error})})

    event.preventDefault();
  }
 
  onChange = event => {
    this.setState({[event.target.name]: event.target.value})
  };
 
  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit}>
          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input 
              className="input"
              name="username"
              value={username}
              onChange={this.onChange}
              type="text"
              placeholder="Full Name"/>
            </div>
          </div>

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
              name="passwordOne"
              value={passwordOne}
              onChange={this.onChange}
              type="password"
              placeholder="Password"/>
            </div>
          </div>

          <div className="field">
            <label className="label">Confirm Password</label>
            <div className="control">
              <input 
              className="input"
              name="passwordTwo"
              value={passwordTwo}
              onChange={this.onChange}
              type="password"
              placeholder="Confirm Password"/>
            </div>
          </div>
          
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link" disabled={isInvalid} type="submit">Sign Up</button>
            </div>
          </div>
 
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpForm = withRouter(withFirebase(SignUpFormBase))
 
const SignUpLink = () => (
  <div style={{textAlign: 'center'}}>
    <br/>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </div>
);

export default SignUpPage;
 
export { SignUpForm, SignUpLink };
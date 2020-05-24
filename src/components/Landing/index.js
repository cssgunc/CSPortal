import React, {Component} from 'react';
import './Landing.css';
import axios from 'axios';
import 'bulma/css/bulma.css';

export const airtableKey = process.env.REACT_APP_AIRTABLE_API_KEY;

class Landing extends Component {

  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount(){
    axios.get(`https://api.airtable.com/v0/app4bBP7ysJFDeHQk/MarriedatFirstSightStats?api_key=${airtableKey}`)
    .then(result => {
      this.setState({data: result.data.records});
    })
    .catch(error => {console.log(error)})
  }

  render () {
    return (
    <div className="App">
      <section className="hero is-medium is-primary is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              CS+SG: Rewriting the Code
            </h1>
            <h2 className="subtitle">
              Testing the Tech Stack
            </h2>
          </div>
        </div>
      </section>
      <section class="section">
      <div className="container">
      <h4 className="title is-4">Links to Airtable as a Database <span role="img" aria-label="check">✅</span></h4>
      <hr/>
      {this.state.data.slice(0,10).map(user =>
        <div className="card" key={user.id}>
          <header className="card-header">
            <p className="card-content">
              {user.fields.Name} | 
              Season: {user.fields.Season} | 
              Location: {user.fields.Location} | 
              Status: {user.fields.Status}
            </p>
          </header>
        </div>
      )}
      </div>
      </section>
      <section class="section">
      <div className="container">
        <h4 className="title is-4">Embeds Airtable as a view <span role="img" aria-label="check">✅</span></h4>
        <hr/>
        <iframe title="RTCTestingAirtableView" className="airtable-embed airtable" src="https://airtable.com/embed/shr8VpOlIzRJGScYC?backgroundColor=teal" frameBorder="0" width="100%" height="533"></iframe>
      </div>
      </section>
      <section class="section">
      <div className="container">
        <h4 className="title is-4">Deployed through Firebase <span role="img" aria-label="check">✅</span></h4>
        <hr/>
        <div className="card">
          <header className="card-header">
            <p className="card-content">
              This test project is being hosted on Firebase right now at <a href="https://rtctesting-2637c.web.app/">this link.</a> If we want to stick with Firebase, we can add RTC's <a href="https://firebase.google.com/docs/hosting/custom-domain">custom domain later</a> and they will provide a SSL certification as well. Although, I have read that since Firebase has not been around that long, there may be some long term issues that we may not know about and it can get expensive. So I will also look into other hosting platforms.
            </p>
          </header>
        </div>
      </div>
      </section>
    </div>
  )}
}

export default Landing;
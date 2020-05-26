import React, {Component} from 'react';
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
    axios.get(`https://api.airtable.com/v0/app4bBP7ysJFDeHQk/MarriedatFirstSightStats`,
    {headers: {Authorization: `Bearer ${airtableKey}`}})
    .then(result => {
      this.setState({data: result.data.records});
      axios.post(`https://api.airtable.com/v0/app4bBP7ysJFDeHQk/Users`, {fields: {Name: "Rupali"}}, {headers:{Authorization: `Bearer ${airtableKey}`, "Content-Type": "application/json"}})
        .then(result => {console.log(result)})
        .catch(error => {console.log(error)})
    })
    .catch(error => {console.log(error)})
  }

  render () {
    return (
    <div>
      <section className="section is-white">
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
      <section className="section is-white">
      <div className="container">
        <h4 className="title is-4">Embeds Airtable as a view <span role="img" aria-label="check">✅</span></h4>
        <hr/>
        <div className="card">
        <iframe title="RTCTestingAirtableView" class="airtable-embed airtable" src="https://airtable.com/embed/shrJwsY95Lra56HSu?backgroundColor=teal&viewControls=on" frameborder="0" width="100%" height="533"></iframe>
        </div>
      </div>
      </section>
      <section className="section is-white">
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
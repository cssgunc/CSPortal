import React, {Component} from 'react';
import './App.css';
// import * as firebase from "firebase/app";
import axios from 'axios';

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

export const airtableKey = process.env.REACT_APP_API_KEY;

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      users: []
    }
  }

  componentDidMount(){
    axios.get(`https://api.airtable.com/v0/app4bBP7ysJFDeHQk/Users?api_key=${airtableKey}`)
    .then(result => {
      this.setState({users: result.data.records});
    })
    .catch(error => {console.log(error)})
  }

  render () {
    return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and hi to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <ul>
        {this.state.users.map(user => <li>{user.fields.Name}</li>)}
      </ul>
      <iframe title="RTCTestingAirtableView" className="airtable-embed airtable" src="https://airtable.com/embed/shr8VpOlIzRJGScYC?backgroundColor=teal" frameborder="0" onmousewheel="" width="100%" height="533"></iframe>
    </div>
  )}
}

export default App;
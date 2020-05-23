import React, {Component} from 'react';
import './App.css';
import axios from 'axios';

export const airtableKey = process.env.REACT_APP_API_KEY;

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      users: []
    }
  }

  componentDidMount(){
    axios.get(`https://api.airtable.com/v0/app4bBP7ysJFDeHQk/MarriedatFirstSightStats?api_key=keycRgSqJzorAUJO0`)
    // .then(result => result.json())
    .then(result => {
      console.log(result)
      this.setState({users: result.data.records});
    })
    .catch(error => {console.log(error)})
  }

  render () {
    console.log(this.state)
    return (
    <div className="App">
      <ul>
        {this.state.users.map(user => <li>{user.fields.Name}</li>)}
      </ul>
      <iframe title="RTCTestingAirtableView" className="airtable-embed airtable" src="https://airtable.com/embed/shr8VpOlIzRJGScYC?backgroundColor=teal" frameborder="0" onmousewheel="" width="100%" height="533"></iframe>
    </div>
  )}
}

export default App;
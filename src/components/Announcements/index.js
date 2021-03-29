import React, { useState, useEffect } from "react";
import axios from "axios";
import { withAuthorization } from "../Session";
import Popup from "./Popup";
import Modali, { useModali } from 'modali';


import Loading from "../General/Loading";
import { withFirebase } from "../Firebase";
import { parseJSON, format } from 'date-fns'
import { id } from "date-fns/locale";
import { user } from "firebase-functions/lib/providers/auth";

function Announcements() {
  const airtableKey = process.env.REACT_APP_AIRTABLE_API_KEY;
  const googleKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const playlistId = "PL8zglt-LDl-iywBxcoGUoG-Sh0_1IaoQJ";
  const [webinars, setWebinars] = useState([]);
  const [data, setData] = useState([]);

  const [dataLoaded, setDataLoaded] = useState(false);
  const [webinarsLoaded, setWebinarsLoaded] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // TODO: Try to set an array of states so not all shows pop-up
  // const [showPopup, setShowPopup] = useState([]);
  const [exampleModal, toggleExampleModal] = useModali({
    large: true,
  });
  const [popUpText, setPopUpText] = useState([]);
  // var popUpText = "";
  
  const toggleFunc = (title, time, content) => {
    setPopUpText([title, time, content]);
    toggleExampleModal();
  }
  // const resetPopup = () => {
  //   setShowPopup(prevItems => [{
  //     id: prevItems.length,
  //     value: false
  //   }]);
  // }
  const togglePopup = event => {
    setShowPopup(!showPopup);
  }
 
  // const togglePopup = event => {
  //   event.preventDefault();
  //   setShowPopup([
  //     ...showPopup,
  //     [event.target.id]: event.target.value
  //   ]);
  // };
  

  useEffect(() => {
    // CLOUD FUNCTIONS WAY:
    // TODO: ADD AUTHENTICATION HEADER TO THIS REQUEST
    axios
      .get(`https://us-central1-csportal-c8c72.cloudfunctions.net/getData`, {
        params: { urlType: "Announcements" },
      })
      .then((result) => {
        setData(result.data.message.records);
        setDataLoaded(true);
        setShowPopup([...false]);
      })
      .catch((error) => {
        console.log(error);
        setDataLoaded(true);
      });

    // NORMAL WAY:
    // axios
    //   .get(`https://api.airtable.com/v0/appWPIPmVSmXaMhey/Announcements`, {
    //     headers: { Authorization: `Bearer ${airtableKey}` },
    //   })
    //   .then((result) => {
    //     setData(result.data.records);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // CLOUD FUNCTIONS WAY:
    // TODO: ADD AUTHENTICATION HEADER TO THIS REQUEST
    axios
      .get(`https://us-central1-csportal-c8c72.cloudfunctions.net/getWebinars`)
      .then((result) => {
        setWebinars(result.data.message.items);
        setWebinarsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setWebinarsLoaded(true);
      });

    // NORMAL WAY:
    // axios
    //   .get(
    //     `https://www.googleapis.com/youtube/v3/playlistItems?key=${googleKey}&part=snippet&playlistId=${playlistId}&maxResults=50`,
    //   )
    //   .then((result) => {
    //     setWebinars(result.data.items);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, [airtableKey, googleKey, playlistId]);

  const styles = {
    loadingContainer: {
      padding: "20px",
    },
    loadingImage: {
      padding: "10px",
    },
  };

  return (
    <div>
      <section className="section is-white">
        <div className="container">
          <h4 className="title is-4">
            Announcements:
          </h4>
          <button onClick={toggleExampleModal}>
            Click me to open a basic modal
          </button>
          
          {/* <button className="button-default" onClick={toggle}>Show Modal</button>
          <Modal
            isShowing={isShowing}
            hide={toggle}
          /> */}
          <hr />
          {dataLoaded ? (
            data.slice(0, 10).map((user) => (
              <div className="card" key={user.id}>
                <header className="card-header">
                  <p className="card-content">
                    <strong style={{ paddingTop: '10px', 
                                    fontSize: '30px', 
                                    color: 'black' }}
                            
                            onClick={() => toggleFunc(user.fields.Title, 
                              format(parseJSON(user.fields.Date), 'PPPP'), 
                              user.fields.Content)}
                            > 
                            {user.fields.Title} 
                            
                    </strong>
                    <Modali.Modal {...exampleModal}>
                      <strong strong style={{ padding: '20px', 
                                    paddingLeft: '30px',
                                    paddingRight: '30px',
                                    fontSize: '40px', 
                                    }}>
                        {popUpText[0]}
                      </strong>
                      <p strong style={{ padding: '20px', 
                                    paddingLeft: '30px',
                                    paddingRight: '30px',
                                    fontSize: '15px', 
                                    }}>
                        {popUpText[1]}
                      </p>
                      <p strong style={{ padding: '20px', 
                                    paddingLeft: '30px',
                                    paddingRight: '30px',
                                    fontSize: '20px', 
                                    }}>
                        {popUpText[2]}
                      </p>
                    </Modali.Modal>
                    {/* // TODO: implement an array of showPopup states
                      {showPopup ?
                        <Popup
                          text='Click "Close Button" to hide popup'
                          closePopup={togglePopup.bind(this)}
                        />
                        : null
                      } */}
                    
                    <br />
                    <p style={{ paddingTop: '10px', 
                                    fontSize: '15px', 
                                    color: 'black' }}
                                    >
                    {/* {user.fields.Date.split("T",1)} */}
                    {format(parseJSON(user.fields.Date), 'PPPP')}
                    </p>
                    
                    <br />
                    <p style={{ fontSize: '20px',
                                paddingBottom:'20px'}}>
                    {user.fields.Content}  </p>
                                      
                    {/* {user.fields.PostedByImage !== undefined
                      ? user.fields.PostedByImage.replace('watch?v=', 'embed/').split(
                        '&',
                      )[0]
                    : null} */}
                  </p>
                </header>
                
              </div>
            ))
          ) : (
            // you can also add a "width" property that sets how wide it will be
            // you can set the styles for the container with the "containerStyle" property
            // and set any other styles for the loading image itself with the "style" property
            // see dummy example below
            <Loading />
          )}
        {/* <Modali.Modal {...exampleModal}>
            {popUpText}
          </Modali.Modal> */}
        </div>
      </section>
    </div>
  );
}


const condition = (authUser) => authUser != null;

export default withFirebase(withAuthorization(condition)(Announcements));

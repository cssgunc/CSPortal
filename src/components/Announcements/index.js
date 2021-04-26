import React, { useState, useEffect } from "react";
import axios from "axios";
import { withAuthorization } from "../Session";
import Modali, { useModali } from "modali";

import Loading from "../General/Loading";
import { withFirebase } from "../Firebase";
import { parseJSON, format } from "date-fns";

function Announcements() {
  const airtableKey = process.env.REACT_APP_AIRTABLE_API_KEY;
  const googleKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const playlistId = "PL8zglt-LDl-iywBxcoGUoG-Sh0_1IaoQJ";
  const [data, setData] = useState([]);

  const [dataLoaded, setDataLoaded] = useState(false);

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
  };

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
      })
      .catch((error) => {
        console.log(error);
        setDataLoaded(true);
      });
  }, [airtableKey, googleKey, playlistId]);

  return (
    <div>
      <section className="section is-white">
        <div className="container">
          <h4 className="title is-4">Announcements:</h4>

          <hr />
          {dataLoaded ? (
            data.slice(0, 10).map((user) => (
              <div className="card" key={user.id}>
                <header className="card-header">
                  <p className="card-content">
                    <strong
                      style={{
                        paddingTop: "10px",
                        fontSize: "30px",
                        color: "black",
                      }}
                      onClick={() =>
                        toggleFunc(
                          user.fields.Title,
                          format(parseJSON(user.fields.Date), "PPPP"),
                          user.fields.Content
                        )
                      }
                    >
                      {user.fields.Title}
                    </strong>
                    <Modali.Modal {...exampleModal}>
                      <strong
                        strong
                        style={{
                          padding: "20px",
                          paddingLeft: "30px",
                          paddingRight: "30px",
                          fontSize: "40px",
                        }}
                      >
                        {popUpText[0]}
                      </strong>
                      <p
                        strong
                        style={{
                          padding: "20px",
                          paddingLeft: "30px",
                          paddingRight: "30px",
                          fontSize: "15px",
                        }}
                      >
                        {popUpText[1]}
                      </p>
                      <p
                        strong
                        style={{
                          padding: "20px",
                          paddingLeft: "30px",
                          paddingRight: "30px",
                          fontSize: "20px",
                        }}
                      >
                        {popUpText[2]}
                      </p>
                    </Modali.Modal>

                    <br />
                    <p
                      style={{
                        paddingTop: "10px",
                        fontSize: "15px",
                        color: "black",
                      }}
                    >
                      {format(parseJSON(user.fields.Date), "PPPP")}
                    </p>

                    <br />
                    <p style={{ fontSize: "20px", paddingBottom: "20px" }}>
                      {user.fields.Content}{" "}
                    </p>
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
        </div>
      </section>
    </div>
  );
}

const condition = (authUser) => authUser != null;

export default withFirebase(withAuthorization(condition)(Announcements));

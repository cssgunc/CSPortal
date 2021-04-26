import React, { useContext, useState, useEffect } from "react";
import "bulma/css/bulma.css";
import { withAuthorization } from "../Session";
import { AuthUserContext } from "../Session";
import ViewWithTopBorder from "../General/ViewWithTopBorder";
import ProfileIcon from "../ProfileIcon";
import colors from "../../constants/RTCColors";
// import Switch from "bulma-switch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faStar,
  // faLock,
  // faLockOpen,
  faCog,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

var Airtable = require('airtable');
const airtableKey = process.env.REACT_APP_AIRTABLE_API_KEY;
var base = new Airtable({ apiKey: airtableKey }).base('appWPIPmVSmXaMhey');

function ProfilePage(props) {

  const authUser = useContext(AuthUserContext);
  const [userInfo, setUserInfo] = useState({
    id: "",
    fields: {}
  });
  const [myClubs, setMyClubs] = useState([])
  const [allClubs, setAllClubs] = useState([])
  const [isMyClub, setStar] = useState(false)

  useEffect(() => {
    base('Directory').select({ filterByFormula: `Email = "${authUser.email}"` })
      .firstPage(function (err, records) {
        if (err) { console.error(err); return; }
        records.forEach(function (record) {
          setUserInfo(userInfo => ({ "id": record.id, "fields": record.fields }))

          // set club info 
          record.fields.Clubs.forEach((club_id) => {
            base('Clubs').find(club_id, function (err, record) {
              if (err) { console.error(err); return; }
              setMyClubs(myClubs => [...myClubs, ({ "id": record.id, "fields": record.fields })])
            });
          })
        });
      }, [props.fields]);
  }, [authUser.email, props.fields])

  useEffect(() => {
    base('Clubs').select()
      .firstPage(function (err, records) {
        if (err) { console.error(err); return; }
        records.forEach(function (record) {
          setAllClubs(allClubs => [...allClubs, ({ "id": record.id, "fields": record.fields })])
        });
      }, [props.fields]);
  }, [props.fields])


  const handleChange = (e) => {
    let field = e.target.name  // get field name
    let value = e.target.value;    // get field's updated value
    setUserInfo(prevState => {
      return {
        ...prevState,           // copy all other field/objects
        "fields": {              // recreate the object that contains the field to update
          ...prevState.fields, // copy all the fields of the object
          [field]: value    // overwrite the value of the field to update
        }
      }
    });
  };

  const toggleStar = () => {
    setStar(!isMyClub);
  };

  const styles = {
    topBorderStyle: {
      minHeight: "100vh",
    },
    columnStyle: {
      margin: "25px",
    },
    profileColumn: {
      margin: "25px 0px 25px 25px",
    },
    starredColumn: {
      margin: "25px 25px 25px 0px",
      width: "30%",
    },
    verticalMargin: {
      margin: "25px 0px",
    },
    editForm: {
      display: "none",
    },
    editButtonStyle: {
      color: colors.white,
      backgroundColor: colors.lightBlue,
    },
    fileUpload: {
      padding: "10px",
      display: "flex",
      justifyContent: "center",
    },
    jobsButtonStyle: {
      backgroundColor: colors.lightGreen,
    },
    clubsButtonStyle: {
      backgroundColor: colors.green,
    },
    privateButtonStyle: {
      backgroundColor: colors.lightBlue,
      color: colors.white,
    },
    publicButtonStyle: {
      backgroundColor: colors.mediumGray,
      color: colors.white,
    },
    cancelButtonStyle: {
      color: colors.white,
      backgroundColor: colors.lightBlue,
    },
    jobClubStyle: {
      float: "right",
      paddingLeft: "50%",
    },
    starredHeader: {
      display: "flex",
    },
    starredTitle: {
      paddingTop: "4%",
    },
    boxesContainer: {
      paddingTop: "20px",
      overflow: "scroll",
      height: "85vh",
    },
    box: {
      height: "100%",
    },
    popUp: {
      display: "none",
      zIndex: "3",
      width: "40vw",
      height: "40vh",
      position: "relative",
      top: "40%",
    },
    cog: {
      padding: "4%",
      paddingLeft: "12%",
    },
    changeButtons: {
      display: "flex",
      padding: "2%",
      justifyContent: "center",
      alignItem: "center",
    },
    popupBackground: {
      display: "none",
      backgroundColor: colors.white,
      opacity: "30%",
      zIndex: "2",
      width: "100vw",
    },
    outerPopupBackground: {
      display: "none",
      width: "100vw",
      justifyContent: "center",
    },
    privacySettings: {
      paddingBottom: "7%",
    },
    settingExitIcon: {
      float: "right",
    },
    toggleButton: {
      float: "right"
    },
    editFormButtons: {
      display: "flex",
      justifyContent: "center",
    },
    buttonSpacing: {
      padding: "2%",
    },
    starButton: {
      float: "right",
    },
    clubImage: {
      paddingBottom: "10px",
    },
    clubName: {
      marginBottom: "3%",
    },
    clubContactButton: {

    },
    clubContent: {
      overflow: "auto",
    }
  };

  let editMode = function () {
    const editForm = document.getElementById("editForm");
    const profileInfo = document.getElementById("profileInfo");
    const editButton = document.getElementById("editButton");
    profileInfo.style.display = "none";
    editForm.style.display = "block";
    editButton.style.display = "none";
  };

  let submitMode = function (event) {
    event.preventDefault();
    const editForm = document.getElementById("editForm");
    const profileInfo = document.getElementById("profileInfo");
    const editButton = document.getElementById("editButton");
    profileInfo.style.display = "block";
    editForm.style.display = "none";
    editButton.style.display = "block";
    base('Directory').update([
      {
        "id": userInfo.id,
        "fields": userInfo.fields
      }
    ], function (err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function (record) {
        console.log("Updated Record");
      });
    });
  }

  let cancelMode = function () {
    const editForm = document.getElementById("editForm");
    const profileInfo = document.getElementById("profileInfo");
    const editButton = document.getElementById("editButton");
    profileInfo.style.display = "block";
    editForm.style.display = "none";
    editButton.style.display = "block";
  };

  let settingMode = function () {
    const settingPopup = document.getElementById("settingPopup");
    const settingBackground = document.getElementById("settingPopupBackground");
    const outerBackground = document.getElementById("outerBackground");
    outerBackground.style.display = "flex";
    settingBackground.style.display = "flex";
    settingPopup.style.display = "block";
  };

  let hideSettingMode = function () {
    const settingPopup = document.getElementById("settingPopup");
    const settingBackground = document.getElementById("settingPopupBackground");
    const outerBackground = document.getElementById("outerBackground");
    outerBackground.style.display = "none";
    settingBackground.style.display = "none";
    settingPopup.style.display = "none";
  };

  return (
    <div>
      <div
        id="outerBackground"
        className="is-overlay"
        style={styles.outerPopupBackground}>
        <div
          id="settingPopupBackground"
          className="is-overlay"
          style={styles.popupBackground}>

        </div>
        <div id="settingPopup" className="box is-overlay" style={styles.popUp}>
          <div style={styles.settingExitIcon}>
            <FontAwesomeIcon onClick={hideSettingMode} icon={faTimes} />
          </div>
          <div>
            <strong>{userInfo.fields['First Name']} {userInfo.fields['Last Name']}</strong>
            <p>{userInfo.fields['Email']}</p>
            <br></br>
          </div>
          <div className="privacyToggle" style={styles.privacySettings}>
            <strong>Privacy Settings</strong>
            <div style={styles.jobClubStyle}>
              <button className="button" style={styles.privateButtonStyle}>
                Private
              </button>
              <button className="button" style={styles.publicButtonStyle}>
                Public
              </button>
            </div>
          </div>
          <div className="field">
            Show up in club member lists
            <div style={styles.toggleButton}>
              <input
                id="switchRoundedInfo"
                type="checkbox"
                name="switchRoundedInfo"
                className="switch is-rounded is-info is-rtl"
                checked="checked"
              ></input>
              <label for="switchRoundedInfo"> </label>
            </div>
          </div>
          <div className="field">
            Display job openings
          <div style={styles.toggleButton}>
              <input
                id="switchRoundedInfo"
                type="checkbox"
                name="switchRoundedInfo"
                className="switch is-rounded is-info is-rtl"
                checked="checked"
              ></input>
              <label for="switchRoundedInfo"></label>
            </div>
          </div>
          <br></br>
          <button className="button" style={styles.editButtonStyle}>
            Change Password
          </button>
        </div>
      </div>
      <div className="columns">
        <div className="column is-two-thirds" style={styles.profileColumn}>
          <ViewWithTopBorder
            style={styles.topBorderStyle}
            color={colors.limeGreen}
          >
            <div className="is-pulled-right" style={styles.changeButtons}>
              <div>
                <button
                  id="editButton"
                  onClick={editMode}
                  className="button"
                  style={styles.editButtonStyle}
                >
                  Edit Profile
                </button>
              </div>
              <div style={styles.cog}>
                <FontAwesomeIcon onClick={settingMode} icon={faCog} size="2x" />
              </div>
            </div>
            <div id="profileInfo">
              <div className="profileIcon" style={styles.verticalMargin}>
                <ProfileIcon img={userInfo.fields['Profile Picture']}></ProfileIcon>
              </div>
              <p className="title">{userInfo.fields['First Name']} {userInfo.fields['Last Name']}</p>
              <p className="subtitle">
                {userInfo.fields['Headline']}
              </p>
              <div className="envelope" style={styles.verticalMargin}>
                <FontAwesomeIcon icon={faEnvelope} size="lg" />
              </div>
              <u>
                <b>About</b>
              </u>
              <p>
                {userInfo.fields['About']}
              </p>
            </div>
            <div id="editForm" style={styles.editForm}>
              <div className="field">
                <label className="label">Headline</label>
                <div className="control">
                  <input
                    className="input"
                    name="Headline"
                    type="text"
                    onChange={handleChange}
                    defaultValue={userInfo.fields['Headline']}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">First Name</label>
                <div className="control">
                  <input
                    className="input"
                    name="First Name"
                    type="text"
                    onChange={handleChange}
                    defaultValue={userInfo.fields['First Name']}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Last Name</label>
                <div className="control">
                  <input
                    className="input"
                    name="Last Name"
                    type="text"
                    onChange={handleChange}
                    defaultValue={userInfo.fields['Last Name']}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Preferred Name</label>
                <div className="control">
                  <input
                    className="input"
                    name="Preferred Name"
                    type="text"
                    onChange={handleChange}
                    defaultValue={userInfo.fields['Preferred Name']}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Role</label>
                <div className="control">
                  <input className="input" name="Role" type="text" onChange={handleChange} defaultValue={userInfo.fields['Role']} />
                </div>
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input className="input" name="Email" type="text" onChange={handleChange} defaultValue={userInfo.fields['Email']} />
                </div>
              </div>
              <div className="field">
                <label className="label">About</label>
                <div className="control">
                  <input className="input" name="About" type="text" onChange={handleChange} defaultValue={userInfo.fields['About']} />
                </div>
              </div>
              <div style={styles.editFormButtons}>
                <div style={styles.buttonSpacing}>
                  <button
                    onClick={submitMode}
                    className="button"
                    style={styles.editButtonStyle}
                  >
                    Submit
              </button>
                </div>
                <div style={styles.buttonSpacing}>
                  <button
                    onClick={cancelMode}
                    className="button"
                    style={styles.cancelButtonStyle}
                  >
                    Cancel
              </button>
                </div>
              </div>
            </div>
          </ViewWithTopBorder>
        </div>
        <div className="column is-one-third" style={styles.starredColumn}>
          <ViewWithTopBorder style={styles.topBorderStyle} color={colors.green}>
            <div style={styles.starredHeader}>
              <div style={styles.starredTitle}>
                <p>Starred</p>
              </div>

              <div style={styles.jobClubStyle}>
                <button className="button" style={styles.jobsButtonStyle}>
                  Jobs
                </button>
                <button className="button" style={styles.clubsButtonStyle}>
                  Clubs
                </button>
              </div>
            </div>
            <div style={styles.boxesContainer}>
              <details open><summary>MY CLUBS</summary>
                <aside class="menu">
                  <ul class="menu-list">
                    <li>
                      <ul>
                        {myClubs.map(item => (
                          <div class="box" key={item.id}>
                            <FontAwesomeIcon style={styles.starButton} key={item.fields.id} color={isMyClub ? "#FFAC32" : 'transparent'} className="star" icon={faStar} onClick={toggleStar} />
                            <article class="media">
                              <div class="media-left">
                                <figure class="image is-64x64">
                                  {item.fields.Logo != null ? <img src={item.fields.Logo[0].url} alt={item.fields.Name} /> : <img src="https://bulma.io/images/placeholders/128x128.png" alt="Fill In" />}
                                </figure>
                              </div>
                              <div class="media-content">
                                <div class="content">
                                  <p>
                                    <strong>{item.fields.Name}</strong> <small>{item.fields.Contact}</small>
                                    <br />
                                    {item.fields.Description}
                                  </p>
                                </div>
                              </div>
                            </article>
                          </div>))}
                      </ul>
                    </li>
                  </ul>
                </aside></details>
              <details><summary className="all_clubs">ALL CLUBS</summary>
                <aside class="menu">
                  <ul class="menu-list">
                    <li>
                      <ul>
                        {allClubs.map(item => (
                          <div class="box" key={item.id}>
                            <FontAwesomeIcon style={styles.starButton} color="#FFAC32" className="star" icon={faStar} />
                            <div>
                              <div style={styles.clubImage}>
                                <figure class="image is-64x64">
                                  {item.fields.Logo != null ? <img src={item.fields.Logo[0].url} alt={item.fields.Name} /> : <img src="https://bulma.io/images/placeholders/128x128.png" alt="Fill In" />}
                                </figure>
                              </div>
                              <div>
                                <div class="content" style={styles.clubContent}>
                                  <div><strong><h4 style={styles.clubName}>{item.fields.Name}</h4></strong></div>
                                  <div><FontAwesomeIcon style={styles.clubContactButton} icon={faEnvelope} size="med"/>{item.fields.Contact}</div>
                                  <div>{item.fields.Description}</div>
                                    
                                  </div>
                                </div>
                  

                            </div>
                          </div>))}
                      </ul>
                    </li>
                  </ul>
                </aside></details>
            </div>
          </ViewWithTopBorder>
        </div>
      </div>
    </div>
  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(ProfilePage);
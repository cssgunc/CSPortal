import React, { useContext, useState, useEffect, useCallback } from "react";
import "bulma/css/bulma.css";
import { withAuthorization } from "../Session";
import { AuthUserContext } from "../Session";
import ViewWithTopBorder from "../General/ViewWithTopBorder";
import ProfileIcon from "../ProfileIcon";
import colors from "../../constants/RTCColors";
import Switch from "bulma-switch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faLockOpen,
  faCog,
  faTimes
} from "@fortawesome/free-solid-svg-icons";

var Airtable = require('airtable');
const airtableKey = process.env.REACT_APP_AIRTABLE_API_KEY;
var base = new Airtable({apiKey: airtableKey}).base('appWPIPmVSmXaMhey');

function ProfilePage(props) {
  
  const authUser = useContext(AuthUserContext);
  const [userInfo, setUserInfo] = useState({
    id: "",
    fields: {}
  });

  useEffect(() => {
      base('Directory').select({filterByFormula: `Email = "${authUser.email}"`}).
      firstPage(function(err, records) {
        if (err) { console.error(err); return; }
        records.forEach(function(record) {
            setUserInfo(userInfo => ({"id": record.id, "fields": record.fields}))
        });
    }, [props.fields]);
  })


  const handleChange = useCallback((e) => {
    const { fields } = { ...userInfo };
    const currentState = fields;
    const { name, value } = e.target;
    currentState[name] = value;
    setUserInfo({ fields: currentState });
  }, [userInfo]);


  // const handleChange = async (e) => {
  //   const { fields } = { ...userInfo };
  //   const currentState = fields;
  //   const { name, value } = e.target;
  //   currentState[name] = await value;
    
  //   setUserInfo({ fields: currentState });
  // }
  
    // let field = e.target.name  // get field name
    // let value = e.target.value;    // get field's updated value
    // setUserInfo(prevState => {
    //   return {
    //   ...prevState,           // copy all other field/objects
    //   "fields": {              // recreate the object that contains the field to update
    //     ...prevState.fields, // copy all the fields of the object
    //     [field]: value    // overwrite the value of the field to update
    //   }
    // }
    // });

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
      backgroundColor: colors.green,
    },
    clubsButtonStyle: {
      backgroundColor: colors.lightGreen,
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
      paddingLeft: "20%",
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
    console.log(userInfo)
    // base('Directory').update([
    //   {
    //     "id": userInfo.id,
    //     "fields": userInfo.fields
    //   }
    // ], function(err, records) {
    //   if (err) {
    //     console.error(err);
    //     return;
    //   }
    //   records.forEach(function(record) {
    //     console.log(record.id);
    //   });
    // }); 
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
        style={styles.outerPopupBackground}
      >
        <div
          id="settingPopupBackground"
          className="is-overlay"
          style={styles.popupBackground}
        ></div>
        <div id="settingPopup" className="box is-overlay" style={styles.popUp}>
          <div style={styles.settingExitIcon}>
            <FontAwesomeIcon onClick={hideSettingMode} icon={faTimes} />
          </div>
          <div>
            <strong>{authUser.displayName}</strong>
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
          <div class="field">
            Show up in club member lists
            <div style={styles.toggleButton}>
              <input
                id="switchRoundedInfo"
                type="checkbox"
                name="switchRoundedInfo"
                class="switch is-rounded is-info is-rtl"
                checked="checked"
              ></input>
              <label for="switchRoundedInfo"> </label>
            </div>
          </div>
          <div class="field">
            Display job openings
          <div style={styles.toggleButton}>
              <input
                id="switchRoundedInfo"
                type="checkbox"
                name="switchRoundedInfo"
                class="switch is-rounded is-info is-rtl"
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
        <div className="column is-three-quarters" style={styles.profileColumn}>
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
                <ProfileIcon></ProfileIcon>
              </div>
              <p className="title">{authUser.displayName}</p>
              <p className="subtitle">
                President - Future Leaders of User Experience (FLUX)
              </p>
              <div className="envelope" style={styles.verticalMargin}>
                <FontAwesomeIcon icon={faEnvelope} size="lg" />
              </div>
              <u>
                <b>About</b>
              </u>
              <p>
                About Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec ligula neque, lobortis eget euismod vitae, congue sed
                nisi. Donec nibh ipsum, faucibus non pharetra et, vehicula id
                dui. Mauris euismod tellus ornare dolor bibendum, viverra auctor
                ipsum suscipit. Sed eleifend dui nisi, id elementum eros viverra
                vitae. Donec vitae augue luctus, mattis leo sed, suscipit eros.
                Aenean luctus at mi non volutpat. Pellentesque habitant morbi
                tristique senectus et netus et malesuada fames ac turpis
                egestas. Quisque quam eros, condimentum eget porttitor vitae,
                dapibus in nisl. Donec lorem turpis, mollis ac rhoncus eu,
                pellentesque non arcu. Suspendisse quis dui volutpat, eleifend
                lectus eget, placerat est.{" "}
              </p>
            </div>
            <div id="editForm" style={styles.editForm}>
              <div className="field">
                <label className="label">First Name</label>
                <div className="control">
                  <input
                    className="input"
                    name = "First Name"
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
                    name = "Last Name"
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
                    name = "Preferred Name"
                    type="text"
                    onChange={handleChange}
                    defaultValue={userInfo.fields['Preferred Name']}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Role</label>
                <div className="control">
                  <input className="input" name ="Role" type="text" onChange={handleChange} defaultValue={userInfo.fields['Role']} />
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
                  <input className="input" name="About" type="text" onChange={handleChange} placeholder="about" />
                </div>
              </div>
              <div style={styles.editFormButtons}>
                <div style={styles.buttonSpacing}>
                  <button
                    onClick={submitMode}
                    class="button"
                    style={styles.editButtonStyle}
                  >
                    Submit
              </button>
                </div>
                <div style={styles.buttonSpacing}>
                  <button
                    onClick={cancelMode}
                    class="button"
                    style={styles.cancelButtonStyle}
                  >
                    Cancel
              </button>
                </div>
              </div>
            </div>
          </ViewWithTopBorder>
        </div>
        <div className="column" style={styles.starredColumn}>
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
              <div className="box">
                stuff about clubs here to get from air table
              </div>
              <div className="box">
                stuff about clubs here to get from air table
              </div>
              <div className="box">
                stuff about clubs here to get from air table
              </div>
              <div className="box">
                stuff about clubs here to get from air table
              </div>
              <div className="box">
                stuff about clubs here to get from air table
              </div>
              <div className="box">
                stuff about clubs here to get from air table
              </div>
              <div className="box">
                stuff about clubs here to get from air table
              </div>
              <div className="box">
                stuff about clubs here to get from air table
              </div>
              <div className="box">
                stuff about clubs here to get from air table
              </div>
            </div>
          </ViewWithTopBorder>
        </div>
      </div>
    </div>
  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(ProfilePage);

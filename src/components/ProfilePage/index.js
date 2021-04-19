import React, { useContext, useState, useEffect } from "react";
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

function ProfilePage(props) {
  const authUser = useContext(AuthUserContext);

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

  let submitMode = function () {
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
        class="is-overlay"
        style={styles.outerPopupBackground}
      >
        <div
          id="settingPopupBackground"
          class="is-overlay"
          style={styles.popupBackground}
        ></div>
        <div id="settingPopup" class="box is-overlay" style={styles.popUp}>
          <div style={styles.settingExitIcon}>
            <FontAwesomeIcon onClick={hideSettingMode} icon={faTimes} />
          </div>
          <div>
            <strong>{authUser.displayName}</strong>
            <p>email@gmail.com</p>
            <br></br>
          </div>
          <div class="privacyToggle" style={styles.privacySettings}>
            <strong>Privacy Settings</strong>
            <div style={styles.jobClubStyle}>
              <button class="button" style={styles.privateButtonStyle}>
                Private
              </button>
              <button class="button" style={styles.publicButtonStyle}>
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
          <button class="button" style={styles.editButtonStyle}>
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
            <div class="is-pulled-right" style={styles.changeButtons}>
              <div>
                <button
                  id="editButton"
                  onClick={editMode}
                  class="button"
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
              <div class="profileIcon" style={styles.verticalMargin}>
                <ProfileIcon></ProfileIcon>
              </div>
              <p className="title">{authUser.displayName}</p>
              <p className="subtitle">
                President - Future Leaders of User Experience (FLUX)
              </p>
              <div class="envelope" style={styles.verticalMargin}>
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
              <div class="field">
                <label class="label">Name</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder={authUser.displayName}
                  />
                </div>
              </div>
              <div class="field">
                <label class="label">Role</label>
                <div class="control">
                  <input class="input" type="text" placeholder="role" />
                </div>
              </div>
              <div class="field">
                <label class="label">Email</label>
                <div class="control">
                  <input class="input" type="text" placeholder="email" />
                </div>
              </div>
              <div class="field">
                <label class="label">About</label>
                <div class="control">
                  <input class="input" type="text" placeholder="about" />
                </div>
              </div>
              <button
                onClick={submitMode}
                class="button"
                style={styles.editButtonStyle}
              >
                Submit
              </button>
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
                <button class="button" style={styles.jobsButtonStyle}>
                  Jobs
                </button>
                <button class="button" style={styles.clubsButtonStyle}>
                  Clubs
                </button>
              </div>
            </div>

            <div style={styles.boxesContainer}>
              <div class="box">
                stuff about clubs here to get from air table
              </div>
              <div class="box">
                stuff about clubs here to get from air table
              </div>
              <div class="box">
                stuff about clubs here to get from air table
              </div>
              <div class="box">
                stuff about clubs here to get from air table
              </div>
              <div class="box">
                stuff about clubs here to get from air table
              </div>
              <div class="box">
                stuff about clubs here to get from air table
              </div>
              <div class="box">
                stuff about clubs here to get from air table
              </div>
              <div class="box">
                stuff about clubs here to get from air table
              </div>
              <div class="box">
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

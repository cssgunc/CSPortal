import React, { useContext, useState, useEffect } from "react";
import "bulma/css/bulma.css";
import { withAuthorization } from "../Session";
import { AuthUserContext } from "../Session";
import ViewWithTopBorder from "../General/ViewWithTopBorder";
import ProfileIcon from "../ProfileIcon";
import colors from "../../constants/RTCColors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faLockOpen,
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
    jobClubStyle: {
      float: "right",
      paddingLeft: "20%"
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

  return (
    <div className="columns">
      <div className="column is-three-quarters" style={styles.profileColumn}>
        <ViewWithTopBorder
          style={styles.topBorderStyle}
          color={colors.limeGreen}
        >
          <button id="editButton" onClick={editMode} class="button is-pulled-right" style={styles.editButtonStyle}>
            Edit Profile
          </button>
          <div id="profileInfo"><div class="profileIcon" style={styles.verticalMargin}>
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
              About Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              ligula neque, lobortis eget euismod vitae, congue sed nisi. Donec
              nibh ipsum, faucibus non pharetra et, vehicula id dui. Mauris
              euismod tellus ornare dolor bibendum, viverra auctor ipsum suscipit.
              Sed eleifend dui nisi, id elementum eros viverra vitae. Donec vitae
              augue luctus, mattis leo sed, suscipit eros. Aenean luctus at mi non
              volutpat. Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames ac turpis egestas. Quisque quam eros, condimentum
              eget porttitor vitae, dapibus in nisl. Donec lorem turpis, mollis ac
              rhoncus eu, pellentesque non arcu. Suspendisse quis dui volutpat,
            eleifend lectus eget, placerat est.{" "}
            </p>
          </div>
          <div id="editForm" style={styles.editForm}>
        <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input class="input" type="text" placeholder={authUser.displayName} />
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
        <button onClick={submitMode} class="button" style={styles.editButtonStyle}>
            Submit
          </button>
      </div>
        </ViewWithTopBorder>
      </div>
      <div className="column" style={styles.starredColumn}>
        <ViewWithTopBorder
          style={styles.topBorderStyle}
          color={colors.green}
        >
          <div style={styles.starredHeader}>
            <div style={styles.starredTitle}><p>Starred</p></div>

            <div style={styles.jobClubStyle}>
            <button class="button" style={styles.jobsButtonStyle}>Jobs</button>
            <button class="button" style={styles.clubsButtonStyle}>Clubs</button>
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

  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(ProfilePage);

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
  };

  let editMode = function () {
    console.log("Edit mode!");
    const editForm = document.getElementById("editForm");
    const profileInfo = document.getElementById("profileInfo");
    profileInfo.style.display = "none";
    editForm.style.display = "block";
  };

  let submitMode = function () {
    console.log("Submit mode!");
    const editForm = document.getElementById("editForm");
    const profileInfo = document.getElementById("profileInfo");
    profileInfo.style.display = "block";
    editForm.style.display = "none";
  };

  return (
    <div className="columns">
      <div className="column is-three-quarters" style={styles.profileColumn}>
        <ViewWithTopBorder
          style={styles.topBorderStyle}
          color={colors.limeGreen}
        >
          <button class="button is-pulled-right" style={styles.editButtonStyle}>
            Edit Profile
          </button>
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
        </ViewWithTopBorder>
      </div>
      <div className="column" style={styles.starredColumn}>
        <ViewWithTopBorder
          style={styles.topBorderStyle}
          color={colors.green}
        >
          <p className="subtitle">Starred</p>
        </ViewWithTopBorder>
      </div>
    </div>
  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(ProfilePage);

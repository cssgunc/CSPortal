import React, { useState, useEffect } from "react";
import "bulma/css/bulma.css";
import { withAuthorization } from "../Session";
import Heading from "../General/Heading";
import ViewWithTopBorder from "../General/ViewWithTopBorder";
import colors from "../../constants/RTCColors";

function ProfilePage() {
  const styles = {
    topBorderStyle: {
      minHeight: "100vh",
    },
    headingStyle: {
      textAlign: "center",
    },
    pictureStyle: {
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
    },
    editForm: {
      display: "none",
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

    // TODO: Change profile to editable form?
  };

  let submitMode = function () {
    console.log("Submit mode!");
    const editForm = document.getElementById("editForm");
    const profileInfo = document.getElementById("profileInfo");
    profileInfo.style.display = "block";
    editForm.style.display = "none";
  };

  return (
    <div>
      <section className="column">
        <ViewWithTopBorder
          style={styles.topBorderStyle}
          color={colors.darkBlue}
        >
          <Heading style={styles.headingStyle}>First Last</Heading>
          <div id="profileInfo">
            <figure style={styles.pictureStyle} className="image is-128x128">
              <img src="https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"></img>
            </figure>
            <br></br>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
            <br></br>
            <button class="button" onClick={editMode}>
              Edit
            </button>
          </div>
          <div id="editForm" style={styles.editForm}>
            <div class="file has-name is-boxed" style={styles.fileUpload}>
              <label class="file-label">
                <input class="file-input" type="file" name="resume" />
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-upload"></i>
                  </span>
                  <span class="file-label">Choose a file…</span>
                </span>
                <span class="file-name">
                  Screen Shot 2017-07-29 at 15.54.25.png
                </span>
              </label>
            </div>
            <div class="field">
              <label class="label">Name</label>
              <div class="control">
                <input class="input" type="text" placeholder="bob bob" />
              </div>
            </div>
            <div class="field">
              <label class="label">Username</label>
              <div class="control">
                <input class="input" type="text" placeholder="username" />
              </div>
            </div>
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="youremailhere@gmail.com"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">About</label>
              <div class="control">
                <textarea
                  class="textarea"
                  placeholder="lorem ipsum yada yada"
                ></textarea>
              </div>
            </div>
            <button class="button" onClick={submitMode}>
              Submit
            </button>
          </div>
        </ViewWithTopBorder>
      </section>
    </div>
  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(ProfilePage);

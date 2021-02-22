import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import { withAuthorization } from '../Session';
import Heading from '../General/Heading';
import ViewWithTopBorder from '../General/ViewWithTopBorder';
import colors from '../../constants/RTCColors';

function ProfilePage() {
  const styles = {
    topBorderStyle: {
        minHeight: '100vh',
    },
    headingStyle: {
        textAlign: "center",
    },
    pictureStyle: {
        display: "block", 
        marginLeft: "auto",
        marginRight: "auto",
    }
  };

  let editMode = function() {
        console.log("Edit mode!");
        // TODO: Change profile to editable form?
  }

  return (
    <div>
      <section className="column">
        <ViewWithTopBorder style={styles.topBorderStyle} color={colors.darkBlue}>
            <Heading style={styles.headingStyle}>First Last</Heading>
            <figure style={styles.pictureStyle} className="image is-128x128">
                <img src="https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"></img>
            </figure>
            <br></br>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            <br></br>
            <button class="button" onClick={editMode}>Edit</button>
        </ViewWithTopBorder>
      </section>
    </div>
  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(ProfilePage);
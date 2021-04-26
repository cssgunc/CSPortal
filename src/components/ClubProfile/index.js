import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { withAuthorization } from "../Session";
import { AuthUserContext } from "../Session";
import ViewWithTopBorder from "../General/ViewWithTopBorder";
import ProfileIcon from "../ProfileIcon";
import MediaIcon from "../MediaIcon";
import colors from "../../constants/RTCColors";
import facebook from "../../constants/icons/facebook.png";
import twitter from "../../constants/icons/twitter.png";
import instagram from "../../constants/icons/instagram.png";
import linkedin from "../../constants/icons/linkedin.png";
import youtube from "../../constants/icons/youtube.png";
import Heading from "../General/Heading";
import Avatar from "react-avatar";
import calendarIcon from "../../constants/icons/calendarIcon.png";

function ClubProfile(props) {
  const authUser = useContext(AuthUserContext);

  const airtableKey = process.env.REACT_APP_AIRTABLE_API_KEY;
  // all the data for a particular club is stored here
  const [club, setClub] = useState([]);

  const { match } = props;
  const club_id = match.params.id;

  useEffect(() => {
    axios
      .get(`https://api.airtable.com/v0/appWPIPmVSmXaMhey/Clubs/${club_id}`, {
        headers: { Authorization: `Bearer ${airtableKey}` },
      })
      .then((result) => {
        setClub(result.data.fields);
        console.log(result.data.fields);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [airtableKey, club_id]);

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
      margin: "25px 0px 25px",
    },
    editForm: {
      display: "none",
    },
    editButtonStyle: {
      color: colors.white,
      backgroundColor: colors.lightBlue,
      width: "150px",
      height: "50px",
      fontFamily: "Roboto",
      fontStyle: "normal",
    },
    registerButtonStyle: {
      color: colors.white,
      backgroundColor: "#9ACBDD",
      width: "120px",
      height: "30px",
      fontFamily: "Roboto",
      fontStyle: "normal",
      borderRadius: "10px",
      borderColor: "white",
      position: "relative",
      marginTop: "180px",
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
          <button
            className="button is-pulled-right"
            style={styles.editButtonStyle}
          >
            Join
          </button>
          <div className="profileIcon" style={styles.verticalMargin}>
            <Avatar round={true} size="176px" />
          </div>
          <p className="title">{club.Name}</p>
          <div className="columns" style={styles.verticalMargin}>
            <MediaIcon src={facebook} alt="Facebook" />
            <MediaIcon src={twitter} alt="Twitter" />
            <MediaIcon src={instagram} alt="Instagram" />
            <MediaIcon src={linkedin} alt="LinkedIn" />
            <MediaIcon src={youtube} alt="Youtube" />
          </div>
          <div style={{ marginBottom: "30px" }}>
            <u>
              <b>About</b>
            </u>
            <p style={{ marginTop: "15px" }}>
              About Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Donec ligula neque, lobortis eget euismod vitae, congue sed nisi.
              Donec nibh ipsum, faucibus non pharetra et, vehicula id dui.
              Mauris euismod tellus ornare dolor bibendum, viverra auctor ipsum
              suscipit. Sed eleifend dui nisi, id elementum eros viverra vitae.
              Donec vitae augue luctus, mattis leo sed, suscipit eros. Aenean
              luctus at mi non volutpat. Pellentesque habitant morbi tristique
              senectus et netus et malesuada fames ac turpis egestas. Quisque
              quam eros, condimentum eget porttitor vitae, dapibus in nisl.
              Donec lorem turpis, mollis ac rhoncus eu, pellentesque non arcu.
              Suspendisse quis dui volutpat, eleifend lectus eget, placerat est.{" "}
              <calendarIcon></calendarIcon>
            </p>
          </div>
          <div>
            <u>
              <b>Members</b>
            </u>
            <div className="columns" style={styles.verticalMargin}>
              <section style={{ margin: "20px" }}>
                <ProfileIcon></ProfileIcon>
              </section>
              <section style={{ margin: "20px" }}>
                <ProfileIcon></ProfileIcon>
              </section>
              <section style={{ margin: "20px" }}>
                <ProfileIcon></ProfileIcon>
              </section>
            </div>
          </div>
        </ViewWithTopBorder>
      </div>
      <div className="column" style={styles.starredColumn}>
        <ViewWithTopBorder style={styles.topBorderStyle} color={colors.green}>
          <div>
            <Heading
              style={{
                fontFamily: "Roboto",
                fontStyle: "normal",
                fontWeight: "bold",
                fontSize: "18px",
                lineHeight: "21px",
                display: "flex",
                alignItems: "center",
                letterSpacing: "0.05em",
              }}
            >
              Upcoming Events
            </Heading>
            <calendarIcon></calendarIcon>
          </div>
          <div
            style={{
              backgroundColor: "white",
              width: "80%",
              height: "250px",
              margin: "40px",
            }}
          >
            <Heading
              style={{
                padding: "15px",
                textAlign: "center",
                fontFamily: "Roboto",
                fontStyle: "normal",
                fontWeight: "bold",
                fontSize: "18px",
                lineHeight: "21px",
                display: "flex",
                alignItems: "center",
                letterSpacing: "0.05em",
                position: "absolute",
                top: "200px",
              }}
            >
              Figma Workshop
            </Heading>
            <p
              style={{
                fontFamily: "Roboto",
                fontStyle: "normal",
                fontWeight: "normal",
                fontSize: "16px",
                lineHeight: "19px",
                display: "flex",
                alignItems: "center",
                letterSpacing: "0.05em",
                position: "absolute",
                top: "235px",
                left: "75px",
              }}
            >
              Friday, 2/26/2021
            </p>
            <p
              style={{
                fontFamily: "Roboto",
                fontStyle: "normal",
                fontWeight: "normal",
                fontSize: "16px",
                lineHeight: "19px",
                display: "flex",
                alignItems: "center",
                letterSpacing: "0.05em",
                position: "absolute",
                top: "250px",
                left: "85px",
                color: "#B6B6B6",
              }}
            >
              Zoom
            </p>
            <button style={styles.registerButtonStyle}>Register Now</button>
            <p
              style={{
                fontFamily: "Roboto",
                fontStyle: "normal",
                fontWeight: "normal",
                fontSize: "12px",
                lineHeight: "14px",
                display: "flex",
                alignItems: "center",
                letterSpacing: "0.05em",
                position: "absolute",
                top: "310px",
                left: "75px",
                color: "#6C6D6F",
              }}
            >
              5 members attending
            </p>
          </div>
          <div
            style={{
              backgroundColor: "white",
              width: "80%",
              height: "250px",
              margin: "40px",
            }}
          >
            <Heading
              style={{
                padding: "15px",
                textAlign: "center",
                fontFamily: "Roboto",
                fontStyle: "normal",
                fontWeight: "bold",
                fontSize: "18px",
                lineHeight: "21px",
                display: "flex",
                alignItems: "center",
                letterSpacing: "0.05em",
                position: "absolute",
                top: "495px",
              }}
            >
              Psychology in UX
            </Heading>
            <p
              style={{
                fontFamily: "Roboto",
                fontStyle: "normal",
                fontWeight: "normal",
                fontSize: "16px",
                lineHeight: "19px",
                display: "flex",
                alignItems: "center",
                position: "absolute",
                top: "530px",
                left: "75px",
              }}
            >
              Monday, 3/1/2021
            </p>
            <p
              style={{
                fontFamily: "Roboto",
                fontStyle: "normal",
                fontWeight: "normal",
                fontSize: "16px",
                lineHeight: "19px",
                display: "flex",
                alignItems: "center",
                letterSpacing: "0.05em",
                position: "absolute",
                top: "545px",
                left: "85px",
                color: "#B6B6B6",
              }}
            >
              Zoom
            </p>
            <button style={styles.registerButtonStyle}>Register Now</button>
            <p
              style={{
                fontFamily: "Roboto",
                fontStyle: "normal",
                fontWeight: "normal",
                fontSize: "12px",
                lineHeight: "14px",
                display: "flex",
                alignItems: "center",
                letterSpacing: "0.05em",
                position: "absolute",
                top: "600px",
                left: "75px",
                color: "#6C6D6F",
              }}
            >
              5 members attending
            </p>
          </div>
        </ViewWithTopBorder>
      </div>
    </div>
  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(ClubProfile);

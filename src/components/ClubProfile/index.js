import React, { useContext, useState, useEffect } from "react";
import Airtable from 'airtable';
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
import * as AIRTABLE from '../../constants/airtable';

function ClubProfile(props) {
  const authUser = useContext(AuthUserContext);

  const airtableKey = process.env.REACT_APP_AIRTABLE_API_KEY;
  // all the data for a particular club is stored here
  const [club, setClub] = useState([]);

  const { match } = props;
  const club_id = match.params.id;

  useEffect(() => {
    let updateClub = async () => {
      let base = new Airtable({apiKey: airtableKey}).base(AIRTABLE.BASE_ID);

      let result = await base(AIRTABLE.CLUBS_TABLE).find(club_id);

      setClub(result.fields);
      console.log(result.fields);
    }
    updateClub();
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
              { club.Description }
              <calendarIcon></calendarIcon>
            </p>
          </div>
          <div>
            <u>
              <b>Members</b>
            </u>
            <div className="columns" style={styles.verticalMargin}>
            { !club.Directory || club.Directory.length === 0 ? (
                <p>
                  <strong>No members yet! Check back later! </strong>
                </p>
            ) : (
              club.Directory
                .map((member) => (
                  <section style={{ margin: "20px" }} key={member}>
                    <ProfileIcon displayName={member.displayName}></ProfileIcon>
                  </section>
                ))
            )}
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

import React, { useContext, useState, useEffect } from "react";
import Markdown from "react-markdown";
import Airtable from "airtable";
import { parse, format } from "date-fns";
import { withAuthorization } from "../Session";
import { AuthUserContext } from "../Session";
import ViewWithTopBorder from "../General/ViewWithTopBorder";
import ProfileIcon from "../ProfileIcon";
import MediaIcon from "../MediaIcon";
import colors from "../../constants/RTCColors";
import link from "../../constants/icons/link.png";
import facebook from "../../constants/icons/facebook.png";
import twitter from "../../constants/icons/twitter.png";
import instagram from "../../constants/icons/instagram.png";
import linkedin from "../../constants/icons/linkedin.png";
import youtube from "../../constants/icons/youtube.png";
import Heading from "../General/Heading";
import Loading from "../General/Loading";
import Avatar from "react-avatar";
import * as AIRTABLE from '../../constants/airtable';

function ClubProfile(props) {
  const authUser = useContext(AuthUserContext);

  const airtableKey = process.env.REACT_APP_AIRTABLE_API_KEY;
  // all the data for a particular club is stored here
  const [club, setClub] = useState([]);
  const [leaderInfo, setLeaderInfo] = useState([]);
  const [memberInfo, setMemberInfo] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const { match } = props;
  const club_id = match.params.id;

  useEffect(() => {
    let updateClub = async () => {
      let base = new Airtable({apiKey: airtableKey}).base(AIRTABLE.BASE_ID);

      let result = await base(AIRTABLE.CLUBS_TABLE).find(club_id);

      setClub(result.fields);
      console.log(result.fields);

      // Combine leader fields
      let leaders = [];
      for (let i = 0; i < result.fields[AIRTABLE.CLUBS_TABLE_LEADERS_FIELD].length; i++) {
        let hasProfPic = result.fields[AIRTABLE.CLUBS_TABLE_LEADER_PROFILE_PICTURE_FIELD] && result.fields[AIRTABLE.CLUBS_TABLE_LEADER_PROFILE_PICTURE_FIELD].length > 0;
        leaders.push({
          id: result.fields[AIRTABLE.CLUBS_TABLE_LEADERS_FIELD][i],
          firstName: result.fields[AIRTABLE.CLUBS_TABLE_LEADER_FIRST_NAME_FIELD][i],
          lastName: result.fields[AIRTABLE.CLUBS_TABLE_LEADER_LAST_NAME_FIELD][i],
          profilePicture: hasProfPic ? result.fields[AIRTABLE.CLUBS_TABLE_LEADER_PROFILE_PICTURE_FIELD][i] : null,
        });
      }

      // Combine member fields
      let members = [];
      for (let i = 0; i < result.fields[AIRTABLE.CLUBS_TABLE_PUBLIC_MEMBERS_FIELD].length; i++) {
        let hasProfPic = result.fields[AIRTABLE.CLUBS_TABLE_MEMBER_PROFILE_PICTURE_FIELD] && result.fields[AIRTABLE.CLUBS_TABLE_MEMBER_PROFILE_PICTURE_FIELD].length > 0;
        members.push({
          id: result.fields[AIRTABLE.CLUBS_TABLE_PUBLIC_MEMBERS_FIELD][i],
          firstName: result.fields[AIRTABLE.CLUBS_TABLE_MEMBER_FIRST_NAME_FIELD][i],
          lastName: result.fields[AIRTABLE.CLUBS_TABLE_MEMBER_LAST_NAME_FIELD][i],
          profilePicture: hasProfPic ? result.fields[AIRTABLE.CLUBS_TABLE_MEMBER_PROFILE_PICTURE_FIELD][i] : null,
        });
      }

      // Sort both lists by firstname
      leaders.sort((a, b) => a.firstName.localeCompare(b.firstName));
      members.sort((a, b) => a.firstName.localeCompare(b.firstName));

      setLeaderInfo(leaders);
      setMemberInfo(members);

      setDataLoaded(true);
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

  return (
    <div className="container">
      { dataLoaded ? (
        <div className="columns">
          <div className="column is-three-quarters" style={styles.profileColumn}>
            <ViewWithTopBorder
              style={styles.topBorderStyle}
              color={colors.limeGreen}
            >
              { club.CoverImage && club.CoverImage.length > 0 && 
                <figure className="box header-background image is-3by1" 
                  style={club.CoverImage && club.CoverImage.length > 0 ? 
                    {"background": `url(${club.CoverImage[0].url})`, 
                    "backgroundSize": "cover", 
                    "backgroundRepeat" : "no-repeat"} : {}}/>
              }
              <a
                className="button is-pulled-right mt-2"
                style={styles.editButtonStyle}
                href={club.Signup ? club.Signup : club.Website}
                target="_blank"
                rel="noreferrer"
              >
                Join
              </a>
              <div className={ club.CoverImage && club.CoverImage.length > 0 ? "under-cover ml-3" : "mb-5" }>
                { club.Logo && club.Logo.length > 0 ? (
                  <figure className="box image is-128x128" style={styles.verticalMargin}>
                    <img
                      src={club.Logo[0].url}
                      alt="Logo"
                    />
                    </figure>
                ) : (
                  <Avatar round={true} size="128px" />
                )}
              </div>
              <p className="title">{club.Name}</p>
              <div className="columns" style={styles.verticalMargin}>
                <a href={club.Website} target="_blank" rel="noreferrer">
                  <MediaIcon src={link} alt="Website" />
                </a>
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
                <Markdown
                  children={club.Description}/>
              </div>
              <div>
                <u>
                  <b>Leaders</b>
                </u>
                <div className="columns" style={styles.verticalMargin}>
                { !club[AIRTABLE.CLUBS_TABLE_LEADERS_FIELD] || club[AIRTABLE.CLUBS_TABLE_LEADERS_FIELD].length === 0 ? (
                    <p>
                      <strong>No leaders listed! Please contact UNC CS Department staff! </strong>
                    </p>
                ) : (
                  leaderInfo
                    .map((member, i) => (
                      <div className="column is-2 has-text-centered" style={{ margin: "20px" }} key={member.id}>
                        <div className="is-inline-block">
                          <ProfileIcon user={member.firstName} userId={member.id}/>
                        </div>
                        <p>{member.firstName} {member.lastName}</p>
                      </div>
                    ))
                )}
                </div>
              </div>
              <div>
                <u>
                  <b>Members</b>
                </u>
                <div className="columns" style={styles.verticalMargin}>
                { !club[AIRTABLE.CLUBS_TABLE_PUBLIC_MEMBERS_FIELD] || club[AIRTABLE.CLUBS_TABLE_PUBLIC_MEMBERS_FIELD].length === 0 ? (
                    <p>
                      <strong>No members yet! Check back later! </strong>
                    </p>
                ) : (
                  memberInfo
                    .map((member, i) => (
                      <div className="column is-2 has-text-centered" style={{ margin: "20px" }} key={member.id}>
                        <div className="is-inline-block">
                          <ProfileIcon user={member.firstName} userId={member.id}/>
                        </div>
                        <p>{member.firstName} {member.lastName}</p>
                      </div>
                    ))
                )}
                </div>
              </div>
            </ViewWithTopBorder>
          </div>
          <div className="column" style={styles.starredColumn}>
            <ViewWithTopBorder style={styles.topBorderStyle} color={colors.green}>
              <div>
                <Heading>
                    Upcoming Events
                </Heading>
              </div>
              {club.Events && club.Events.map((event, i) => (
                <div className="card" key={event}>
                  <div className="card-content">
                    <p className="title is-5 mb-0">{club[AIRTABLE.CLUBS_TABLE_EVENT_NAME_FIELD][i]}</p>
                    <div className="content">
                      <p className="mb-0">
                        {format(parse(club[AIRTABLE.CLUBS_TABLE_EVENT_TIME_FIELD][i], "yyyy-MM-dd'T'HH:mm:ss.SSSx", new Date()), "LLL d 'at' p")}
                      </p>
                      <p>
                        {club[AIRTABLE.CLUBS_TABLE_EVENT_LOCATION_FIELD][i] || "Location TBD"}
                      </p>
                      <a className="button" href={`/events/${event}`}>Learn More</a>
                    </div>
                  </div>
                </div>
              ))}
            </ViewWithTopBorder>
          </div>
        </div>
      ) : (
        // you can also add a "width" property that sets how wide it will be
        // you can set the styles for the container with the "containerStyle" property
        // and set any other styles for the loading image itself with the "style" property
        // see dummy example below
        <Loading />
      )}
    </div>
  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(ClubProfile);

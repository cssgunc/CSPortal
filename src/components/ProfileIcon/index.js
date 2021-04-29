import React from "react";
import { withAuthorization } from "../Session";
import colors from "../../constants/RTCColors";

function ProfileIcon(props) {
  const { authUser, size } = props;
  const identifier = authUser.displayName ?? authUser.email;
  const pfp = props.img;
  let sizepx = null;
  let halfsizepx= null;

  if (size != null) {
    sizepx = size + "px"
    halfsizepx = size/2 + "px"
  } else {
    sizepx = null;
  }

  const styles = {
    circle: {
      backgroundColor: colors.green,
      borderRadius: "50%",
      width: sizepx ?? "44px",
      height: sizepx ?? "44px",
      cursor: "pointer",
    },
    initial: {
      textAlign: "center",
      lineHeight: sizepx ?? "44px",
      color: colors.white,
      fontWeight: "900",
      fontSize: halfsizepx ?? "22px",
    },
  };

  return (
    <div className="is-hidden-touch" style={styles.circle}>
      {pfp != null ? <img src={pfp[0].url} alt="" style={styles.circle}></img> : <p style={styles.initial}>{identifier.charAt(0).toUpperCase()}</p>}
    </div>
  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(ProfileIcon);

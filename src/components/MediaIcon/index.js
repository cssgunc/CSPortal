import React from "react";
import colors from "../../constants/RTCColors";

function MediaIcon(props) {
  const styles = {
    icon: {
      filter: "grayscale(100%) brightness(0.0)",
      cursor: "pointer",
      margin: "1px",
      padding: "0px",
    },
    large: {
      height: "25px",
      width: "25px",
    },
    small: {
      height: "10px",
      width: "10px",
    },
  };

  const src = props.src;
  const alt = props.alt;

  return (
    <div style={styles.icon}>
      <img src={src} alt={alt} />
    </div>
  );
}

export default MediaIcon;

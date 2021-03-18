import React from "react";
import colors from "../../constants/RTCColors";

function MediaIcon(props) {
  const styles = {
    icon: {
      filter: "grayscale(100%) brightness(0.0)",
      cursor: "pointer",
      margin: "1px",
      padding: "0px",
      height: "27px",
      width: "27px",
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

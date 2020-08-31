import React from 'react';
import colors from '../../constants/RTCColors';

export default function ViewWithTopBorder(props) {
  const { color, children, styles } = props;
  return (
    <div
      className="card view-with-top-bar"
      style={{
        borderColor: color ?? colors.limeGreen,
        backgroundColor: colors.lightGray,
        ...styles,
      }}
    >
      {children}
    </div>
  );
}

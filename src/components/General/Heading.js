import React from 'react';
import colors from '../../constants/RTCColors';

export default function Heading(props) {
  const { color = colors.grey, children, styles, type = 'heading1' } = props;
  return (
    <h4 className={type} style={{ color, ...styles }}>
      {children}
    </h4>
  );
}

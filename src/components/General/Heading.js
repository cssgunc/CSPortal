import React from 'react';
import colors from '../../constants/RTCColors';

export default function Heading(props) {
  const { color = colors.grey, children, style, type = 'heading1' } = props;
  const styles = {
    heading1: {
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '25.2px',
      lineHeight: '30px',
      paddingBottom: '15px',
      color,
      ...style,
    },
  };

  return <h4 style={styles[type]}>{children}</h4>;
}

import React from 'react';
import colors from '../../constants/RTCColors';

export default function ViewWithTopBorder(props) {
  const { color, children, style } = props;
  const styles = {
    view: {
      borderTop: '17px solid',
      borderRadius: '17px',
      padding: '19px',
      borderColor: color ?? colors.limeGreen,
      backgroundColor: colors.lightGray,
      overflow: 'auto',
      ...style,
    },
  };

  return (
    <div className="card" style={styles.view}>
      {children}
    </div>
  );
}

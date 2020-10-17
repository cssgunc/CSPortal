import React from 'react';
import ellipses from '../../constants/loading-ellipses.gif';

export default function Loading(props) {
  const { containerStyle, style, width = '150px' } = props;
  const styles = {
    loadingContainer: {
      padding: '15px',
      textAlign: 'center',
      ...containerStyle,
    },
  };

  return (
    <div style={styles.loadingContainer}>
      <img
        style={style}
        width={width}
        src={ellipses}
        alt="Content is loading."
      />
    </div>
  );
}

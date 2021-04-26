import React from 'react';
import { withAuthorization } from '../Session';
import colors from '../../constants/RTCColors';

function ProfileIcon(props) {
  const { authUser } = props;
  const identifier = authUser.displayName ?? authUser.email;
  const pfp = props.img;

  const styles = {
    circle: {
      backgroundColor: colors.green,
      borderRadius: '50%',
      width: '44px',
      height: '44px',
      cursor: 'pointer',
    },
    initial: {
      textAlign: 'center',
      lineHeight: '44px',
      color: colors.white,
      fontWeight: '900',
      fontSize: '22px',
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

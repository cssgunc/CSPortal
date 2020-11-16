import React, { useState, useEffect } from 'react';
import colors from '../../constants/RTCColors';
import fbIcon from '../../constants/icons/facebook.png';
import twitterIcon from '../../constants/icons/twitter.png';
import linkedinIcon from '../../constants/icons/linkedin.png';
import instaIcon from '../../constants/icons/instagram.png';

function Footer() {
  const [small, setSmall] = useState(window.innerWidth < 500);
  const [medium, setMedium] = useState(window.innerWidth < 750);

  useEffect(() => {
    const updateWindowDimensions = () => {
      setSmall(window.innerWidth < 500);
      setMedium(window.innerWidth < 750);
    };

    window.addEventListener('resize', updateWindowDimensions);
    return () => window.removeEventListener('resize', updateWindowDimensions);
  });

  const styles = {
    footerContainer: {
      position: 'absolute',
      bottom: '0',
      width: '100%',
      height: small ? '125px' : '75px',
      padding: medium ? '0' : '0 40px',
      backgroundColor: colors.black,
      color: colors.white,
    },
    col: {
      width: '50%',
      display: 'inline-block',
      minWidth: '240px',
    },
    leftColSmall: {
      width: '50%',
      display: 'inline-block',
      minWidth: '240px',
      textAlign: 'center',
      marginTop: '13px',
      padding: '0',
    },
    leftCol: {
      textAlign: 'left',
      marginTop: '0',
      padding: '10px',
    },
    rightColSmall: {
      textAlign: 'center',
      padding: '0',
    },
    rightCol: {
      textAlign: 'right',
      paddingTop: '1rem',
      padding: '10px',
    },
    columns: {
      margin: '0',
      height: '100%',
      alignItems: 'center',
      display: 'flex',
      flexDirection: small ? 'column' : 'row',
    },
    icon: {
      height: '40px',
      paddingRight: '10px',
    },
    links: {
      color: colors.white,
    },
  };

  const socialMedia = [
    {
      label: 'instagram link',
      icon: instaIcon,
      link: 'https://www.instagram.com',
      key: 'instagram',
    },
    {
      label: 'facebook link',
      icon: fbIcon,
      link: 'https://www.facebook.com',
      key: 'facebook',
    },
    {
      label: 'twitter link',
      icon: twitterIcon,
      link: 'https://www.twitter.com',
      key: 'twitter',
    },
    {
      label: 'linkedin link',
      icon: linkedinIcon,
      link: 'https://www.linkedin.com',
      key: 'linkedin',
    },
  ];

  return (
    <footer className="footer" style={styles.footerContainer}>
      <div className="columns" style={styles.columns}>
        <div
          className="column"
          style={small ? styles.leftColSmall : styles.leftCol}
        >
          <a href="/" style={styles.links}>
            yourwebsite.org
          </a>
          <br />
          <a href="mailto: contact@yourwebsite.org" style={styles.links}>
            contact@yourwebsite.org
          </a>
        </div>
        <div
          className="column"
          style={small ? styles.rightColSmall : styles.rightCol}
        >
          {socialMedia.map((account) => (
            <a href={account.link} key={account.key}>
              <img alt={account.label} src={account.icon} style={styles.icon} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;

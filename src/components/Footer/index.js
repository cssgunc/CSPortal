import React from 'react';
import colors from '../../constants/RTCColors';
import fbIcon from '../../constants/icons/facebook.png';
import twitterIcon from '../../constants/icons/twitter.png';
import linkedinIcon from '../../constants/icons/linkedin.png';
import instaIcon from '../../constants/icons/instagram.png';

function Footer() {
  const styles = {
    footerContainer: {
      position: 'absolute',
      bottom: '0',
      width: '100%',
      height: '75px',
      padding: '0 40px',
      backgroundColor: colors.black,
      color: colors.white,
    },
    rightCol: {
      textAlign: 'right',
      paddingTop: '1rem',
    },
    columns: {
      margin: '0',
      height: '100%',
      alignItems: 'center',
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
    },
    {
      label: 'facebook link',
      icon: fbIcon,
      link: 'https://www.facebook.com',
    },
    {
      label: 'twitter link',
      icon: twitterIcon,
      link: 'https://www.twitter.com',
    },
    {
      label: 'linkedin link',
      icon: linkedinIcon,
      link: 'https://www.linkedin.com',
    },
  ];

  return (
    <footer className="footer" style={styles.footerContainer}>
      <div className="columns" style={styles.columns}>
        <div className="column is-one-third" style={styles.leftCol}>
          <a href="https://www.rewritingthecode.org" style={styles.links}>
            rewritingthecode.org
          </a>
          <br />
          <a href="mailto: contact@rewritingthecode.org" style={styles.links}>
            contact@rewritingthecode.org
          </a>
        </div>
        <div className="column" style={styles.rightCol}>
          {socialMedia.map((account) => (
            <a href={account.link}>
              <img alt={account.label} src={account.icon} style={styles.icon} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;

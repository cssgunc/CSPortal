import React from 'react';
import { withAuthorization } from '../Session';
import Heading from "../General/Heading";
import ViewWithTopBorder from "../General/ViewWithTopBorder";
import colors from '../../constants/RTCColors';

function Directory() {
  const styles = {
    airtable: {
      background: 'transparent',
      border: '1px solid #ccc',
    },
  };

  return (
    <div>
      <section className="section is-white">
        <div className="container">
          <div className="column">
            <ViewWithTopBorder color = {colors.lightBlue}>
            <section>
            <Heading>RTC Member Directory:</Heading>
            </section>
            <section>
            <h5 className="title is-5">
              (Still waiting for the real member directory)  
            </h5>
            </section>
            <div className="card">
            <iframe
              title="RTCDirectoryAirtableView"
              className="airtable-embed"
              style={styles.airtable}
              src="https://airtable.com/embed/shrJwsY95Lra56HSu?backgroundColor=teal&viewControls=on"
              frameBorder="0"
              width="100%"
              height="650"
            />
          </div>
            </ViewWithTopBorder>
          </div>
          <hr />
        </div>
      </section>
    </div>
  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(Directory);

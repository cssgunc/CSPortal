import React, { useState, useEffect } from "react";
import axios from "axios";
import { withAuthorization } from '../Session';
import Heading from "../General/Heading";
import ViewWithTopBorder from "../General/ViewWithTopBorder";
import colors from '../../constants/RTCColors';

function Directory() {
  const airtableKey = process.env.REACT_APP_AIRTABLE_API_KEY;
  const [directory, setDirectory] = useState([]);
  const styles = {
    airtable: {
      background: 'transparent',
      border: '1px solid #ccc',
    },
  };

  return (
       <section className="section is-white">
            <ViewWithTopBorder color = {colors.lightBlue}>
            <section>
            <Heading>Member Directory:</Heading>
            </section>
            <section>
            <h5 className="title is-5">
              (Still waiting for the real member directory)  
            </h5>
            </section>
            { <div className="card">
            <iframe
              title="RTCDirectoryAirtableView"
              style={styles.airtable}
                      src="https://airtable.com/embed/shrsmt4gRf73XoguK?backgroundColor=red&viewControls=on"
              frameBorder="0"
              width="100%"
              height="650"
            />
          </div> }
            </ViewWithTopBorder>
       </section>
  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(Directory);

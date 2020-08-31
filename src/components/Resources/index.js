import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withAuthorization } from '../Session';

function Resources() {
  const airtableKey = process.env.REACT_APP_AIRTABLE_API_KEY;
  const googleKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const playlistId = 'PL8zglt-LDl-iywBxcoGUoG-Sh0_1IaoQJ';
  const [webinars, setWebinars] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.airtable.com/v0/appWPIPmVSmXaMhey/Announcements`, {
        headers: { Authorization: `Bearer ${airtableKey}` },
      })
      .then((result) => {
        setData(result.data.records);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(
        `https://www.googleapis.com/youtube/v3/playlistItems?key=${googleKey}&part=snippet&playlistId=${playlistId}&maxResults=50`,
      )
      .then((result) => {
        setWebinars(result.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [airtableKey, googleKey, playlistId]);

  return (
    <div>
      <section className="section is-white">
        <div className="container">
          <h4 className="title is-4">
            Using Airtable as a Database:{' '}
            <span role="img" aria-label="check">
              ✅
            </span>
          </h4>
          <hr />
          {data.slice(0, 10).map((user) => (
            <div className="card" key={user.id}>
              <header className="card-header">
                <p className="card-content">
                  <strong>{user.fields.Title}</strong>
                  <br />
                  {user.fields.Content}
                </p>
              </header>
            </div>
          ))}
        </div>
      </section>
      <section className="section is-white">
        <div className="container">
          <h4 className="title is-4">
            Using Youtube API:{' '}
            <span role="img" aria-label="check">
              ✅
            </span>
          </h4>
          <hr />
          {webinars.slice(0, 4).map((vid) => (
            <div className="box" key={vid.id}>
              <article className="media">
                <div className="media-left">
                  <figure className="image">
                    <iframe
                      title="youtube-embed"
                      width="340"
                      height="190"
                      src={`https://www.youtube.com/embed/${vid.snippet.resourceId.videoId}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </figure>
                </div>
                <div className="media-content">
                  <div className="content">
                    <p>
                      <strong>{vid.snippet.title}</strong>
                      <br />
                      <br />
                      {vid.snippet.description.substr(0, 500)}...
                    </p>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(Resources);

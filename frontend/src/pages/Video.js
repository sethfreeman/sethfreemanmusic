import React from 'react';
import './Video.css';

function Video() {
  return (
    <div className="video">
      <h1>Video</h1>
      
      <div className="video-grid">
        <div className="video-item">
          <div className="video-wrapper">
            <iframe
              src="https://www.youtube.com/embed/8fr1FMMZDf8"
              title="Apollo Thirteen"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <p className="video-caption">Apollo Thirteen</p>
        </div>

        <div className="video-item">
          <div className="video-wrapper">
            <iframe
              src="https://www.youtube.com/embed/MvxItgRvr4c"
              title="Tear Down The Walls"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <p className="video-caption">Tear Down The Walls</p>
        </div>

        <div className="video-item">
          <div className="video-wrapper">
            <iframe
              src="https://www.youtube.com/embed/iLOO0K6tsEY"
              title="Wheels Set in Emotion"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <p className="video-caption">Wheels Set in Emotion</p>
        </div>
      </div>

      <p className="more-link">
        See more at the <a href="https://youtube.com/rockerseth" target="_blank" rel="noopener noreferrer">Seth Freeman YouTube Channel</a>.
      </p>
    </div>
  );
}

export default Video;

import React from 'react';
import '../styles/History.css'

const History = ({ videos, redirect }) => {
  return (
    <div className="history-container">
            {/* {videos.map((video) => (
                <div className="video-card" key={video.id.videoId} onClick={() => redirect(video)}>
                <h3 className="video-title">{video.snippet.title}</h3>
                <button className="watch-button" onClick={() => redirect(video)}>
                    Ver Video
                </button>
                </div>
            ))} */}
    </div>
  );
};

export default History;

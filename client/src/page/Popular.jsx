import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getVideos } from '../api/apiPopular';

const Popular = ({ videos: initialVideos, redirect }) => {
  const [videos, setVideos] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getVideos().then((data) => {
      if (data && data.data) {
        setVideos(data.data);
      } else {
        console.log('Error al obtener los videos');
      }
    });
  }, []);

  return (
    <div className="video-grid">
      {videos.map((video) => (
        <div className="video-card" key={video.id_video} onClick={() => redirect(video)}>
          <h3 className="video-title">{video.title_video}</h3>
          <h3 className="video-title">Points: {video.score_video}</h3>
          <button className="watch-button" onClick={() => redirect(video)}>
            Ver Video
          </button>
        </div>
      ))}
    </div>
  );

  function redirect(video) {
    navigate(`/video/${video.id_video}`, { state: { videoData: video } });
  }
};

export default Popular;

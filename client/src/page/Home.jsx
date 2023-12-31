import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getVideos } from '../api/apiHome';
import '../styles/Home.css';

const Home = () => {
  const [videos, setVideos] = useState([]);

  // Obtén la función de navegación
  const navigate = useNavigate();

  useEffect(() => {
    // Llamada a la función getVideos dentro de useEffect
    getVideos().then((data) => {
      if (data && data.data) {
        // Hacer algo con los datos
        setVideos(data.data);
      } else {
        // Manejar el caso de error
        console.log('Error al obtener los videos');
      }
    });
  }, []);

  return (
    <div className="video-grid">
      {videos.map((video) => (
        <div className="video-card" key={video.id_video} onClick={() => redirect(video)}>
          <h3 className="video-title">{video.title_video}</h3>
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

export default Home;


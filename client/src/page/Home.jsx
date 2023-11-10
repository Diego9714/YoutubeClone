import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate
import '../styles/Home.css'

const API_KEY = 'AIzaSyCVEvnf1fHGstoRWDKY7IK5R_QRGVaj1nk';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [requestSent, setRequestSent] = useState(true);

  // Obtén la función de navegación
  const navigate = useNavigate();

  useEffect(() => {
    if (requestSent) {
      console.log(requestSent);
      axios
        .get(
          `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&type=video&part=snippet&maxResults=10&order=viewCount`
        )
        .then((response) => {
          const videoData = response.data.items;
          setVideos(videoData);
        })
        .catch((error) => {
          console.error('Error al cargar los videos de YouTube:', error);
        });
      setRequestSent(false); // Cambiar el estado para evitar futuras solicitudes
    }
  }, [requestSent]); // Dependencia de requestSent

  console.log(videos);

  return (
    <div className="video-grid">
      {videos.map((video) => (
        <div className="video-card" key={video.id.videoId} onClick={() => redirect(video)}>
          <h3 className="video-title">{video.snippet.title}</h3>
          <button className="watch-button" onClick={() => redirect(video)}>
            Ver Video
          </button>
        </div>
      ))}
    </div>
  );

  // Modifica la función redirect para navegar a la ruta /video
  function redirect(video) {
    navigate(`/video/${video.id.videoId}`, { state: { videoData: video } });
  }
};

export default Home;

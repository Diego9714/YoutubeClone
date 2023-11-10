import React from 'react';
import { useLocation } from 'react-router-dom';

const Video = () => {
  const location = useLocation();
  const videoData = location.state.videoData;

  if (!videoData) {
    return <div>No se encontraron datos del video.</div>;
  }

  return (
    <div>
      <h1>{videoData.snippet.title}</h1>
      <iframe
        title="Video de YouTube"
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoData.id.videoId}`}
        frameBorder="0"
        allowFullScreen
        ></iframe>
        <p>{videoData.snippet.description}</p>

    </div>
  );
};

export default Video;

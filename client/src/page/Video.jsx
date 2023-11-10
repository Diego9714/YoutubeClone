import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { create } from "../api/apiComment";
import '../styles/Video.css';

const Video = () => {
  const location = useLocation();
  const videoData = location.state.videoData;

  if (!videoData) {
    return <div>No se encontraron datos del video.</div>;
  }

  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (comment.trim() !== '') {
      // Llama a la función create con el comentario actual
      create(
        { Id_video: videoData.id_video, content_comment: comment, id_user: window.localStorage.getItem('id') },
        (success) => {
          // Maneja la respuesta, podrías actualizar la lista de comentarios si es necesario
          if (success) {
            console.log('Comentario enviado con éxito');
          } else {
            console.error('Error al enviar el comentario');
          }
        }
      );

      // Actualiza el estado local de comentarios
      setComments([...comments, comment]);
      setComment('');
    }
  };

  return (
    <div className="video-container">
      <div className="video-frame">
        <div className='video'>
          {videoData.url_video}
        </div>
      </div>
      <div className="video-details">
        <h1 className="video-title">{videoData.title_video}</h1>
        <div className="video-feedback">
          <button className="like-button">👍 Like</button>
          <button className="dislike-button">👎 Dislike</button>
        </div>
      </div>
      <div className="video-comments">
        <h2>Comentarios</h2>
        <div className="comment-input-container">
          <textarea
            rows="4"
            cols="50"
            placeholder="Escribe tu comentario..."
            value={comment}
            onChange={handleCommentChange}
          ></textarea>
          <button className="comment-submit" onClick={handleCommentSubmit}>
            Enviar
          </button>
        </div>
        <div className="comment-list">
          {comments.map((comment, index) => (
            <div key={index} className="comment-item">
              {comment}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Video;

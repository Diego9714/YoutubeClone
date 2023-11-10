import React, { useState } from 'react';
import { signUpVid } from '../api/apiRegVid';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

function RegisterVideos() {
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    title_video: '',
    url_video: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUpVid(formData, (data) => {
      if (data) {
        nav('/home');
      }
    });
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title_video">Título del Video:</label>
        <input
          type="text"
          id="title_video"
          name="title_video"
          value={formData.title_video}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="url_video">URL del Video:</label>
        <input
          type="text"
          id="url_video"
          name="url_video"
          value={formData.url_video}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Registrar</button>
      <br />
      <button type="button" onClick={() => nav('/login')}>
        Login
      </button>
    </form>
  );
}

export default RegisterVideos;

import React, { useState } from 'react'
import { signIn } from '../api/apiLogin'
import { useNavigate } from 'react-router-dom'
import '../styles/Login.css'

const LoginForm = () => {
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    await signIn(formData, (data) => {
      
      if (data) {
        window.localStorage.setItem('id', data.data.data)
        nav('/home');
      }
    });
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Iniciar sesión</button>
      <br />
      <button type="button" onClick={() => nav('/')}>Register</button>
    </form>
  );
};

export default LoginForm;

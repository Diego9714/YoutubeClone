import React, { useState } from 'react';
import { signUp } from '../api/apiRegister';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const Register = () => {
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
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
    await signUp(formData, (data) => {
      if (data) {
        nav('/login');
      }
    });
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
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
      <button type="submit">Registrar</button>
      <br/>
      <button type='button' onClick={() => nav('/login')}>Login</button>
    </form>
  );
};

export default Register;

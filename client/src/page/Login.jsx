import React, { useState } from 'react'
import { signIn } from '../api/apiLogin'
import { useNavigate } from 'react-router-dom';

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
                nav('/home')
            }
        })
    };

    return (
        <form onSubmit={handleSubmit}>
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
                <label htmlFor="password">Contraseña:</label>
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
            <button type='button' onClick={() =>nav('/')}>Register</button>
        </form>
    );
};

export default LoginForm;

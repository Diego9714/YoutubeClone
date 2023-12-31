import axios from 'axios';

const route = 'http://localhost:4000';

export async function signUp(formData, callback) {
  try {
    const response = await axios.post(`${route}/register`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      callback(true);
    } else {
      console.error('Error al registrar');
      callback(false);
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
    callback(false);
  }
}

import axios from 'axios';

const route = 'http://localhost:6000';

export async function create(formData, callback) {
  try {
    const response = await axios.post(`${route}/create`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      // Si se proporciona un callback, llámalo con `true`
      if (callback) {
        callback(true);
      }
      // Devuelve la respuesta
      return response;
    } else {
      // Si se proporciona un callback, llámalo con `false`
      if (callback) {
        callback(false);
      }
      console.error('Error al registrar');
      return null;
    }
  } catch (error) {
    // Si se proporciona un callback, llámalo con `false`
    if (callback) {
      callback(false);
    }
    console.error('Error en la solicitud:', error);
    return null;
  }
}

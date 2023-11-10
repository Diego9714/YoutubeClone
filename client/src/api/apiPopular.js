import axios from 'axios';

const route = 'http://localhost:5000';

export async function getVideos() {
  try {
    const response = await axios.get(`${route}/popular`)

    if (response.status === 200) {
      // Devuelve los datos si la solicitud es exitosa
      return response.data;
    } else {
      console.error('Error al obtener los videos');
      return null;
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return null;
  }
}

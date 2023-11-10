import axios from 'axios';

const route = 'http://localhost:4000';

export async function signIn(formData, callback) {
  try {
    const response = await axios.post(`${route}/login`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status == 200) {
      // Procesar la respuesta de la API, por ejemplo, redirigir al usuario o mostrar un mensaje de éxito.
      console.log('Inicio de seccion Exitoso');
      callback(response)
    } else {
      console.error('Error al registrar');
      callback(false);
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
    callback(false);
  }
}

import { API_URL } from '@/constants';
/**
 * Actualiza un registro de Jugador_Partido.
 * @param {number} idJugadorPartido - El ID del registro de Jugador_Partido.
 * @param {Object} data - Los datos actualizados para el registro.
 * @returns {Promise} - Promesa que se resuelve con la respuesta de la actualización.
 */
export const actualizarJugadorPartido = async (data: Object): Promise<any> => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No se encontró un token. Debes iniciar sesión.');
  }

  try {
    const response = await fetch(`${API_URL}/api/jugadorPartido`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Error al actualizar el registro de Jugador_Partido.');
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error al actualizar el registro de Jugador_Partido:', error);
    throw error;
  }
};
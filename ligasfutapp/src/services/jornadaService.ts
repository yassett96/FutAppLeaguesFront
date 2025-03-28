import { API_URL } from '@/constants';

/**
 * Obtiene las Jornadas según el Torneo Categoría
 * 
 * @async
 * @function obtenerJornadasSegunTorneoCategoria
 * @param {number} idTorneoCategoria - ID del torneo y la categoría para filtrar las Jornadas.
 * @returns {Promise<{ success: boolean; data?: any; message?: string }>} 
 * Retorna un objeto indicando el éxito de la operación y los datos de las Jornadas o un mensaje de error.
 * @throws {Error} Lanza un error si no se encuentra el token de autenticación o si ocurre algún problema durante la solicitud.
 */
export const obtenerJornadasSegunTorneoCategoria = async (idTorneoCategoria) => {
    const token = localStorage.getItem('token'); // Obtener el token de autenticación

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(`${API_URL}/api/jornada/jornada-segun-torneo-categoria/${idTorneoCategoria}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,  // Enviar el token en el header
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error al obtener las jornadas: ${errorData.message || 'Error desconocido.'}`);
        }

        const responseData = await response.json();
        return { success: true, data: responseData };
    } catch (error) {
        console.error('Error al obtener las jornadas:', error);
        return { success: false, message: 'Error al obtener las jornadas.' };
    }
};
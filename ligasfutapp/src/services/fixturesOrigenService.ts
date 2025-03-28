import { API_URL } from '@/constants';

/**
 * Obtiene la serie de partidos (ida y vuelta) según el ID del fixture.
 *
 * @async
 * @function getSeriePartidosSegunFixture
 * @param {number} id_fixture - ID del fixture para buscar la serie de partidos.
 * @returns {Promise<{ success: boolean; data?: any; message?: string }>}
 * Retorna un objeto indicando el éxito de la operación y los datos de la serie de partidos o un mensaje de error.
 * @throws {Error} Lanza un error si no se encuentra el token de autenticación o si ocurre algún problema durante la solicitud.
 */
export const obtenerSeriePartidosSegunFixture = async (id_fixture) => {
    const token = localStorage.getItem('token'); // Obtener el token de autenticación

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(`${API_URL}/api/fixturesOrigen/serie_partidos/${id_fixture}`, { // Ajusta la URL a la correcta
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,    // Enviar el token en el header
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error al obtener la serie de partidos: ${errorData.message || 'Error desconocido.'}`);
        }

        const responseData = await response.json();
        return { success: true, data: responseData };
    } catch (error) {
        console.error('Error al obtener la serie de partidos:', error);
        return { success: false, message: 'Error al obtener la serie de partidos.' };
    }
};
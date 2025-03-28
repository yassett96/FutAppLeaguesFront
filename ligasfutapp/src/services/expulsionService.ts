import { API_URL } from '@/constants';

/**
 * Registra una expulsión para un jugador.
 * 
 * @async
 * @function registrarExpulsion
 * @param {object} data - Datos de la expulsión a registrar.
 * @param {number} data.id_jugador - ID del jugador que será expulsado.
 * @param {number | null} [data.id_torneo] - ID del torneo asociado (opcional).
 * @param {number | null} [data.id_liga] - ID de la liga asociada (opcional).
 * @param {string} data.motivo - Motivo de la expulsión.
 * @param {boolean} [data.permanente=false] - Si la expulsión es permanente.
 * @returns {Promise<{ success: boolean; data?: any; message?: string }>} 
 * Retorna un objeto indicando el éxito de la operación y los datos de la expulsión o un mensaje de error.
 * @throws {Error} Lanza un error si no se encuentra el token de autenticación o si ocurre algún problema durante la solicitud.
 */
export const registrarExpulsion = async (data: { 
    id_jugador: number; 
    id_torneo?: number | null; 
    id_liga?: number | null; 
    motivo: string; 
    permanente?: boolean 
}): Promise<{ success: boolean; data?: any; message?: string }> => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(`${API_URL}/api/expulsion/registrar`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error al registrar la expulsión: ${errorData.message || 'Error desconocido.'}`);
        }

        const responseData = await response.json();
        return { success: true, data: responseData };
    } catch (error) {
        console.error('Error al registrar la expulsión:', error);
        return { success: false, message: 'Error al registrar la expulsión.' };
    }
};

/**
 * Obtiene los jugadores expulsados según el ID de la liga-categoría.
 *
 * @async
 * @function getExpulsadosPorLigaCategoria
 * @param {number} idLigaCategoria - ID de la liga-categoría.
 * @returns {Promise<{ success: boolean; data?: any; message?: string }>}
 * Retorna un objeto indicando el éxito de la operación y los datos de los expulsados o un mensaje de error.
 * @throws {Error} Lanza un error si no se encuentra el token de autenticación o si ocurre algún problema durante la solicitud.
 */
export const obtenerExpulsadosPorLigaCategoria = async (
    idLigaCategoria: number
): Promise<{ success: boolean; data?: any; message?: string }> => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(
            `${API_URL}/api/expulsion/liga-categoria/${idLigaCategoria}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                `Error al obtener los expulsados: ${errorData.message || 'Error desconocido.'}`
            );
        }

        const responseData = await response.json();
        return { success: true, data: responseData };
    } catch (error) {
        console.error('Error al obtener los expulsados:', error);
        return { success: false, message: 'Error al obtener los expulsados.' };
    }
};

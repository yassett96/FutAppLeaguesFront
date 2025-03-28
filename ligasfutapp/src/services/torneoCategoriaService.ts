import { API_URL } from '@/constants';

/**
 * Desactiva una relación Torneo-Categoría en la base de datos.
 * @async
 * @function desactivarTorneoCategoria
 * @param {number} idTorneoCategoria - ID de la relación Torneo-Categoría.
 * @returns {Promise<{ success: boolean; message: string }>}
 * Retorna un objeto con `success: true` si la operación es exitosa. En caso de error, devuelve `success: false` y un mensaje de error.
 * @throws {Error} Lanza un error si no se encuentra el token de autenticación en el almacenamiento local.
 */
export const desactivarTorneoCategoria = async (idTorneoCategoria) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token no encontrado. Debes iniciar sesión.');

    try {
        const response = await fetch(
            `${API_URL}/api/torneoCategoria/desactivar/${idTorneoCategoria}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData.message || 'Error al desactivar la relación Torneo-Categoría.'
            );
        }

        const data = await response.json();
        return { success: true, message: data.message };
    } catch (error) {
        console.error('Error al desactivar la relación Torneo-Categoría:', error.message);
        return { success: false, message: error.message };
    }
};

/**
 * Obtiene los Torneos Categorías según el Id del Torneo y el Id de la categoría
 * @async
 * @function obtenerTorneoCategoriaSegunIdTorneoIdCategoria
 * @param {number} idTorneo - ID del torneo.
 * @param {number} idCategoria - ID de la categoría.
 * @returns {Promise<{ success: boolean; message: string }>}
 * Retorna un objeto con `success: true` si la operación es exitosa. En caso de error, devuelve `success: false` y un mensaje de error.
 * @throws {Error} Lanza un error si no se encuentra el token de autenticación en el almacenamiento local.
 */
export const obtenerTorneoCategoriaSegunIdTorneoIdCategoria = async (idTorneo, idCategoria) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token no encontrado. Debes iniciar sesión.');

    try {
        const response = await fetch(
            `${API_URL}/api/torneoCategoria/obtener-torneo-categoria/${idTorneo}/${idCategoria}`,
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
                errorData.message || 'Error al obtener el Torneo Categoría.'
            );
        }

        const data = await response.json();
        return { success: true, data: data };
    } catch (error) {
        console.error('Error al obtener el Torneo-Categoría:', error.message);
        return { success: false, message: error.message };
    }
};

/**
 * Para obtener los Torneos en sus respectivas categorías que pertenecen en una Liga determinada
 * @param idLiga 
 * @returns 
 */
export const obtenerTorneosCategoriaSegunIdLiga = async (idLiga: number) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token no encontrado. Debes iniciar sesión.');

    try {
        const response = await fetch(
            `${API_URL}/api/torneoCategoria/obtener-torneos-categoria-segun-id-liga/${idLiga}`,
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
                errorData.message || 'Error al obtener los Torneos con su categoría.'
            );
        }

        const data = await response.json();
        return { success: true, data: data };
    } catch (error) {
        console.error('Error al obtener los Torneos en su categoría:', error.message);
        return { success: false, message: error.message };
    }
};
import { API_URL } from '@/constants';

/**
 * Obtiene las categorías asociadas a una liga y torneo específicos.
 * @async
 * @function obtenerCategoriasPorLigaYTorneo
 * @param {number} idLiga - ID de la liga seleccionada.
 * @param {number} idTorneo - ID del torneo seleccionado.
 * @returns {Promise<{ success: boolean; data?: any; message?: string }>} 
 * Retorna un objeto con `success` en true si se obtienen las categorías exitosamente, y opcionalmente `data` con las categorías. 
 * En caso de error, devuelve `success` en false y un mensaje de error.
 * @throws {Error} Lanza un error si no se encuentra el token de autenticación en el almacenamiento local.
 */
export const obtenerCategoriasHinchaPorLigaYTorneo = async (
    idLiga: number,
    idTorneo: number
): Promise<{ success: boolean; data?: any; message?: string }> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token no encontrado. Debes iniciar sesión.');

    try {
        const response = await fetch(`${API_URL}/api/categoria/categorias/${idLiga}/${idTorneo}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener las categorías.');
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        return { success: false, message: 'Error al obtener las categorías.' };
    }
};

/**
 * Obtiene todas las categorías activas.
 * @async
 * @function obtenerCategoriasActivas
 * @returns {Promise<{ success: boolean; data?: any; message?: string }>} 
 * Retorna un objeto con `success` en true si se obtienen las categorías exitosamente, y opcionalmente `data` con las categorías activas. 
 * En caso de error, devuelve `success` en false y un mensaje de error.
 * @throws {Error} Lanza un error si no se encuentra el token de autenticación en el almacenamiento local.
 */
export const obtenerCategoriasActivas = async (): Promise<{
    success: boolean;
    data?: any;
    message?: string;
}> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token no encontrado. Debes iniciar sesión.');

    try {
        const response = await fetch(`${API_URL}/api/categoria`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData.message || 'Error al obtener las categorías activas.'
            );
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error('Error al obtener las categorías activas:', error);
        return { success: false, message: 'Error al obtener las categorías activas.' };
    }
};
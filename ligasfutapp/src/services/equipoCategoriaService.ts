import { API_URL } from '@/constants';

/**
 * Desactiva lógicamente un registro en la tabla Equipo_Categoria.
 * @async
 * @function desactivarEquipoCategoria
 * @param {number} idEquipoCategoria - ID del registro a desactivar.
 * @returns {Promise<{ success: boolean; message?: string }>} 
 * Retorna un objeto con `success` en true si la desactivación fue exitosa, o `false` con un mensaje de error.
 * @throws {Error} Lanza un error si no se encuentra el token de autenticación.
 */
export const desactivarEquipoCategoria = async (
    idEquipoCategoria: number
): Promise<{ success: boolean; message?: string }> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token no encontrado. Debes iniciar sesión.');

    try {
        const response = await fetch(`${API_URL}/api/equipoCategoria/desactivar/${idEquipoCategoria}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { success: false, message: errorData.message || 'Error al desactivar el registro.' };
        }

        return { success: true, message: 'Registro desactivado exitosamente.' };
    } catch (error) {
        console.error('Error al desactivar el registro:', error);
        return { success: false, message: 'Error al desactivar el registro.' };
    }
};

/**
 * Servicio para obtener los jugadores de planta de un equipo que pertenece a una categoría específica
 * @param idEquipoCategoria 
 * @returns 
 */
export const obtenerJugadoresPlantaSegunEquipoCategoria = async (idEquipoCategoria: number) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token no encontrado. Debes iniciar sesión.');

    try {
        const response = await fetch(`${API_URL}/api/equipoCategoria/jugadores-planta/${idEquipoCategoria}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { success: false, message: errorData.message || 'Error al desactivar el registro.' };
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error('Error al desactivar el registro:', error);
        return { success: false, message: 'Error al desactivar el registro.' };
    }
};
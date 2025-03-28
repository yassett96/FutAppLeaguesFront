import { API_URL } from '@/constants';

/**
 * Desactiva lógicamente un registro en la tabla Delegado_Equipo_Categoria.
 * @async
 * @function desactivarDelegadoEquipoCategoria
 * @param {number} idDelegadoEquipoCategoria - ID del registro a desactivar.
 * @returns {Promise<{ success: boolean; message?: string }>} 
 * Retorna un objeto con `success` en true si la desactivación fue exitosa, o `false` con un mensaje de error.
 * @throws {Error} Lanza un error si no se encuentra el token de autenticación.
 */
export const desactivarDelegadoEquipoCategoria = async (
    idDelegadoEquipoCategoria: number
): Promise<{ success: boolean; message?: string }> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token no encontrado. Debes iniciar sesión.');

    try {
        const response = await fetch(`${API_URL}/api/delegadoEquipoCategoria/desactivar/${idDelegadoEquipoCategoria}`, {
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
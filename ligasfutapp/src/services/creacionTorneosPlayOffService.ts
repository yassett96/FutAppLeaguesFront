import { API_URL } from '@/constants';

/**
 * Crea un torneo Play-Off completo en el servidor.
 * @async
 * @function crearTorneoCompleto
 * @param {object} torneoData - Objeto con los datos del torneo a crear.
 * @returns {Promise<{ success: boolean; data?: any; message?: string }>} 
 * Retorna un objeto con `success` en true si la creación fue exitosa, y opcionalmente `data` con la respuesta. 
 * En caso de error, devuelve `success` en false y un mensaje de error.
 * @throws {Error} Lanza un error si no se encuentra el token de autenticación.
 */
export const crearTorneoPlayOffCompleto = async (
    torneoData: object
): Promise<{ success: boolean; data?: any; message?: string }> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token no encontrado. Debes iniciar sesión.');

    try {
        const response = await fetch(`${API_URL}/api/creacionTorneosPlayOff/creacion-torneo`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(torneoData),
        });

        if (!response.ok) {
            throw new Error('Error al crear el torneo.');
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error('Error al crear el torneo:', error);
        return { success: false, message: 'Error al crear el torneo.' };
    }
};

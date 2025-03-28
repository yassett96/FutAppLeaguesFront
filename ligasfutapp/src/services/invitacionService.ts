import { API_URL } from '@/constants';

/**
 * Crea una invitación y envía un correo.
 * @async
 * @function crearInvitacionYEnviarCorreo
 * @param {object} data - Datos de la invitación a crear.
 * @param {number} data.id_hincha - ID del usuario hincha que envía la invitación.
 * @param {string} data.correo_invitado - Correo electrónico del invitado.
 * @returns {Promise<{ success: boolean; data?: any; message?: string }>} 
 * Retorna un objeto indicando el éxito de la operación y los datos de la invitación o un mensaje de error.
 * @throws {Error} Lanza un error si no se encuentra el token de autenticación o si ocurre algún problema durante la solicitud.
 */
export const crearInvitacionYEnviarCorreo = async (data: { id_hincha: Number; correo_invitado: string }): Promise<{ success: boolean; data?: any; message?: string }> => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(`${API_URL}/api/invitacion/crear-invitacion-evniar-correo`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error al crear la invitación: ${errorData.message || 'Error desconocido.'}`);
        }

        const responseData = await response.json();
        return { success: true, data: responseData };
    } catch (error) {
        console.error('Error al crear la invitación y enviar el correo:', error);
        return { success: false, message: 'Error al crear la invitación o enviar el correo.' };
    }
};

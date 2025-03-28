import { API_URL } from '@/constants';

/**
 * Obtiene los comentarios de un partido específico.
 * @async
 * @function obtenerComentariosPorPartido
 * @param {number} idPartido - ID del partido para el que se desean obtener los comentarios.
 * @returns {Promise<{ success: boolean; data?: any; message?: string }>} Un objeto que indica el éxito de la operación y contiene los datos de los comentarios o un mensaje de error.
 * @throws {Error} Lanza un error si no se encuentra el token de autenticación en el almacenamiento local.
 */
export const obtenerComentariosPorPartido = async (idPartido: number): Promise<{ success: boolean; data?: any; message?: string }> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token no encontrado. Debes iniciar sesión.');

    try {
        const response = await fetch(`${API_URL}/api/comentario/comentarios/${idPartido}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener los comentarios del partido.');
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error('Error al obtener los comentarios del partido:', error);
        return { success: false, message: 'Error al obtener los comentarios del partido.' };
    }
};

/**
 * Actualiza un comentario específico en el servidor.
 * @async
 * @function actualizarComentario
 * @param {object} comentarioData - Objeto con los datos del comentario a actualizar.
 * @returns {Promise<{ success: boolean; data?: any; message?: string }>} 
 * Retorna un objeto con `success` en true si la actualización fue exitosa, y opcionalmente `data` con la respuesta. 
 * En caso de error, devuelve `success` en false y un mensaje de error.
 * @throws {Error} Lanza un error si no se encuentra el token de autenticación.
 */
export const actualizarComentario = async (
    idPartido: number,
    comentarioData: object
): Promise<{ success: boolean; data?: any; message?: string }> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token no encontrado. Debes iniciar sesión.');

    try {
        const response = await fetch(`${API_URL}/api/comentario/crear-o-actualizar/${idPartido}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(comentarioData),
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el comentario.');
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error('Error al actualizar el comentario:', error);
        return { success: false, message: 'Error al actualizar el comentario.' };
    }
};

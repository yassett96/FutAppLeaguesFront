import { API_URL } from '@/constants';

/**
 * Obtiene todos los eventos de un partido específico.
 * @param {number} idPartido - El ID del partido para el cual se desean obtener los eventos.
 * @returns {Promise<{success: boolean, data: Array<any> | string}>} - Una promesa que se resuelve con un objeto que incluye success y los datos o un mensaje.
 */
export const obtenerEventosPorPartido = async (
    idPartido: number
): Promise<{ success: boolean; data }> => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(`${API_URL}/api/evento/partido/eventos/${idPartido}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
            return { success: true, data };
        }

        return { success: false, data: [] };
    } catch (error) {
        console.error('Error al obtener los eventos del partido:', error);
        return { success: false, data: 'Ocurrió un error al intentar obtener los eventos.' };
    }
};


/**
 * Desactiva un evento (elimina lógicamente) por su ID.
 * @param {number} idEvento - El ID del evento a desactivar.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando el evento se ha desactivado correctamente.
 */
export const desactivarEvento = async (idEvento): Promise<{ success: boolean; message?: string }> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token no encontrado. Debes iniciar sesión.');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(`${API_URL}/api/evento/desactivar/${idEvento}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al desactivar el evento.');
        }

        if (response.ok) {
            return { success: true };
        } else {
            return { success: false, message: 'Error al eliminar el evento.' };
        }
    } catch (error) {
        console.error('Error al desactivar el evento:', error);
        throw error;
    }
};

/**
 * Crea un nuevo evento en la base de datos.
 * @param {Object} eventoData - Los datos del evento a crear.
 * @returns {Promise<{ success: boolean; data?: any; message?: string }>} - Una promesa que se resuelve cuando el evento se ha creado correctamente.
 */
export const crearEvento = async (eventoData: object): Promise<{ success: boolean; data?: any; message?: string }> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token no encontrado. Debes iniciar sesión.');

    try {
        const response = await fetch(`${API_URL}/api/evento/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventoData),
        });

        if (!response.ok) {
            throw new Error('Error al crear el evento.');
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error('Error al crear el evento:', error);
        return { success: false, message: 'Error al crear el evento.' };
    }
};

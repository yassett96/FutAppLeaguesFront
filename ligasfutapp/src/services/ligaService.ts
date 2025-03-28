import { API_URL } from '@/constants';

/**
 * Obtiene todas las ligas activas del sistema.
 * @returns Promesa que resuelve con la lista de ligas activas.
 * @throws Error si no se encuentra un token o ocurre un problema con la solicitud.
 */
export const obtenerLigasActivas = async (): Promise<any[]> => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(`${API_URL}/api/liga/ligas-activas`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error al obtener las ligas activas: ${errorData.message || 'Error desconocido.'}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener las ligas activas:', error);
        throw error;
    }
};

/**
 * Obtiene la información de una liga por su nombre.
 * @async
 * @function obtenerLigaPorNombre
 * @param {string} nombre - Nombre de la liga a buscar.
 * @returns {Promise<any | null>} Promesa que resuelve con los datos de la liga encontrada o `null` si no existe.
 * @throws Error si no se encuentra un token o ocurre un problema con la solicitud.
 */
export const obtenerLigaPorNombre = async (nombre: string): Promise<any | null> => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        console.log("nombre: " + nombre);
        // Realizar la solicitud al backend
        const response = await fetch(`${API_URL}/api/liga/buscar-por-nombre/${encodeURIComponent(nombre)}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        // Si no se encuentra la liga, retornar `null` en lugar de lanzar un error
        if (response.status === 404) {
            return null;
        }

        // Manejar otros errores de respuesta
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error al obtener la liga: ${errorData.message || 'Error desconocido.'}`);
        }

        // Retornar la información de la liga
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error al obtener la liga por nombre:`, error);
        throw error;
    }
};

/**
 * Desactiva una liga por su ID (eliminación lógica).
 * @async
 * @function desactivarLiga
 * @param {number} idLiga - ID de la liga a desactivar.
 * @returns {Promise<string>} Promesa que resuelve con un mensaje de éxito o lanza un error si falla.
 * @throws Error si no se encuentra un token o ocurre un problema con la solicitud.
 */
export const desactivarLiga = async (idLiga: number): Promise<string> => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        // Realizar la solicitud al backend
        const response = await fetch(`${API_URL}/api/liga/desactivar/${idLiga}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        // Manejar errores de respuesta
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error desconocido al desactivar la liga.');
        }

        // Retornar un mensaje de éxito
        return 'Liga desactivada exitosamente.';
    } catch (error) {
        console.error(`Error al desactivar la liga con ID ${idLiga}:`, error);
        throw error;
    }
};


/**
 * Obtiene los datos de una liga según un id de jugador.
 * @async
 * @function obtenerDatosLigaSegunIdJugador
 * @param {number} idJugador - ID del jugador para buscar.
 * @returns {Promise<string>} Promesa que resuelve con un mensaje de éxito o lanza un error si falla.
 * @throws Error si no se encuentra un token o ocurre un problema con la solicitud.
 */
export const obtenerDatosLigaSegunIdJugador = async (idJugador: number): Promise<any[]> => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        // Realizar la solicitud al backend
        const response = await fetch(`${API_URL}/api/liga/buscar-por-id-jugador/${idJugador}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        // Manejar errores de respuesta
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error desconocido al obtener los datos de la liga con el id del jugador.');
        }

        // Retornar la información de la liga
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error al obtener los datos de la liga con ID del jugador ${idJugador}:`, error);
        throw error;
    }
};

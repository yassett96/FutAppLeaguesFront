import { API_URL } from '@/constants';

// Función para obtener la información de los partidos por torneo categoría y fecha
export const obtenerPartidosPorTorneoCategoriaYFecha = async (id_torneo: number, id_categoria: number, fecha: string) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(`${API_URL}/api/partido/${id_torneo}/categoria/${id_categoria}/fecha/${fecha}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 404) {
            return []; // Retorna vacío si es 404
        } else if (!response.ok) {
            throw new Error('Error al obtener los partidos.');
        }

        const data = await response.json();
        return data;

    } catch (error) {
        // Solo muestra en consola si no es un 404
        if (error.message !== 'Error al obtener los partidos.') {
            console.error('Error inesperado:', error);
        }
        throw error;
    }
};

// Función para obtener los detalles de un partido
export const obtenerDetallesPartido = async (id_partido: number) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No se encontró un token. Debes iniciar sesión.');
        }

        const response = await fetch(`${API_URL}/api/partido/${id_partido}/detalles`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener los detalles del partido.');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los detalles del partido:', error);
        return null;
    }
};

// Función para obtener los equipos de un partido
export const obtenerEquiposPorPartido = async (id_partido: number) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(`${API_URL}/api/partido/${id_partido}/equipos`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener los equipos del partido.');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los equipos del partido:', error);
        throw error;
    }
};

// Función para obtener los jugadores de los equipos de un partido
export const obtenerJugadoresPorPartido = async (id_partido: number) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(`${API_URL}/api/partido/jugadores/${id_partido}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener los jugadores del partido.');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los jugadores del partido:', error);
        throw error;
    }
};

/**
 * Obtiene los jugadores de un equipo específico que asistieron a un partido.
 * @async
 * @function obtenerJugadoresAsistentesPorEquipo
 * @param {number} idPartido - ID del partido.
 * @param {number} idEquipo - ID del equipo.
 * @returns {Promise<Object[]>} Una lista de jugadores asistentes con su información o un error.
 */
export const obtenerJugadoresAsistentesPorEquipo = async (id_partido: number, id_equipo: number) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(`${API_URL}/api/partido/${id_partido}/equipos/${id_equipo}/jugadores-asistentes`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener los jugadores asistentes del equipo en el partido.');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los jugadores asistentes del equipo en el partido:', error);
        throw error;
    }
};


/**
 * Actualiza un partido con los datos proporcionados.
 * @param id_partido - ID del partido a actualizar
 * @param partidoData - Datos del partido a actualizar
 * @returns Promesa que resuelve con un objeto { success: boolean, data: any }
 */
export const actualizarPartido = async (id_partido: number, partidoData: Record<string, any>) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(`${API_URL}/api/partido/actualizar/${id_partido}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(partidoData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error al actualizar el partido: ${errorData.message || 'Error desconocido.'}`);
        }

        const data = await response.json();

        // Retorna success: true si todo sale bien
        return { success: true, data };
    } catch (error) {
        console.error('Error al actualizar el partido:', error);

        // Retorna success: false en caso de error
        return { success: false, error: error.message || 'Error desconocido.' };
    }
};

/**
 * Obtiene la lista de partidos según el ID de Torneo-Categoría y una fecha específica.
 * 
 * @async
 * @function obtenerPartidosPorIdTorneoCategoriaYFecha
 * @param {number} id_torneo_categoria - ID del Torneo-Categoría para filtrar los partidos.
 * @param {string} fecha - Fecha en formato YYYY-MM-DD para filtrar los partidos.
 * @throws {Error} Si no se encuentra un token o si ocurre un error crítico en la solicitud.
 * @returns {Promise<Array>} Array de partidos o un array vacío si no hay registros.
 */
export const obtenerPartidosPorIdTorneoCategoriaYFecha = async (id_torneo_categoria, fecha) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        // Realizar la solicitud GET con id_torneo_categoria y fecha
        const response = await fetch(`${API_URL}/api/partido/torneo-categoria/${id_torneo_categoria}/${fecha}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        // Manejar errores en la respuesta
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error al obtener los partidos: ${errorData.message || 'Error desconocido.'}`);
        }

        // Parsear y retornar los datos
        const data = await response.json();
        return data.data || []; // Retorna el array de partidos o un array vacío
    } catch (error) {
        console.error('Error al obtener los partidos:', error);
        throw error;
    }
};

/** Interfaz para poder manejar la respuesta de los partidos segun el id de liga categoria y el del equipo */
interface PartidosPorLigaCategoriaYEquipoResponse {
    success: boolean;
    message: string;
    data: Array<{
        id_partido: number;
        fecha: string;
        hora: string;
        equipo_local: string;
        equipo_visitante: string;
    }>;
}
/**
 * Obtiene los partidos según el ID de la liga-categoría y el ID del equipo.
 * @async
 * @function obtenerPartidosPorLigaCategoriaYEquipo
 * @param {number} id_liga_categoria - ID de la liga-categoría.
 * @param {number} id_equipo - ID del equipo.
 * @returns {Promise<Object[]>} - Lista de partidos o un mensaje de error.
 */
export const obtenerPartidosPorLigaCategoriaYEquipo = async (id_liga_categoria: number, id_equipo: number): Promise<PartidosPorLigaCategoriaYEquipoResponse> => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(
            `${API_URL}/api/partido/liga-categoria/${id_liga_categoria}/equipo/${id_equipo}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response.ok) {
            throw new Error('Error al obtener los partidos.');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los partidos:', error);
        throw error;
    }
};
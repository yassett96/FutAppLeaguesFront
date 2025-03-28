import { API_URL } from '@/constants';

// Función para obtener las categoría según el torneo
export const obtenerCategoriasPorTorneoYJugador = async (id_torneo: number, id_jugador: number) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(`${API_URL}/api/torneo/${id_torneo}/${id_jugador}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener las categorías del torneo.');
        }

        const data = await response.json();

        // Si la respuesta no es un array, la convertimos en un array
        return Array.isArray(data) ? data : [data];
    } catch (error) {
        console.error('Error al obtener las categorías del torneo:', error);
        throw error;
    }
};

// Función para obtener los torneos que pertenece un jugador según el id del equipo categoría, el id del jugador y el id de la liga
export const obtenerTorneosSegunIdEquipoCategoriaIdJugadorIdLiga = async (id_equipo_categoria: number, id_jugador: number, id_liga: number) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(`${API_URL}/api/torneo/torneos-segun-equipoCategoria-jugador-categoria/${id_equipo_categoria}/${id_jugador}/${id_liga}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) {
            return [];
            // throw new Error('Error al obtener los torneos que pertenece el jugador.');
        }

        const data = await response.json();

        // Si la respuesta no es un array, la convertimos en un array
        return Array.isArray(data) ? data : [data];
    } catch (error) {
        console.error('Error al obtener los torneos:', error);
        throw error;
    }
};

// Función para obtener información del torneo según la categoría
export const obtenerTorneoInfoSegunCategoria = async (id_torneo: number, id_categoria: number) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(`${API_URL}/api/torneo/${id_torneo}/categoria/${id_categoria}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Si usas autenticación basada en tokens JWT
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener la información del torneo.');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener la información del torneo:', error);
        throw error;
    }
};

// Función para obtener información de las posiciones por categoría
export const obtenerTablaPosicionesPorCategoria = async (id_torneo: number, id_categoria: number) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(`${API_URL}/api/torneo/${id_torneo}/categoria/${id_categoria}/posiciones`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener la tabla de posiciones.');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener la tabla de posiciones:', error);
        throw error;
    }
};

// Función para obtener información de los goleadores por categoría
export const obtenerTablaGoleadoresPorCategoria = async (id_torneo: number, id_categoria: number) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(`${API_URL}/api/torneo/${id_torneo}/categoria/${id_categoria}/goleadores`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener la tabla de goleadores.');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener la tabla de goleadores:', error);
        throw error;
    }
};

/**
 * Obtiene los torneos activos asociados a una liga específica.
 * @param id_liga - ID de la liga para obtener sus torneos.
 * @returns Promesa que resuelve con la lista de torneos activos.
 * @throws Error si no se encuentra un token o ocurre un problema con la solicitud.
 */
export const obtenerTorneosHinchaPorLiga = async (id_liga: number): Promise<any[]> => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(`${API_URL}/api/torneo/torneos-segun-liga/${id_liga}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error al obtener los torneos: ${errorData.message || 'Error desconocido.'}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los torneos por liga:', error);
        throw error;
    }
};

/**
 * Obtiene el nombre del torneo, el año del torneo y el nombre de la liga según los parámetros proporcionados.
 * @async
 * @function obtenerTorneoAnioLiga
 * @param {number} idLiga - ID de la liga seleccionada.
 * @param {number} idTorneo - ID del torneo seleccionado.
 * @param {number} idCategoria - ID de la categoría seleccionada.
 * @returns {Promise<any>} Retorna los datos del torneo, incluyendo nombre, año y liga.
 * @throws {Error} Lanza un error si no se encuentra el token de autenticación o si ocurre un problema en la solicitud.
 */
export const obtenerTorneoAnioLiga = async (
    idLiga: number,
    idTorneo: number,
    idCategoria: number
): Promise<any> => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(
            `${API_URL}/api/torneo/torneo-anio-liga/${idLiga}/${idTorneo}/${idCategoria}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error al obtener los datos del torneo: ${errorData.message || 'Error desconocido.'}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los datos del torneo:', error);
        throw error;
    }
};

/**
 * Obtiene los torneos asociados a un usuario Admin_Liga en una liga categoría específica.
 * @async
 * @function obtenerTorneosPorAdminLiga
 * @param {number} idLigaCategoria - ID de la liga ctaegoría.
 * @returns {Promise<{ success: boolean; message: string; torneos?: Array<any> }>}
 * Retorna un objeto con `success: true` y los torneos asociados si la operación es exitosa. En caso de error, devuelve `success: false` y un mensaje de error.
 * @throws {Error} Lanza un error si no se encuentra el token de autenticación en el almacenamiento local.
 */
export const obtenerTorneosPorAdminLigaCategoria = async (idLigaCategoria) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token no encontrado. Debes iniciar sesión.');

    try {
        const response = await fetch(
            `${API_URL}/api/torneo/torneos-admin_liga-liga/${idLigaCategoria}`,
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
                errorData.message || 'Error al obtener los torneos.'
            );
        }

        const data = await response.json();
        return { success: true, torneos: data.torneos, message: data.message };
    } catch (error) {
        console.error('Error al obtener los torneos:', error.message);
        return { success: false, message: error.message };
    }
};

/**
 * Obtiene información del torneo asociado a un partido específico.
 * @async
 * @function obtenerTorneoPorPartido
 * @param {number} idPartido - ID del partido para el cual se desea obtener el torneo.
 * @returns {Promise<{ success: boolean; message: string; torneo?: any }>}
 * Retorna un objeto con `success: true` y los datos del torneo si la operación es exitosa. En caso de error, devuelve `success: false` y un mensaje de error.
 * @throws {Error} Lanza un error si no se encuentra el token de autenticación en el almacenamiento local.
 */
export const obtenerTorneoPorEquipo = async (idEquipo) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token no encontrado. Debes iniciar sesión.');

    try {
        const response = await fetch(
            `${API_URL}/api/torneo/equipo/${idEquipo}`,
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
                errorData.message || 'Error al obtener la información del torneo.'
            );
        }

        const data = await response.json();
        return { success: true, torneo: data.torneo, message: data.message };
    } catch (error) {
        console.error('Error al obtener el torneo:', error.message);
        return { success: false, message: error.message };
    }
};

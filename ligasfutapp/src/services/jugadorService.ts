import { API_URL } from '@/constants';

// Función para actualizar el estado 'verificado' de un jugador por su ID
export const actualizarVerificacionJugador = async (id_jugador: number) => {
    const token = localStorage.getItem('token'); // Obtener el token del localStorage

    if (!token) {
        throw new Error('No se encontró un token. Por favor, inicia sesión.');
    }

    try {
        // Obtener los datos actuales del jugador
        const responseGet = await fetch(`${API_URL}/api/jugador/${id_jugador}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Incluir el token en el encabezado de autorización
                'Content-Type': 'application/json',
            },
        });

        if (!responseGet.ok) {
            throw new Error('Error al obtener los datos del jugador');
        }

        const jugador = await responseGet.json();

        // Cambiar el valor de verificado a true
        jugador.verificado = true;

        // Enviar una petición PUT para actualizar el jugador
        const responsePut = await fetch(`${API_URL}/api/jugador/${id_jugador}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`, // Incluir el token en el encabezado de autorización
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jugador),
        });

        if (!responsePut.ok) {
            throw new Error('Error al actualizar el jugador');
        }

        const data = await responsePut.json();
        return data; // Retorna la respuesta actualizada del servidor
    } catch (error) {
        console.error('Error al actualizar la verificación del jugador:', error);
        throw error;
    }
};


// Función para obtener la información del jugador según el ID del usuario
export const obtenerDatosJugadorPorUsuario = async (id_usuario: number) => {
    const token = localStorage.getItem('token'); // Obtener el token del localStorage

    if (!token) {
        throw new Error('No se encontró un token. Por favor, inicia sesión.');
    }

    try {

        const response = await fetch(`${API_URL}/api/jugador/jugador_user/${id_usuario}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener los datos del jugador');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los datos del jugador:', error);
        throw error;
    }
};

// Función para obtener los torneos de un jugador
export const obtenerTorneosPorJugador = async (id_jugador: number) => {
    const token = localStorage.getItem('token'); // Obtener el token del localStorage

    if (!token) {
        throw new Error('No se encontró un token. Por favor, inicia sesión.');
    }

    try {
        // Llamada a la API con el id del jugador
        const response = await fetch(`${API_URL}/api/jugador/${id_jugador}/torneos/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return [];
            // throw new Error('Error al obtener los datos del torneo');
        }

        // Devolver los datos obtenidos de la API
        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error al obtener los torneos del jugador:', error);
        throw error; // Manejar el error, lanzando de nuevo para capturarlo en el componente o en otra parte
    }
};

// Función para obtener los detalles del goleador según el jugador, torneo, y categoría
export const obtenerDetallesGoleador = async (id_jugador: number, id_torneo: number, id_categoria: number) => {
    const token = localStorage.getItem('token');
    console.log("id_jugador, id_torneo, id_categoria: " + id_jugador + ", " + id_torneo + ", " + id_categoria);

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(`${API_URL}/api/jugador/${id_jugador}/torneo/${id_torneo}/categoria/${id_categoria}/detalles`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener los detalles del goleador.');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los detalles del goleador:', error);
        throw error;
    }
};

// Función para que el delegado pueda registrar un jugador nuevo
export const registrarJugadorDelegado = async (jugadorData: any, idEquipoCategoria: number, id_liga: number) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    // Agregamos el valor de id_equipo_categoria
    const jugadorDataConEquipo = {
        ...jugadorData,
        id_equipo_categoria: idEquipoCategoria,
        id_liga: id_liga
    }

    try {
        const response = await fetch(`${API_URL}/api/jugador/delegado-registrar`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jugadorDataConEquipo),
        });

        if (!response.ok) {
            throw new Error('Error al registrar el jugador');
        }

        const data = await response.json();
        return data; // Devuelve la respuesta del servidor
    } catch (error) {
        console.error('Error al registrar el jugador:', error);
        throw error;
    }
};

/**
 * Registra un jugador existente en un equipo y categoría específicos.
 * Si el jugador no existe, se crea un nuevo registro en la tabla Jugador y se asocia al equipo y categoría.
 * Si el jugador ya está registrado, solo se asocia al equipo y categoría.
 * @param {Object} data - Datos del jugador y equipo.
 * @param {number} data.id_usuario - El ID del usuario a verificar y registrar.
 * @param {number} data.id_equipo_categoria - El ID del equipo y categoría a asociar.
 * @returns {Promise<{ success: boolean; message?: string }>} 
 * Devuelve un objeto con `success` en `true` si la operación fue exitosa, o `false` con un mensaje de error.
 */
export const registrarJugadorExistente = async (data) => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Token no encontrado. Debes iniciar sesión.");
    }

    try {
        // Realizar la solicitud POST para registrar o asociar al jugador
        const response = await fetch(`${API_URL}/api/jugador/registrar-jugador-existente`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`, // Enviar el token de autorización
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data), // Enviar los datos del jugador y equipo
        });

        const responseData = await response.json();

        // Si la respuesta no es exitosa, lanzar un error con el mensaje recibido
        if (!response.ok) {
            // throw new Error(responseData.message || "Error al registrar o asociar el jugador.");
            return { success: false, message: responseData.message || "Error al registrar el jugador existente." };
        }

        // Si todo es exitoso, retornar un mensaje de éxito
        return { success: true, message: responseData.message || "Jugador registrado y asociado correctamente." };
    } catch (error) {
        console.error("Error al registrar o asociar el jugador:", error);
        return { success: false, message: error.message || "Error al registrar o asociar el jugador." };
    }
};


/**
 * Obtiene los jugadores activos de un equipo y categoría específicos.
 * @async
 * @function obtenerJugadoresPorEquipoCategoria
 * @param {number} id_equipo_categoria - ID del equipo y la categoría.
 * @returns {Promise<Object[]>} Lista de jugadores con su información o un error.
 */
export const obtenerJugadoresPorEquipoCategoria = async (id_equipo_categoria: number) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(
            `${API_URL}/api/jugador/jugadores-equipo/${id_equipo_categoria}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response.ok) {
            throw new Error('Error al obtener los jugadores del equipo y categoría.');
        }

        const data = await response.json();
        return data || []; // Retorna la lista de jugadores
    } catch (error) {
        console.error('Error al obtener los jugadores del equipo y categoría:', error);
        throw error;
    }
};

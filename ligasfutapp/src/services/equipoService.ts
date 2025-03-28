import { API_URL } from '@/constants';

// Para obtener información del equipo según el jugador y la liga
export const obtenerInfoEquiposSegunIdJugadorIdLiga = async (id_liga, id_jugador) => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No se encontró un token. Debes iniciar sesión.');
  }

  try {
    const response = await fetch(
      `${API_URL}/api/equipo/info-equipo-segun-jugador-y-liga/${id_liga}/${id_jugador}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      return [];
      throw new Error('Error al obtener la información del equipo');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener la información del equipo:', error);
    throw error;
  }
};

// Para obtener información para mostrar al Jugador/Delegado del equipo según La liga, el Torneo en una categoría específica y el Equipo
export const obtenerInfoEquipoSegunIdTorneoCategoriaIdEquipoIdLiga = async (id_liga, id_torneo_categoria, id_equipo, id_jugador) => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No se encontró un token. Debes iniciar sesión.');
  }

  try {
    const response = await fetch(
      `${API_URL}/api/equipo/info-equipo-segun-liga-torneo-categoria-equipo-jugador/${id_liga}/${id_torneo_categoria}/${id_equipo}/${id_jugador}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      return [];
      throw new Error('Error al obtener la información del equipo');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener la información del equipo:', error);
    throw error;
  }
};

// Para obtener la evolución de un equipo con respecto a su posición a través de las fechas
export const obtenerEvolucionPosicion = async (idEquipoCategoria: number, idTorneoCategoria: number) => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No se encontró un token. Debes iniciar sesión.');
  }

  try {
    const response = await fetch(`${API_URL}/api/equipo/${idEquipoCategoria}/${idTorneoCategoria}/torneo-evolucion`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener la evolución de la posición.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener la evolución de la posición:', error);
    throw error;
  }
};

// Para obtener la información de los jugadores del equipo que se delega
export const obtenerJugadoresEquipoDelegado = async (idUsuario: number, idEquipoCategoria: number) => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No se encontró un token. Debes iniciar sesión.');
  }

  try {
    const response = await fetch(`${API_URL}/api/equipo/${idUsuario}/${idEquipoCategoria}/jugadores`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return [];
      // throw new Error('Error al obtener los jugadores del equipo delegado.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener los jugadores del equipo delegado:', error);
    throw error;
  }
};

// Par aobtener los equipos categorias que gestiona un delegado
export const obtenerEquiposCategoriasDelegado = async (id_usuario: number, id_liga: number) => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No se encontró un token. Debes iniciar sesión.');
  }

  try {
    const response = await fetch(`${API_URL}/api/equipo/equipos-categorias/${id_usuario}/${id_liga}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener los equipos y categorías gestionados por el delegado');
    }

    const equiposCategorias = await response.json();
    return equiposCategorias;
  } catch (error) {
    console.error('Error en fetchEquiposCategoriasDelegado:', error);
    throw error;
  }
};

/**
 * Registra un nuevo equipo con un delegado asociado.
 * @async
 * @function registrarEquipoConDelegado
 * @param {Object} data - Datos del equipo y delegado.
 * @param {string} data.nombre_equipo - Nombre del equipo.
 * @param {string} data.logo - Logo del equipo (URL o base64).
 * @param {number} data.id_categoria - ID de la categoría asociada.
 * @param {Object} data.delegado - Información del delegado.
 * @param {string} data.delegado.primer_nombre - Primer nombre del delegado.
 * @param {string} data.delegado.primer_apellido - Primer apellido del delegado.
 * @param {string} data.delegado.email - Email del delegado.
 * @param {string} data.delegado.dni - DNI del delegado.
 * @returns {Promise<{ success: boolean; message?: string }>} 
 * Retorna un objeto con `success` en true si el registro fue exitoso, o `false` con un mensaje de error.
 * @throws {Error} Lanza un error si no se encuentra el token de autenticación.
 */
export const registrarEquipoConDelegado = async (
  data: {
    nombre_equipo: string;
    logo: string;
    id_categoria: number;
    delegado: {
      primer_nombre: string;
      segundo_nombre: string;
      primer_apellido: string;
      segundo_apellido: string;
      email: string;
      dni: string;
    };
  },
  idLiga: number
): Promise<{ success: boolean; message?: string }> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Token no encontrado. Debes iniciar sesión.');

  try {
    const response = await fetch(`${API_URL}/api/equipo/registrar-equipo-delegado/${idLiga}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.message || 'Error al registrar el equipo con delegado.' };
    }

    return { success: true, message: 'Equipo con delegado registrado exitosamente.' };
  } catch (error) {
    console.error('Error al registrar el equipo con delegado:', error);
    return { success: false, message: 'Error al registrar el equipo con delegado.' };
  }
};

/**
 * Verifica si un jugador ya está registrado en un equipo y categoría específicos.
 * @param data - Objeto que contiene los datos del jugador y el equipo-categoría.
 * @param data.id_usuario - El ID del usuario a verificar.
 * @param data.id_equipo_categoria - El ID del equipo y categoría a verificar.
 * @returns Un objeto con `success` en true si el jugador está registrado, o `false` con un mensaje de error.
 */
export const verificarJugadorExistenteEnEquipo = async (
  data: {
    id_usuario: number;
    id_equipo_categoria: number;
  }
): Promise<{ success: boolean; jugador?: object | number; message?: string }> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token no encontrado. Debes iniciar sesión.");
  }

  try {
    // Enviar parámetros en la URL con el método GET
    const response = await fetch(`${API_URL}/api/equipo/verificar-jugador?id_usuario=${data.id_usuario}&id_equipo_categoria=${data.id_equipo_categoria}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Error al verificar si el jugador está registrado.");
    }

    // Si el jugador no está registrado, se recibe un 0
    if (responseData.jugador === 0) {
      return { success: false, jugador: 0 };
    }

    // Si el jugador está registrado, se devuelve la información
    return { success: true, jugador: responseData.jugador };

  } catch (error) {
    console.error("Error al verificar si el jugador está registrado:", error);
    return { success: false, message: error.message || "Error al verificar si el jugador está registrado." };
  }
};


/**
 * Registra un equipo y lo asocia con un delegado existente.
 * @param data - Objeto que contiene los datos del equipo y del delegado existente.
 * @param data.nombre_equipo - Nombre del equipo.
 * @param data.logo - URL o base64 del logo del equipo.
 * @param data.id_categoria - ID de la categoría.
 * @param data.id_usuario - ID del usuario existente que será el delegado.
 * @returns Un objeto con `success` en true si el registro fue exitoso, o `false` con un mensaje de error.
 */
export const registrarEquipoConDelegadoExistente = async (
  data: {
    nombre_equipo: string;
    logo: string;
    id_categoria: number;
    id_usuario: number;
  },
  idLiga: number
): Promise<{ success: boolean; message?: string }> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token no encontrado. Debes iniciar sesión.");
  }

  try {
    const response = await fetch(`${API_URL}/api/equipo/registrar-equipo-delegado-existente/${idLiga}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Error al registrar el equipo con delegado existente.");
    }

    return { success: true, message: responseData.message };
  } catch (error) {
    console.error("Error al registrar el equipo con delegado existente:", error);
    return { success: false, message: error.message || "Error al registrar el equipo con delegado existente." };
  }
};

/**
 * Actualiza un equipo y lo asocia con un delegado existente.
 * @param data - Objeto que contiene los datos del equipo y del delegado existente.
 * @param data.id_equipo - ID del equipo a actualizar.
 * @param data.nombre_equipo - Nuevo nombre del equipo.
 * @param data.logo - URL o base64 del nuevo logo del equipo.
 * @param data.id_categoria - ID de la nueva categoría.
 * @param data.id_usuario - ID del usuario existente que será el delegado.
 * @returns Un objeto con `success` en true si la actualización fue exitosa, o `false` con un mensaje de error.
 */
export const actualizarEquipoConDelegadoExistente = async (
  data: {
    id_equipo: number;
    nombre_equipo: string;
    logo: string;
    id_categoria: number;
    id_usuario: number;
  },
  id_liga: number
): Promise<{ success: boolean; message?: string }> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token no encontrado. Debes iniciar sesión.");
  }

  try {
    const response = await fetch(`${API_URL}/api/equipo/actualizar-equipo-delegado-existente/${id_liga}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Error al actualizar el equipo con delegado existente.");
    }

    return { success: true, message: responseData.message };
  } catch (error) {
    console.error("Error al actualizar el equipo con delegado existente:", error);
    return { success: false, message: error.message || "Error al actualizar el equipo con delegado existente." };
  }
};

/**
 * Actualiza un equipo y lo asocia con un delegado nuevo.
 * @param data - Objeto que contiene los datos del equipo y del nuevo delegado.
 * @param data.id_equipo - ID del equipo a actualizar.
 * @param data.nombre_equipo - Nuevo nombre del equipo.
 * @param data.logo - URL o base64 del nuevo logo del equipo.
 * @param data.id_categoria - ID de la nueva categoría.
 * @param data.delegado - Objeto con los datos del delegado nuevo.
 * @param data.delegado.primer_nombre - Primer nombre del delegado.
 * @param data.delegado.segundo_nombre - Segundo nombre del delegado.
 * @param data.delegado.primer_apellido - Primer apellido del delegado.
 * @param data.delegado.segundo_apellido - Segundo apellido del delegado.
 * @param data.delegado.email - Correo electrónico del delegado.
 * @param data.delegado.dni - Documento de identidad del delegado.
 * @returns Un objeto con `success` en true si la actualización fue exitosa, o `false` con un mensaje de error.
 */
export const actualizarEquipoConDelegadoNuevo = async (
  data: {
    id_equipo: number;
    nombre_equipo: string;
    logo: string;
    id_categoria: number;
    delegado: {
      primer_nombre: string;
      segundo_nombre: string;
      primer_apellido: string;
      segundo_apellido: string;
      email: string;
      dni: string;
    };
  },
  id_liga
): Promise<{ success: boolean; message?: string }> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token no encontrado. Debes iniciar sesión.");
  }

  try {
    const response = await fetch(`${API_URL}/api/equipo/actualizar-equipo-delegado-nuevo/${id_liga}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Error al actualizar el equipo con delegado nuevo.");
    }

    return { success: true, message: responseData.message };
  } catch (error) {
    console.error("Error al actualizar el equipo con delegado nuevo:", error);
    return { success: false, message: error.message || "Error al actualizar el equipo con delegado nuevo." };
  }
};


/**
 * Obtiene el equipo que está en descanso en un Fixture
 * @returns Un objeto con `success` en true si la actualización fue exitosa, o `false` con un mensaje de error.
 */
export const obtenerEquipoEnDescanso = async (idTorneoCategoria, idJornada) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token no encontrado. Debes iniciar sesión.");
  }

  try {
    const response = await fetch(`${API_URL}/api/equipo/equipo-descanso-en-jornada/${idTorneoCategoria}/${idJornada}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Error al actualizar el equipo con delegado nuevo.");
    }

    return { success: true, message: responseData };
  } catch (error) {
    console.error("Error al actualizar el equipo con delegado nuevo:", error);
    return { success: false, message: error.message || "Error al actualizar el equipo con delegado nuevo." };
  }
};

/**
 * Obtiene los equipos que están inscritos en un Torneo en una categoría determinada
 * @param idTorneoCategoria 
 */
export const obtenerEquiposSegunIdTorneoCategoria = async (idTorneoCategoria: number) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token no encontrado. Debes iniciar sesión.");
  }

  try {
    const response = await fetch(`${API_URL}/api/equipo/equipo-segun-id-torneo-categoria/${idTorneoCategoria}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Error al obtener los equipos del Torneo Categoría");
    }

    return { success: true, data: responseData };
  } catch (error) {
    console.error("Error al obtener los equipos del Torneo Categoría:", error);
    return { success: false, message: error.message || "Error al obtener los equipos del Torneo Categoría." };
  }
};
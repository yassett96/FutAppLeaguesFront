import { API_URL } from '@/constants';

/**
 * Obtiene los planilleros asignadas a una lia específica.
 * @param {number} id_liga - El ID de la liga.
 * @returns {Promise<{success: boolean, data: Array}>} - Una promesa que resuelve con un objeto indicando éxito y la lista de ligas asignadas al planillero.
 * @throws {Error} - Si ocurre un error al realizar la solicitud o si no se encuentra un token válido.
 */
export const obtenerLigasPlanillero = async (id_liga) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(`${API_URL}/api/planilleroLiga/${id_liga}/planilleros`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            // throw new Error('Error al obtener las ligas asignadas al planillero.');
            const data = await response.json();
            return { success: false, data };
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error('Error al obtener las ligas del planillero:', error);
        throw error;
    }
};

/**
 * Obtiene las ligas a las que está vinculado un planillero.
 * @param {number} id_usuario - El ID del usuario con rol de planillero.
 * @returns {Promise<{success: boolean, data: Array}>} - Una promesa que resuelve con un objeto indicando éxito y la lista de ligas asignadas al planillero.
 * @throws {Error} - Si ocurre un error al realizar la solicitud o si no se encuentra un token válido.
 */
export const obtenerLigasSegunPlanillero = async (id_usuario) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(`${API_URL}/api/planilleroLiga/ligas/${id_usuario}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            // throw new Error('Error al obtener las ligas asignadas al planillero.');
            const data = await response.json();
            return { success: false, data };
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error('Error al obtener las ligas del planillero:', error);
        throw error;
    }
};

/**
 * Elimina lógicamente un planillero asignado a una liga.
 * @param {number} id_planillero_liga - El ID del registro Planillero_Liga que se desea eliminar.
 * @returns {Promise<{success: boolean, message: string}>} - Una promesa que resuelve con un objeto indicando éxito y un mensaje.
 * @throws {Error} - Si ocurre un error al realizar la solicitud o si no se encuentra un token válido.
 */
export const desactivarPlanilleroLiga = async (id_planillero_liga) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(`${API_URL}/api/planilleroLiga/desactivar/${id_planillero_liga}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const data = await response.json();
            return { success: false, message: data.error || 'Error al desactivar el planillero.' };
        }

        const data = await response.json();
        return { success: true, message: data.message || 'El planillero fue desactivado con éxito.' };
    } catch (error) {
        console.error('Error al desactivar el planillero de la liga:', error);
        throw error;
    }
};

/**
 * Agrega un nuevo planillero a una liga.
 * @param {Object} payload - Objeto que contiene los datos necesarios para la asignación.
 * @param {number} payload.id_usuario - El ID del usuario que será asignado como planillero.
 * @param {number} payload.id_liga - El ID de la liga a la que se asignará el planillero.
 * @returns {Promise<{success: boolean, message: string}>} - Una promesa que resuelve con un objeto indicando éxito y un mensaje.
 * @throws {Error} - Si ocurre un error al realizar la solicitud o si no se encuentra un token válido.
 */
export const agregarPlanilleroLiga = async ({ id_usuario, id_liga }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(`${API_URL}/api/planilleroLiga/agregar`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_usuario, id_liga }),
        });

        if (!response.ok) {
            const data = await response.json();
            return { success: false, message: data.error || 'Error al agregar el planillero.' };
        }

        const data = await response.json();
        return { success: true, message: data.message || 'El planillero fue agregado con éxito.' };
    } catch (error) {
        console.error('Error al agregar el planillero a la liga:', error);
        throw error;
    }
};

/**
 * Agrega un nuevo usuario como planillero y lo asigna a una liga desde el frontend.
 * @param {Object} payload - Objeto que contiene los datos necesarios para la asignación.
 * @param {Object} payload.usuario - Datos del usuario.
 * @param {string} payload.usuario.primerNombre - Primer nombre del usuario.
 * @param {string} payload.usuario.segundoNombre - Segundo nombre del usuario.
 * @param {string} payload.usuario.primerApellido - Primer apellido del usuario.
 * @param {string} payload.usuario.segundoApellido - Segundo apellido del usuario.
 * @param {string} payload.usuario.email - Correo electrónico del usuario.
 * @param {string} payload.usuario.dni - Documento de identificación del usuario.
 * @param {number} payload.id_liga - El ID de la liga a la que se asignará el planillero.
 * @returns {Promise<{success: boolean, message: string}>} - Una promesa que resuelve con un objeto indicando éxito y un mensaje.
 */
export const agregarPlanilleroLigaNuevoUsuario = async ({ usuario, id_liga }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(`${API_URL}/api/planilleroLiga/agregar-nuevo-usuario`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ usuario, id_liga }),
        });

        if (!response.ok) {
            const data = await response.json();
            return { success: false, message: data.error || 'Error al agregar el planillero.' };
        }

        const data = await response.json();
        return { success: true, message: data.message || 'El planillero fue agregado con éxito.' };
    } catch (error) {
        console.error('Error al agregar el planillero a la liga:', error);
        throw error;
    }
};

/**
 * Actualiza los datos de un usuario planillero.
 * @param {number} id_usuario - ID del usuario a actualizar.
 * @param {Object} usuarioData - Datos del usuario a actualizar.
 * @param {string} usuarioData.correo - Correo del usuario.
 * @param {string} usuarioData.password - Contraseña del usuario.
 * @param {string} usuarioData.dni - Documento de identificación.
 * @param {string} usuarioData.foto - URL de la foto del usuario.
 * @param {string} usuarioData.fecha_nacimiento - Fecha de nacimiento del usuario.
 * @param {string} usuarioData.nacionalidad - Nacionalidad del usuario.
 * @param {string} usuarioData.primer_nombre - Primer nombre del usuario.
 * @param {string} usuarioData.segundo_nombre - Segundo nombre del usuario.
 * @param {string} usuarioData.primer_apellido - Primer apellido del usuario.
 * @param {string} usuarioData.segundo_apellido - Segundo apellido del usuario.
 * @param {boolean} usuarioData.activo - Estado activo del usuario.
 * @returns {Promise<{success: boolean, message: string}>} - Resultado de la operación.
 */
export const actualizarUsuarioPlanillero = async (id_usuario, usuarioData, id_liga) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(
            `${API_URL}/api/planilleroLiga/actualizar-usuario-planillero/${id_usuario}/${id_liga}`,
            {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuarioData),
            }
        );

        if (!response.ok) {
            const data = await response.json();
            return {
                success: false,
                message: data.error || 'Error al actualizar el usuario planillero.',
            };
        }

        const data = await response.json();
        return {
            success: true,
            message: data.message || 'El usuario planillero fue actualizado con éxito.',
        };
    } catch (error) {
        console.error('Error al actualizar el usuario planillero:', error);
        throw error;
    }
};

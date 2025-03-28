import { API_URL } from "@/constants";

/**
 * Función para registrar un nuevo usuario con rol de hincha
 * @param usuarioData - Datos del usuario (correo, password, datos personales)
 * @returns El usuario registrado con su rol
 */
export const registrarUsuarioHincha = async (usuarioData: any) => {
    try {
        console.log("usuarioData: ", usuarioData);
        const response = await fetch(`${API_URL}/api/usuarioRol/registro-hincha`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuarioData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al registrar el usuario con rol de hincha');
        }

        return data;
    } catch (error) {
        console.error('Error al registrar el usuario con rol de hincha:', error);
        throw error;
    }
};

/**
 * Función para verificar si un usuario tiene el rol de admin_Liga
 * @param idUsuario - ID del usuario
 * @param idRolAdminLiga - ID del rol admin_Liga
 * @returns Un objeto indicando si el usuario tiene el rol
 */
export const verificarRolAdminLiga = async (idUsuario: number, idRolAdminLiga: number) => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${API_URL}/api/usuarioRol/verificar-admin-liga/${idUsuario}/${idRolAdminLiga}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al verificar el rol de admin_Liga');
        }

        return data;
    } catch (error) {
        console.error('Error al verificar el rol de admin_Liga:', error);
        throw error;
    }
};

/**
 * Función para verificar si un usuario tiene el rol de delegado
 * @param idUsuario - ID del usuario
 * @param idRolDelegado - ID del rol delegado
 * @returns Un objeto indicando si el usuario tiene el rol
 */
export const verificarRolDelegado = async (idUsuario: number, idRolDelegado: number) => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${API_URL}/api/usuarioRol/verificar-rol-delegado/${idUsuario}/${idRolDelegado}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al verificar el rol de delegado');
        }

        return data;
    } catch (error) {
        console.error('Error al verificar el rol de delegado:', error);
        throw error;
    }
};

/**
 * Crea un nuevo registro en la tabla Usuario_Rol.
 * @async
 * @function createUsuarioRol
 * @param {Object} usuarioRolData - Datos para la creación del registro en Usuario_Rol.
 * @returns {Promise<Object>} Datos del registro creado.
 * @throws {Error} Lanza un error si falla la solicitud.
 */
export const createUsuarioRol = async (usuarioRolData) => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${API_URL}/api/usuarioRol`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuarioRolData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al crear el registro en Usuario_Rol.');
        }

        return data;
    } catch (error) {
        console.error('Error al crear el registro en Usuario_Rol:', error);
        throw error;
    }
};

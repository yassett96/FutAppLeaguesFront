import { API_URL } from "@/constants";

/**
 * Registra un usuario, una liga y su asociación en Admin_Liga_Liga. Cuando es un nuevo usuario
 * @async
 * @function registrarLigaConUsuario
 * @param {Object} usuarioData - Datos del usuario a registrar.
 * @param {Object} ligaData - Datos de la liga a registrar.
 * @returns {Promise<{ success: boolean; data?: any; message?: string }>} 
 * Retorna un objeto con `success` en true si el registro se realiza exitosamente, y opcionalmente `data` con los datos registrados. 
 * En caso de error, devuelve `success` en false y un mensaje de error.
 * @throws {Error} Lanza un error si no se encuentra el token de autenticación en el almacenamiento local.
 */
export const registrarLigaConUsuario = async (
    usuarioData: {
        primerNombre: string;
        segundoNombre: string;
        primerApellido: string;
        segundoApellido: string;
        email: string;
        dni: string;
    },
    ligaData: {
        nombre: string;
        descripcion: string;
        logo: string;
    }
): Promise<{ success: boolean; data?: any; message?: string }> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token no encontrado. Debes iniciar sesión.');

    try {
        const response = await fetch(`${API_URL}/api/adminLigaLiga/registrar-liga-usuario`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                primerNombre: usuarioData.primerNombre,
                segundoNombre: usuarioData.segundoNombre,
                primerApellido: usuarioData.primerApellido,
                segundoApellido: usuarioData.segundoApellido,
                email: usuarioData.email,
                dni: usuarioData.dni,
                league: {
                    nombre: ligaData.nombre,
                    descripcion: ligaData.descripcion,
                    logo: ligaData.logo,
                },
            }),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || 'Error al registrar la liga y el usuario.');
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error('Error al registrar la liga y el usuario:', error);
        return { success: false, message: error instanceof Error ? error.message : 'Error desconocido.' };
    }
};

/**
 * Función para crear una nueva relación entre un administrador de liga y una liga
 * @param adminLigaData - Datos necesarios para crear la relación (id_usuario, id_liga, etc.)
 * @returns La respuesta del servidor con el resultado de la operación
 */
export const registrarAdminLigaLiga = async (adminLigaData: any) => {
    try {
        const response = await fetch(`${API_URL}/api/adminLigaLiga`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`, // Añade el token de autorización
            },
            body: JSON.stringify(adminLigaData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al crear la relación entre el administrador de liga y la liga.');
        }

        return data;
    } catch (error) {
        console.error('Error al crear la relación entre el administrador de liga y la liga:', error);
        throw error;
    }
};

/**
 * Edita una liga existente y asigna un nuevo usuario administrador.
 * @async
 * @function editarLigaConNuevoUsuario
 * @param {number} id_liga - ID de la liga a editar.
 * @param {Object} nuevoUsuario - Datos del nuevo administrador.
 * @param {Object} league - Datos actualizados de la liga.
 * @returns {Promise<Object>} Respuesta de la API.
 */
export const editarLigaConNuevoUsuario = async (id_liga: number, nuevoUsuario: any, league: any) => {
    try {
        const response = await fetch(`${API_URL}/api/adminLigaLiga/editar-liga-nuevo-admin`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`, // Asumiendo que el token está almacenado en localStorage
            },
            body: JSON.stringify({
                id_liga,
                nuevoUsuario,
                league,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al editar la liga y asignar el nuevo administrador.');
        }

        return data;
    } catch (error) {
        console.error('Error al editar la liga con nuevo usuario:', error);
        throw error;
    }
};

/**
 * Registra una nueva liga y asocia un usuario existente como Admin_Liga.
 * @async
 * @function registrarLigaConUsuarioExistente
 * @param {number} id_usuario - ID del usuario existente.
 * @param {Object} leagueData - Datos de la liga a registrar.
 * @returns {Promise<Object>} Datos de la respuesta del servidor.
 * @throws {Error} Lanza un error si falla la solicitud.
 */
export const registrarLigaConUsuarioExistente = async (id_usuario, leagueData) => {
    const token = localStorage.getItem('token');
    console.log("id_usuario, leagueData: ", id_usuario, leagueData);
    try {
        const response = await fetch(`${API_URL}/api/adminLigaLiga/registrar-liga-usuario-existente`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_usuario, league: leagueData }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al registrar la liga con el usuario existente.');
        }

        return data;
    } catch (error) {
        console.error('Error al registrar la liga con el usuario existente:', error);
        throw error;
    }
};

/**
 * Servicio para editar una liga existente y asignar un nuevo administrador (Admin_Liga).
 * @async
 * @function editarLiga
 * @param {number} id_liga - ID de la liga a editar.
 * @param {number} id_usuario_nuevo_admin - ID del nuevo administrador de la liga.
 * @param {Object} league - Datos de la liga a editar (nombre, descripción, logo).
 * @returns {Promise<Object>} Devuelve los datos actualizados de la liga y del nuevo administrador.
 * @throws {Error} Si ocurre un error al intentar editar la liga.
 */
export const editarLigaConUsuarioExistente = async (
    id_liga: number,
    id_usuario_nuevo_admin: number,
    league: {
        nombre: string;
        descripcion?: string;
        logo?: string;
    }
): Promise<any> => {
    try {
        const response = await fetch(`${API_URL}/api/adminLigaLiga/editar-liga`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`, // Ajusta según cómo gestiones la autenticación
            },
            body: JSON.stringify({
                id_liga,
                id_usuario_nuevo_admin,
                league,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al editar la liga.');
        }

        return data;
    } catch (error) {
        console.error('Error al editar la liga:', error);
        throw error;
    }
};

// adminLigaService.js

/**
 * Service para obtener las ligas asignadas a un usuario con rol Admin_Liga.
 * @param {number} id_usuario - ID del usuario con rol Admin_Liga.
 * @returns {Promise<Object[]>} - Retorna una promesa que resuelve con un array de ligas asignadas.
 * @throws {Error} - Lanza un error si no puede obtener las ligas.
 */
export const obtenerLigasAsignadas = async (id_usuario) => {
    const token = localStorage.getItem('token');
    try {
        // Realizar la petición al endpoint
        const response = await fetch(`${API_URL}/api/adminLigaLiga/ligas-asignadas/${id_usuario}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData.message || 'No se pudo obtener las ligas asignadas.'
            );
        }

        // Convertir la respuesta a JSON
        const data = await response.json();

        // Retornar los datos de las ligas
        return data.ligas;
    } catch (error) {
        console.error('Error al obtener las ligas asignadas:', error.message);
        throw error;
    }
};

// /**
//  * Para obtener los datos de las ligas a las que pertenece un usuario que es Admin_Liga
//  * @param id_usuario 
//  */
// export const obtenerDatosLigasAdminLiga = async (id_usuario: number) => {
//     const token = localStorage.getItem('token');
//     try {
//         // Realizar la petición al endpoint
//         const response = await fetch(`${API_URL}/api/adminLigaLiga/datos-ligas-admin-liga/${id_usuario}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${token}`,
//             },
//         });

//         // Verificar si la respuesta es exitosa
//         if (!response.ok) {
//             return [];
//             // const errorData = await response.json();
//             // throw new Error(
//             //     errorData.message || 'No se pudo obtener la información de las ligas asignadas.'
//             // );
//         }

//         // Convertir la respuesta a JSON
//         const data = await response.json();

//         // Retornar los datos de las ligas
//         return data.ligas;
//     } catch (error) {
//         console.error('Error al obtener las ligas asignadas:', error.message);
//         throw error;
//     }
// };
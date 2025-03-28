import { API_URL } from '@/constants';
import { convertirImagenABase64 } from '@/utils/imageUtils';
import { Usuario } from '@/interfaces/usuario';

// Función para obtener los datos del usuario utilizando el token y según el correo
export const obtenerUsuarioPorCorreo = async (correo: string) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(`${API_URL}/api/usuario/correo/${correo}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        // Manejar específicamente el 404 (usuario no encontrado)
        if (response.status === 404) {
            return false;
        }

        // Si la respuesta no es OK y tampoco es 404, lanzamos un error
        if (!response.ok) {
            throw new Error('Error al obtener el usuario por correo');
        }

        const data = await response.json();
        return data; // Devuelve los datos del usuario
    } catch (error) {
        console.error('Error al obtener el usuario por correo:', error);
        throw error;
    }
};

/**
 * @function obtenerUsuarioPorCorreoExcluyendoUsuario
 * @description Obtiene un usuario por correo, excluyendo al usuario con el ID proporcionado.
 * @param {string} correo - El correo del usuario que se desea buscar.
 * @param {number} idUsuario - El ID del usuario que se desea excluir de la búsqueda.
 * @returns {Promise<Object|null>} - Devuelve un objeto con los datos del usuario si se encuentra, o `null` si no se encuentra.
 * @throws {Error} - Lanza un error si ocurre algún problema durante la solicitud.
 */
export const obtenerUsuarioPorCorreoExcluyendoUsuario = async (correo: string, idUsuario: number) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(`${API_URL}/api/usuario/correo-excluyendo-usuario-editado/${correo}/${idUsuario}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        // Si no se encuentra el usuario (404), retornamos success: false
        if (response.status === 404) {
            return { success: false, data: null, message: 'Usuario no encontrado.' };
        }

        // Si la respuesta es exitosa
        if (response.ok) {
            const data = await response.json();
            return { success: true, data };
        }

        // Si la respuesta no es 404 ni exitosa, lanzamos un error
        throw new Error('Error al obtener el usuario por correo');

    } catch (error) {
        console.error('Error al obtener el usuario por correo:', error);
        return { success: false, data: null, message: error.message || 'Error al obtener el usuario.' };
    }
};

// Función para obtener la información del usuario por DNI
export const obtenerUsuarioPorDNI = async (dni: string) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(`${API_URL}/api/usuario/dni/${dni}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        // Si la respuesta tiene un estado 404 (usuario no encontrado)
        if (response.status === 404) {
            return false;
        }

        // Si la respuesta no es correcta y no es 404, lanza un error
        if (!response.ok) {
            throw new Error('Error al obtener el usuario por DNI');
        }

        // Parsear los datos de la respuesta
        const data = await response.json();
        return data; // Devuelve los datos del usuario
    } catch (error) {
        console.error('Error al obtener el usuario por DNI:', error);
        throw error;
    }
};

/**
 * @function obtenerUsuarioPorDniExcluyendoUsuario
 * @description Obtiene un usuario por DNI, excluyendo al usuario con el ID proporcionado.
 * @param {string} dni - El DNI del usuario que se desea buscar.
 * @param {number} idUsuario - El ID del usuario que se desea excluir de la búsqueda.
 * @returns {Promise<Object|null>} - Devuelve un objeto con los datos del usuario si se encuentra, o `null` si no se encuentra.
 * @throws {Error} - Lanza un error si ocurre algún problema durante la solicitud.
 */
export const obtenerUsuarioPorDniExcluyendoUsuario = async (dni: string, idUsuario: number) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(`${API_URL}/api/usuario/dni-excluyendo-usuario-editado/${dni}/${idUsuario}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        // Manejar específicamente el 404 (usuario no encontrado)
        if (response.status === 404) {            
            const data = await response.json();
            return { success: false, data };
        }

        // Si la respuesta no es OK y tampoco es 404, lanzamos un error
        if (!response.ok) {            
            const data = await response.json();
            return { success: false, data };
        }

        const data = await response.json();
        return { success: true, data };        
    } catch (error) {
        console.error('Error al obtener el usuario por DNI:', error);
        throw error;
    }
};

/**
 * Obtiene un usuario por su ID.
 * @async
 * @function obtenerUsuarioPorId
 * @param {number} id_usuario - ID del usuario a obtener.
 * @returns {Promise<Object|boolean>} Una promesa que resuelve con los datos del usuario si se encuentra, o `false` si no existe.
 * @throws {Error} Si no se encuentra un token de autenticación o ocurre un error en la solicitud.
 */
export const obtenerUsuarioPorId = async (id_usuario: number): Promise<Usuario | boolean> => {
    // const token = localStorage.getItem('token');

    // if (!token) {
    //     throw new Error('No se encontró un token. Debes iniciar sesión.');
    // }

    try {
        const response = await fetch(`${API_URL}/api/usuario/${id_usuario}`, {
            method: 'GET',
            headers: {
                // 'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        // Si el usuario no existe (404)
        if (response.status === 404) {
            return false;
        }

        // Si la respuesta no es correcta y no es 404, lanza un error
        if (!response.ok) {
            throw new Error('Error al obtener el usuario por ID');
        }

        // Parsear y devolver los datos del usuario
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener el usuario por ID:', error);
        throw error; // Lanzamos el error para que el componente lo maneje
    }
};

// Función para obtener los datos del usuario utilizando el token en localStorage
export const obtenerDatosUsuario = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(`${API_URL}/api/usuario/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener los datos del usuario');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        throw error;
    }
};

// Función para registrar un nuevo usuario
export const registrarUsuario = async (userData: any) => {
    try {
        const response = await fetch(`${API_URL}/api/usuario`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al registrarse');
        }

        return data;
    } catch (error) {
        console.error('Error al registrarse:', error);
        throw error;
    }
};

// Servicio para actualizar la información de un usuario al iniciar sesión las primeras veces como jugador o delegado
export const actualizarUsuarioIniciacionJugador = async (
    id_usuario: number,
    foto: Blob,
    fecha_nacimiento: string,
    nacionalidad: string
) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Por favor, inicia sesión.');
    }

    // Convertir el Blob a base64
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
        reader.onloadend = async () => {
            const base64Image = reader.result; // Aquí obtenemos el base64 de la imagen

            try {
                // Obtener el usuario actual desde el backend
                const responseGet = await fetch(`${API_URL}/api/usuario/${id_usuario}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!responseGet.ok) {
                    throw new Error('Error al obtener los datos del usuario');
                }

                const usuario = await responseGet.json();

                // Añadir los campos modificados al usuario
                usuario.foto = base64Image; // Usar el base64 de la imagen
                usuario.fecha_nacimiento = fecha_nacimiento;
                usuario.nacionalidad = nacionalidad;

                // Enviar el objeto `usuario` completo de vuelta con el PUT
                const responsePut = await fetch(`${API_URL}/api/usuario/actualizar-directo/${id_usuario}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(usuario), // Enviar el usuario completo en el cuerpo de la solicitud
                });

                if (!responsePut.ok) {
                    throw new Error('Error al actualizar el usuario');
                }

                const data = await responsePut.json();
                resolve(data); // Resolvemos la promesa con los datos actualizados
            } catch (error) {
                console.error('Error al actualizar el usuario:', error);
                reject(error); // Rechazamos la promesa en caso de error
            }
        };

        reader.onerror = () => {
            reject(new Error('Error al leer el archivo de imagen'));
        };

        reader.readAsDataURL(foto); // Leer el Blob como base64
    });
};

// Servicio para actualizar la información del usuario en Editar Perfil
export const actualizarPerfilUsuario = async (
    id_usuario: number,
    primer_nombre: string,
    segundo_nombre: string,
    primer_apellido: string,
    segundo_apellido: string,
    foto: Blob | string | null,
    dni: string,
    fecha_nacimiento: string,
    nacionalidad: string
) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Por favor, inicia sesión.');
    }

    try {
        // Convertir la imagen a base64 solo si es necesario
        const base64Image = await convertirImagenABase64(foto);

        // Obtener los datos actuales del usuario
        const responseGet = await fetch(`${API_URL}/api/usuario/${id_usuario}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!responseGet.ok) {
            throw new Error('Error al obtener los datos del usuario');
        }

        const usuario = await responseGet.json();

        // Actualizar los campos con los nuevos valores
        usuario.primer_nombre = primer_nombre;
        usuario.segundo_nombre = segundo_nombre;
        usuario.primer_apellido = primer_apellido;
        usuario.segundo_apellido = segundo_apellido;
        if (base64Image) {
            usuario.foto = base64Image; // Solo actualizamos si hay imagen
        }
        usuario.dni = dni;
        usuario.fecha_nacimiento = fecha_nacimiento;
        usuario.nacionalidad = nacionalidad;

        // Enviar el objeto actualizado con el método PUT
        const responsePut = await fetch(`${API_URL}/api/usuario/actualizar-directo/${id_usuario}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuario), // Enviar el objeto usuario completo
        });

        if (!responsePut.ok) {
            throw new Error('Error al actualizar el usuario');
        }

        const data = await responsePut.json();
        return data; // Retornamos los datos actualizados
    } catch (error) {
        console.error('Error al actualizar el perfil del usuario:', error);
        throw error; // Lanzamos el error en caso de que algo falle
    }
};

// Servicio para actualizar la información del usuario en Editar Jugador con el delegado 
export const actualizarJugadorUsuario = async (
    id_usuario: number,
    primer_nombre: string,
    segundo_nombre: string,
    primer_apellido: string,
    segundo_apellido: string,
    correo: string,
    dni: string,
    id_equipo_categoria: number,
    id_liga: number
) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Por favor, inicia sesión.');
    }

    try {
        // Obtener los datos actuales del usuario
        const responseGet = await fetch(`${API_URL}/api/usuario/${id_usuario}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!responseGet.ok) {
            throw new Error('Error al obtener los datos del usuario');
        }

        const usuario = await responseGet.json();

        // Actualizar los campos con los nuevos valores
        usuario.primer_nombre = primer_nombre;
        usuario.segundo_nombre = segundo_nombre;
        usuario.primer_apellido = primer_apellido;
        usuario.segundo_apellido = segundo_apellido;
        usuario.correo = correo;
        usuario.dni = dni;
        console.log("usuario: ", usuario);
        // Enviar el objeto actualizado con el método PUT
        const responsePut = await fetch(`${API_URL}/api/usuario/actualizar/${id_usuario}/${id_equipo_categoria}/${id_liga}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuario), // Enviar el objeto usuario completo
        });

        if (!responsePut.ok) {
            throw new Error('Error al actualizar el usuario');
        }

        const data = await responsePut.json();
        return data; // Retornamos los datos actualizados
    } catch (error) {
        console.error('Error al actualizar el jugador:', error);
        throw error; // Lanzamos el error en caso de que algo falle
    }
};

// Servicio para actualizar la información del usuario Planillero
export const actualizarPlanilleroUsuario = async (
    id_usuario: number,
    primer_nombre: string,
    segundo_nombre: string,
    primer_apellido: string,
    segundo_apellido: string,
    correo: string,
    dni: string
) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Por favor, inicia sesión.');
    }

    try {
        // Obtener los datos actuales del usuario
        const responseGet = await fetch(`${API_URL}/api/usuario/${id_usuario}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!responseGet.ok) {
            throw new Error('Error al obtener los datos del usuario');
        }

        const usuario = await responseGet.json();

        // Actualizar los campos con los nuevos valores
        usuario.primer_nombre = primer_nombre;
        usuario.segundo_nombre = segundo_nombre;
        usuario.primer_apellido = primer_apellido;
        usuario.segundo_apellido = segundo_apellido;
        usuario.correo = correo;
        usuario.dni = dni;

        // Enviar el objeto actualizado con el método PUT
        const responsePut = await fetch(`${API_URL}/api/usuario/actualizar-usuario-planillero/${id_usuario}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuario), // Enviar el objeto usuario completo
        });

        if (!responsePut.ok) {
            throw new Error('Error al actualizar el usuario');
        }

        const data = await responsePut.json();
        return data; // Retornamos los datos actualizados
    } catch (error) {
        console.error('Error al actualizar el jugador:', error);
        throw error; // Lanzamos el error en caso de que algo falle
    }
};

// Servicio para cambiar la contraseña del usuario
export const cambiarContrasena = async (contraseña_actual: string, nueva_contraseña: string, confirmar_nueva_contraseña: string) => {
    const token = localStorage.getItem('token'); // Obtener el token del usuario logueado

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(`${API_URL}/api/usuario/cambiar-contrasena`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contraseña_actual,
                nueva_contraseña,
                confirmar_nueva_contraseña
            }),
        });

        if (!response.ok) {
            const errorData = await response.json(); // Lee el cuerpo de la respuesta
            throw new Error(errorData.error || 'Error al cambiar la contraseña');
        }

        const data = await response.json();
        return data; // Devolver la respuesta del servidor
    } catch (error: any) {
        throw new Error(error.message || 'Error inesperado al cambiar la contraseña');
    }
};

/**
 * Obtiene todos los usuarios activos del sistema.
 * @async
 * @function obtenerUsuariosActivos
 * @returns {Promise<Array>} Promesa que resuelve con una lista de usuarios activos.
 * @throws Error si no se encuentra un token o ocurre un problema con la solicitud.
 */
export const obtenerUsuariosActivos = async (): Promise<Array<any>> => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Por favor, inicia sesión.');
    }

    try {
        // Realizar la solicitud al backend
        const response = await fetch(`${API_URL}/api/usuario/activos`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al obtener los usuarios activos.');
        }

        // Parsear y retornar los datos de los usuarios activos
        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error al obtener los usuarios activos:', error);
        throw error;
    }
};

/**
 * Registra la nueva contraseña para un usuario específico.
 * @async
 * @function registrarPassword
 * @param {number} id_usuario - ID del usuario al que se le registrará la contraseña.
 * @param {string} nuevaPassword - Nueva contraseña que será registrada para el usuario.
 * @returns {Promise<Object>} Promesa que resuelve con la respuesta del servidor.
 * @throws {Error} Si no se encuentra un token de autenticación, la solicitud falla, o el servidor responde con un error.
 */
export const registrarPassword = async (id_usuario: number, nuevaPassword: string) => {
    // const token = localStorage.getItem('token');

    // if (!token) {
    //     throw new Error('No se encontró un token. Por favor, inicia sesión.');
    // }

    try {
        const response = await fetch(`${API_URL}/api/usuario/${id_usuario}/registrar-password`, {
            method: 'PUT',
            headers: {
                // 'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password: nuevaPassword }),
        });

        if (response.ok) {
            return true;
            // const errorData = await response.json();
            // throw new Error(errorData.message || 'Error al registrar la contraseña.');
        }

        return false;
        // const data = await response.json();
        // return data; // Retornamos los datos de la respuesta
    } catch (error) {
        console.error('Error al registrar la contraseña:', error);
        throw error; // Lanzamos el error para que el componente lo maneje
    }
};
import { API_URL } from '@/constants';

/**
 * Obtiene las categorías asociadas al Admin_Liga que inició sesión.
 * @returns {Promise<any>} - Promesa que se resuelve con las categorías asociadas o un mensaje indicando que no hay registros.
 * @throws {Error} - Lanza un error si ocurre un problema crítico (como problemas de red o autenticación).
 */
export const obtenerCategoriasPorAdminLiga = async (id_liga: number): Promise<any> => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(`${API_URL}/api/ligaCategoria/categorias/${id_liga}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al obtener las categorías.');
        }

        const responseData = await response.json();

        // Verificar si hay categorías en la respuesta
        if (!responseData.categorias || responseData.categorias.length === 0) {
            return {
                success: false,
                message: 'No se encontraron categorías asociadas.',
                categorias: [],
            };
        }

        return {
            success: true,
            categorias: responseData.categorias,
        };
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        throw error;
    }
};

/**
 * Desactiva lógicamente un registro de Liga_Categoria.
 * @async
 * @function desactivarLigaCategoria
 * @param {number} idLigaCategoria - ID del registro de Liga_Categoria a desactivar.
 * @returns {Promise<any>} - Promesa que se resuelve con la respuesta del servidor.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
export const desactivarLigaCategoria = async (idLigaCategoria: number): Promise<any> => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(`${API_URL}/api/ligaCategoria/desactivar/${idLigaCategoria}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || 'Error al desactivar la categoría.');
        }

        return responseData;
    } catch (error) {
        console.error('Error al desactivar la categoría:', error);
        throw error;
    }
};

/**
 * Registra un nuevo registro en Liga_Categoria.
 * @async
 * @function registrarLigaCategoria
 * @param {number} idLiga - ID de la liga.
 * @param {number} idCategoria - ID de la categoría.
 * @returns {Promise<{ success: boolean; message: string; data?: any }>} 
 * Retorna un objeto con `success` en true si la operación es exitosa, y opcionalmente `data` con la información del registro. 
 * En caso de error, devuelve `success` en false y un mensaje de error.
 * @throws {Error} Lanza un error si no se encuentra el token de autenticación en el almacenamiento local.
 */
export const registrarLigaCategoria = async (
    idLiga,
    idCategoria
) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token no encontrado. Debes iniciar sesión.');

    try {
        const response = await fetch(
            `${API_URL}/api/ligaCategoria/registrar/${idLiga}/${idCategoria}`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData.message || 'Error al registrar el registro de Liga_Categoria.'
            );
        }

        const data = await response.json();
        return { success: true, message: 'Registro exitoso.', data };
    } catch (error) {
        console.error('Error al registrar Liga_Categoria:', error.message);
        return { success: false, message: error.message };
    }
};

/**
 * Registra una nueva categoría y la asocia con una liga en Liga_Categoria.
 * @async
 * @function registrarCategoriaYLigaCategoria
 * @param {number} idLiga - ID de la liga.
 * @param {Object} nuevaCategoria - Objeto con los datos de la nueva categoría.
 * @param {string} nuevaCategoria.nombre - Nombre de la categoría.
 * @param {string} nuevaCategoria.genero - Género de la categoría.
 * @param {Object} nuevaCategoria.rangoEdad - Rango de edad de la categoría.
 * @param {number} nuevaCategoria.rangoEdad.inicial - Edad inicial del rango.
 * @param {number} nuevaCategoria.rangoEdad.final - Edad final del rango.
 * @returns {Promise<{ success: boolean; message: string; data?: any }>} 
 * Retorna un objeto con `success` en true si la operación es exitosa, y opcionalmente `data` con la información del registro. 
 * En caso de error, devuelve `success` en false y un mensaje de error.
 * @throws {Error} Lanza un error si no se encuentra el token de autenticación en el almacenamiento local.
 */
export const registrarCategoriaYLigaCategoria = async (idLiga, nuevaCategoria) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token no encontrado. Debes iniciar sesión.');

    try {
        const response = await fetch(
            `${API_URL}/api/ligaCategoria/registrar-categoria-y-liga-categoria/${idLiga}`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevaCategoria),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData.message || 'Error al registrar la categoría y asociarla a la liga.'
            );
        }

        const data = await response.json();
        return { success: true, message: 'Registro exitoso.', data };
    } catch (error) {
        console.error('Error al registrar categoría y Liga_Categoria:', error.message);
        return { success: false, message: error.message };
    }
};

/**
 * Obtiene los equipos asociados a una liga y categoría específica junto con la información del delegado.
 * @param {number} id_liga_categoria - ID de la relación liga-categoría.
 * @returns {Promise<any>} - Promesa que se resuelve con los equipos y la información del delegado.
 */
export const obtenerEquiposPorLigaYCategoria = async (id_liga_categoria: number): Promise<any> => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(`${API_URL}/api/ligaCategoria/equipos/${id_liga_categoria}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            // Manejar respuesta válida pero sin registros
            if (response.status === 404) {
                return {
                    success: true,
                    equipos: [],
                };
            }
            throw new Error(errorData.message || 'Error al obtener los equipos.');
        }

        const responseData = await response.json();

        // Si no hay datos en la respuesta, devolver un array vacío
        return {
            success: true,
            equipos: responseData.data || [],
        };
    } catch (error) {
        console.error('Error al obtener los equipos:', error);
        // Manejar errores críticos retornando un array vacío para evitar fallas mayores
        return {
            success: false,
            equipos: [],
        };
    }
};

/**
 * Obtiene los equipos asociados a una liga y categoría específica junto con la información del delegado.
 * @param {number} id_categoria - ID de la categoría.
 * @param {number} id_liga - ID de la liga.
 * @returns {Promise<any>} - Promesa que se resuelve con los equipos y la información del delegado.
 */
export const obtenerEquiposPorIdLigaYIdCategoria = async (id_categoria: number, id_liga: number): Promise<any> => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(`${API_URL}/api/ligaCategoria/equipos/categoria/${id_categoria}/liga/${id_liga}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            // Manejar respuesta válida pero sin registros
            if (response.status === 404) {
                return {
                    success: true,
                    equipos: [],
                };
            }
            throw new Error(errorData.message || 'Error al obtener los equipos.');
        }

        const responseData = await response.json();

        // Si no hay datos en la respuesta, devolver un array vacío
        return {
            success: true,
            equipos: responseData.data || [],
        };
    } catch (error) {
        console.error('Error al obtener los equipos:', error);
        // Manejar errores críticos retornando un array vacío para evitar fallas mayores
        return {
            success: false,
            equipos: [],
        };
    }
};

/**
 * Actualiza la categoría en la base de datos según el id_liga_categoria y id_categoria.
 * @param {number} id_liga_categoria - ID de la liga categoría.
 * @param {number} id_categoria - ID de la categoría.
 * @param {Object} categoriaData - Datos de la categoría a actualizar (nombre, genero, edad_minima, edad_maxima).
 * @returns {Promise<any>} - Promesa que se resuelve con el resultado de la actualización.
 */
export const actualizarCategoria = async (
    id_liga_categoria: number,
    id_categoria: number,
    categoriaData: {
        nombre: string;
        genero: string;
        edad_minima: string;
        edad_maxima: string;
    }
): Promise<any> => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(`${API_URL}/api/ligaCategoria/actualizar-categoria/${id_liga_categoria}/${id_categoria}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(categoriaData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            // Manejar respuesta válida pero sin registros o con errores
            if (response.status === 404) {
                return {
                    success: false,
                    message: 'Categoría no encontrada.',
                };
            }
            throw new Error(errorData.message || 'Error al actualizar la categoría.');
        }

        const responseData = await response.json();

        return {
            success: true,
            message: 'Categoría actualizada con éxito.',
            data: responseData.data,
        };
    } catch (error) {
        console.error('Error al actualizar la categoría:', error);
        // Manejar errores críticos
        return {
            success: false,
            message: 'Error al actualizar la categoría.',
        };
    }
};

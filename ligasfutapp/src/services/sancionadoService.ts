import { API_URL } from '@/constants';

// Servicio para obtener la información de la tabla Sancionados por torneo y categoría
export const obtenerTablaSancionadosPorCategoria = async (id_torneo: number, id_categoria: number) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(`${API_URL}/api/sancionado/${id_torneo}/categoria/${id_categoria}/sancionados`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener la tabla de sancionados.');
        }

        const data = await response.json();
        // Si data es null, undefined o no tiene elementos, devuelve un array vacío.
        return data && data.length ? data : [];
    } catch (error) {
        console.error('Error al obtener la tabla de sancionados:', error);
        throw error;
    }
};

/**
 * Obtiene los sancionados según la liga y la categoría.
 * @async
 * @function obtenerSancionadosPorLigaYCategoria
 * @param {number} idLigaCategoria - ID de la liga-categoría.
 * @returns {Promise<{ success: boolean; data: any[]; message: string }>} 
 * Retorna un objeto con `success: true` y un array vacío si no se encuentran datos.
 * En caso de error, devuelve `success: false` y un mensaje de error.
 * @throws {Error} Lanza un error si no se encuentra el token de autenticación en el almacenamiento local.
 */
export const obtenerSancionadosPendientesPorLigaYCategoria = async (idLigaCategoria) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token no encontrado. Debes iniciar sesión.');

    try {
        const response = await fetch(
            `${API_URL}/api/sancionado/sancionadosPendientes/${idLigaCategoria}`,
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

            // Manejar caso de "no se encuentran datos"
            if (response.status === 404) {
                return { success: true, data: [], message: 'No se encontraron sancionados.' };
            }

            throw new Error(
                errorData.message || 'Error al obtener los sancionados.'
            );
        }

        const data = await response.json();
        return { data };
    } catch (error) {
        console.error('Error al obtener los sancionados:', error.message);
        return { success: false, data: [], message: error.message };
    }
};

/**
 * Obtiene los sancionados según la liga y la categoría.
 * @async
 * @function obtenerSancionadosPorLigaYCategoria
 * @param {number} idLigaCategoria - ID de la liga-categoría.
 * @returns {Promise<{ success: boolean; data: any[]; message: string }>} 
 * Retorna un objeto con `success: true` y un array vacío si no se encuentran datos.
 * En caso de error, devuelve `success: false` y un mensaje de error.
 * @throws {Error} Lanza un error si no se encuentra el token de autenticación en el almacenamiento local.
 */
export const obtenerSancionadosJuzgadosPorLigaYCategoria = async (idLigaCategoria) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token no encontrado. Debes iniciar sesión.');

    try {
        const response = await fetch(
            `${API_URL}/api/sancionado/sancionadosJuzgados/${idLigaCategoria}`,
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

            // Manejar caso de "no se encuentran datos"
            if (response.status === 404) {
                return { success: true, data: [], message: 'No se encontraron sancionados.' };
            }

            throw new Error(
                errorData.message || 'Error al obtener los sancionados.'
            );
        }

        const data = await response.json();
        return { data };
    } catch (error) {
        console.error('Error al obtener los sancionados:', error.message);
        return { success: false, data: [], message: error.message };
    }
};

/**
 * Crea un nuevo sancionado en el sistema.
 * @async
 * @function crearSancionado
 * @param {Object} sancionadoData - Datos del nuevo sancionado.
 * @param {number} sancionadoData.id_jugador - ID del jugador sancionado.
 * @param {number} sancionadoData.id_partido - ID del partido asociado a la sanción.
 * @param {Date} sancionadoData.fecha_sancion - Fecha de la sanción.
 * @param {number} sancionadoData.fechas_sancionadas - Número total de fechas sancionadas.
 * @param {number} sancionadoData.fechas_pendientes - Número de fechas pendientes por cumplir.
 * @param {boolean} [sancionadoData.Activo=true] - Estado del sancionado (opcional, por defecto true).
 * @returns {Promise<{ success: boolean; data: any; message: string }>} 
 * Retorna un objeto con `success: true` y los datos del sancionado creado en caso de éxito.
 * En caso de error, devuelve `success: false` y un mensaje de error.
 * @throws {Error} Lanza un error si no se encuentra el token de autenticación en el almacenamiento local.
 */
export const crearSancionado = async (sancionadoData: { id_jugador: number; id_partido: number; fecha_sancion: any, fechas_sancionadas: number; fechas_pendientes: number; Activo?: boolean; }): Promise<{ success: boolean; data: any; message: string; }> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token no encontrado. Debes iniciar sesión.');

    try {
        const response = await fetch(`${API_URL}/api/sancionado/`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sancionadoData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData.message || 'Error al crear el sancionado.'
            );
        }

        const data = await response.json();
        return { success: true, data, message: 'Sancionado creado con éxito.' };
    } catch (error) {
        console.error('Error al crear sancionado:', error.message);
        return { success: false, data: null, message: error.message };
    }
};

/**
 * Actualiza un sancionado existente en el sistema.
 * @async
 * @function actualizarSancionado
 * @param {number} id_sancion - ID del sancionado que se va a actualizar.
 * @param {Object} sancionadoData - Datos del sancionado actualizados.
 * @param {number} sancionadoData.id_jugador - ID del jugador sancionado.
 * @param {number} sancionadoData.id_partido - ID del partido asociado a la sanción.
 * @param {Date} sancionadoData.fecha_sancion - Fecha de la sanción.
 * @param {number} sancionadoData.fechas_sancionadas - Número total de fechas sancionadas.
 * @param {number} sancionadoData.fechas_pendientes - Número de fechas pendientes por cumplir.
 * @param {boolean} [sancionadoData.Activo] - Estado del sancionado (opcional).
 * @returns {Promise<{ success: boolean; data: any; message: string }>}
 * Retorna un objeto con `success: true` y los datos del sancionado actualizado en caso de éxito.
 * En caso de error, devuelve `success: false` y un mensaje de error.
 * @throws {Error} Lanza un error si no se encuentra el token de autenticación en el almacenamiento local.
 */
export const actualizarSancionado = async (
    id_sancion: number,
    sancionadoData: {
        id_jugador: number;
        id_partido?: number;
        fecha_sancion: any;
        fechas_sancionadas: number;
        fechas_pendientes: number;
        Activo?: boolean;
    }
): Promise<{ success: boolean; data: any; message: string }> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token no encontrado. Debes iniciar sesión.');

    try {
        const response = await fetch(`${API_URL}/api/sancionado/${id_sancion}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sancionadoData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData.message || 'Error al actualizar el sancionado.'
            );
        }

        const data = await response.json();
        return { success: true, data, message: 'Sancionado actualizado con éxito.' };
    } catch (error: any) {
        console.error('Error al actualizar sancionado:', error.message);
        return { success: false, data: null, message: error.message };
    }
};

/**
 * Desactiva (elimina lógicamente) un sancionado existente en el sistema.
 * @async
 * @function desactivarSancionado
 * @param {number} id_sancion - ID del sancionado que se va a desactivar.
 * @returns {Promise<{ success: boolean; data: any; message: string }>}
 * Retorna un objeto con `success: true` si el sancionado fue desactivado con éxito.
 * En caso de error, devuelve `success: false` y un mensaje de error.
 * @throws {Error} Lanza un error si no se encuentra el token de autenticación en el almacenamiento local.
 */
export const desactivarSancionado = async (
    id_sancion: number
): Promise<{ success: boolean; data: any; message: string }> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token no encontrado. Debes iniciar sesión.');

    try {
        const response = await fetch(`${API_URL}/api/sancionado/desactivar/${id_sancion}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData.message || 'Error al desactivar el sancionado.'
            );
        }

        const data = await response.json();
        return { success: true, data, message: 'Sancionado desactivado con éxito.' };
    } catch (error: any) {
        console.error('Error al desactivar sancionado:', error.message);
        return { success: false, data: null, message: error.message };
    }
};
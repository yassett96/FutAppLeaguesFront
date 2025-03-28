import { API_URL } from '@/constants';

/**
 * Obtiene los fixtures del torneo Play-Off según la jornada y el torneo de playoff.
 * 
 * @async
 * @function obtenerFixturesPorJornadaTorneoPlayoff
 * @param {number} idTorneoCategoria - ID del torneo y la categoría para filtrar los fixtures.
 * @param {number} idJornada - ID de la jornada para filtrar los fixtures.
 * @returns {Promise<{ success: boolean; data?: any; message?: string }>} 
 * Retorna un objeto indicando el éxito de la operación y los datos de los fixtures o un mensaje de error.
 * @throws {Error} Lanza un error si no se encuentra el token de autenticación o si ocurre algún problema durante la solicitud.
 */
export const obtenerFixturesPorJornadaTorneoPlayoff = async (idTorneoCategoria, idJornada) => {
    const token = localStorage.getItem('token'); // Obtener el token de autenticación

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }
    
    try {
        const response = await fetch(`${API_URL}/api/fixture/fixtures-segun-jornada-torneo-playoff/${idTorneoCategoria}/${idJornada}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,  // Enviar el token en el header
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error al obtener los fixtures: ${errorData.message || 'Error desconocido.'}`);
        }

        const responseData = await response.json();
        return { success: true, data: responseData };
    } catch (error) {
        console.error('Error al obtener los fixtures:', error);
        return { success: false, message: 'Error al obtener los fixtures.' };
    }
};

/**
 * Obtiene los fixtures del torneo Liga según la jornada y el torneo de playoff.
 * 
 * @async
 * @function obtenerFixturesPorJornadaTorneoLiga
 * @param {number} idTorneoCategoria - ID del torneo y la categoría para filtrar los fixtures.
 * @param {number} idJornada - ID de la jornada para filtrar los fixtures.
 * @returns {Promise<{ success: boolean; data?: any; message?: string }>} 
 * Retorna un objeto indicando el éxito de la operación y los datos de los fixtures o un mensaje de error.
 * @throws {Error} Lanza un error si no se encuentra el token de autenticación o si ocurre algún problema durante la solicitud.
 */
export const obtenerFixturesPorJornadaTorneoLiga = async (idTorneoCategoria, idJornada) => {
    const token = localStorage.getItem('token'); // Obtener el token de autenticación

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }
    
    try {
        const response = await fetch(`${API_URL}/api/fixture/fixtures-segun-jornada-torneo-liga/${idTorneoCategoria}/${idJornada}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,  // Enviar el token en el header
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error al obtener los fixtures: ${errorData.message || 'Error desconocido.'}`);
        }

        const responseData = await response.json();
        return { success: true, data: responseData };
    } catch (error) {
        console.error('Error al obtener los fixtures:', error);
        return { success: false, message: 'Error al obtener los fixtures.' };
    }
};

/**
 * Obtiene los fixtures del torneo Liga/Play-Off según la jornada y el torneo de playoff.
 * 
 * @async
 * @function obtenerFixturesPorJornadaTorneoLigaPlayOff
 * @param {number} idTorneoCategoria - ID del torneo y la categoría para filtrar los fixtures.
 * @param {number} idJornada - ID de la jornada para filtrar los fixtures.
 * @returns {Promise<{ success: boolean; data?: any; message?: string }>} 
 * Retorna un objeto indicando el éxito de la operación y los datos de los fixtures o un mensaje de error.
 * @throws {Error} Lanza un error si no se encuentra el token de autenticación o si ocurre algún problema durante la solicitud.
 */
export const obtenerFixturesPorJornadaTorneoLigaPlayOff = async (idTorneoCategoria, idJornada) => {
    const token = localStorage.getItem('token'); // Obtener el token de autenticación

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }
    
    try {
        const response = await fetch(`${API_URL}/api/fixture/fixtures-segun-jornada-torneo-liga-playoff/${idTorneoCategoria}/${idJornada}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,  // Enviar el token en el header
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error al obtener los fixtures: ${errorData.message || 'Error desconocido.'}`);
        }

        const responseData = await response.json();
        return { success: true, data: responseData };
    } catch (error) {
        console.error('Error al obtener los fixtures:', error);
        return { success: false, message: 'Error al obtener los fixtures.' };
    }
};

/**
 * Obtiene la etapa de inicio de la copa plata según el fixture
 * 
 * @async
 * @function obtenerEtapaInicioCopaPlataSegunFixture
 * @param {number} idFixture - ID del fixture.
 * @returns {Promise<{ success: boolean; data?: any; message?: string }>} 
 * Retorna un objeto indicando el éxito de la operación y los datos de la primera etapa ó un mensaje de error.
 * @throws {Error} Lanza un error si no se encuentra el token de autenticación o si ocurre algún problema durante la solicitud.
 */
export const obtenerEtapaInicioCopaPlataSegunFixture = async (idFixture) => {
    const token = localStorage.getItem('token'); // Obtener el token de autenticación

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }
    
    try {
        const response = await fetch(`${API_URL}/api/fixture/etapa-inicio-copa-plata/${idFixture}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,  // Enviar el token en el header
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error al obtener los fixtures: ${errorData.message || 'Error desconocido.'}`);
        }

        const responseData = await response.json();
        return { success: true, data: responseData };
    } catch (error) {
        console.error('Error al obtener los fixtures:', error);
        return { success: false, message: 'Error al obtener los fixtures.' };
    }
};
import { API_URL } from '@/constants';

/**
 * Obtiene las etapas de un torneo en una categoría especídifca según el fixture
 * @async
 * @function obtenerTorneoCategoriaEtapas
 * @param {number} idFixture - ID del Fixture
 * @returns {Promise<{ success: boolean; data: any[]; message: string }>} 
 * Retorna un objeto con `success: true` y un array vacío si no se encuentran datos.
 * En caso de error, devuelve `success: false` y un mensaje de error.
 * @throws {Error} Lanza un error si no se encuentra el token de autenticación en el almacenamiento local.
 */
export const obtenerTorneoCategoriaEtapas = async (idFixture: any) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token no encontrado. Debes iniciar sesión.');

    try {
        const response = await fetch(
            `${API_URL}/api/torneoCategoriaEtapa/obtener-torneo-categoria-etapas/${idFixture}`,
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
                return { success: true, data: [], message: 'No se encontraron las etapas del torneo en la categoría específica.' };
            }

            throw new Error(
                errorData.message || 'Error al obtener las etapas del torneo en la categoría específica.'
            );
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error('Error al obtener las etapas del torneo en la categoría específica:', error.message);
        return { success: false, data: [], message: error.message };
    }
};
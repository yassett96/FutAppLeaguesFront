import { API_URL } from '@/constants';

/**
 * Actualiza el códiglo de Liga a un jugador.
 * @async
 * @function actualizarCodigoLigaSegunIdJugadorYIdLiga
 * @param {number} idJugador - ID del jugador para buscar.
 * @returns {Promise<string>} Promesa que resuelve con un mensaje de éxito o lanza un error si falla.
 * @throws Error si no se encuentra un token o ocurre un problema con la solicitud.
 */
export const actualizarCodigoLigaSegunIdJugadorYIdLiga = async (datos: any): Promise<any[]> => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        // Realizar la solicitud al backend
        const response = await fetch(`${API_URL}/api/jugadorLiga/actualizar-codigo-liga/`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos),
        });

        // Manejar errores de respuesta
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error desconocido al actualizar el código de liga id del jugador.');
        }

        // Retornar la información de la liga
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error al actualizar el código liga con ID del jugador ${datos.id_jugador}:`, error);
        throw error;
    }
};
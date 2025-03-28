import { API_URL } from '@/constants';

/**
 * Finaliza un partido y actualiza todos los datos relacionados (jugadores, equipos, posiciones, etc.)
 * @param id_partido - ID del partido a finalizar
 * @param partidoData - Datos del partido a actualizar, incluyendo resultados y eventos
 * @returns Promesa con la respuesta del servidor
 */
export const finalizarPartido = async (id_partido: number, partidoData: Record<string, any>) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(`${API_URL}/api/resultado/finalizar/${id_partido}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(partidoData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error al finalizar el partido: ${errorData.message || 'Error desconocido.'}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al finalizar el partido:', error);
        throw error;
    }
};
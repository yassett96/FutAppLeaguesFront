import { API_URL } from '@/constants';

// Servicio para desactivar el Jugador Equipo Servicio
export const desactivarJugadorEquipoCategoria = async (idJugadorEquipoCategoria: number) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(`${API_URL}/api/jugadorEquipoCategoria/desactivar/${idJugadorEquipoCategoria}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Error al desactivar la relación jugador-equipo-categoría');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al desactivar la relación jugador-equipo-categoría:', error);
        throw error;
    }
};

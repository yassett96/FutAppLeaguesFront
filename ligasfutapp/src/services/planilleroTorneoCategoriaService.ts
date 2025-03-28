import { API_URL } from '@/constants';

// Servicio para obtener las ligas que un planillero puede planillar
export const obtenerLigasPlanillero = async (id_usuario: number) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(`${API_URL}/api/planilleroTorneoCategoria/ligas/${id_usuario}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener las ligas asignadas al planillero.');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener las ligas del planillero:', error);
        throw error;
    }
};

// Servicio para obtener las categorías según la liga
export const obtenerCategoriasSegunLiga = async (id_liga: number) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(`${API_URL}/api/planilleroTorneoCategoria/categorias-segun-liga/${id_liga}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener los torneos.');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los torneos:', error);
        throw error;
    }
};

// Servicio para obtener los torneos según el usuario y la liga para el planillero
export const obtenerTorneosPorLiga = async (id_liga: number) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(`${API_URL}/api/planilleroTorneoCategoria/torneos/${id_liga}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener los torneos.');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los torneos:', error);
        throw error;
    }
};

/**
 * Servicio para obtener los Torneos según la liga y la categoría
 * @param id_liga 
 * * @param id_categoria 
 * @returns 
 */
export const obtenerTorneosPorLigaYCategoria = async (id_liga: number, id_categoria: number) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(`${API_URL}/api/planilleroTorneoCategoria/torneos/${id_liga}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener los torneos.');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los torneos:', error);
        throw error;
    }
};

// Servicio para obtener las categorías en las que el planillero está destinado a planillar según el torneo, la liga y el usuario con rol Planillero
export const obtenerCategoriasPorTorneo = async (id_liga: any, id_torneo: any) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(`${API_URL}/api/planilleroTorneoCategoria/categorias/${id_liga}/${id_torneo}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener las categorías.');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        throw error;
    }
};

// Servicio para obtener los partidos programados que el planillero debe planillar
export const obtenerPartidosPorCategoria = async (id_usuario: number, id_liga: number, id_torneo: number, id_categoria: number) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        throw new Error('No se encontró un token. Debes iniciar sesión.');
    }

    try {
        const response = await fetch(`${API_URL}/api/planilleroTorneoCategoria/partidos/${id_usuario}/${id_liga}/${id_torneo}/${id_categoria}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener los partidos.');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los partidos:', error);
        throw error;
    }
};
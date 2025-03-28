import { API_URL } from '@/constants';

/**
 * Registra un desempate.
 *
 * @param data - Objeto que contiene los datos del desempate.
 * @param data.id_partido - ID del partido.
 * @param data.ganador_penales - Equipo ganador de los penales (local o visitante).
 * @param data.goles_penales_local - Goles del equipo local en los penales.
 * @param data.goles_penales_visitante - Goles del equipo visitante en los penales.
 * @returns Una promesa que se resuelve con un objeto que indica si el registro fue exitoso.
 */
export const registrarDesempate = async (
    data: {
        id_partido: number;
        goles_penales_local: number;
        goles_penales_visitante: number;
    }
): Promise<{ success: boolean; message?: string }> => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Token no encontrado. Debes iniciar sesión.");
    }

    try {
        const response = await fetch(`${API_URL}/api/desempate/registrar`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || "Error al registrar el desempate.");
        }

        return { success: true, message: responseData.message };
    } catch (error) {
        console.error("Error al registrar el desempate:", error);
        return { success: false, message: error.message || "Error al registrar el desempate." };
    }
};

/**
 * Obtiene el desempate según el ID del partido.
 *
 * @param id_partido - ID del partido.
 * @returns Una promesa que se resuelve con los detalles del desempate o un mensaje indicando el error.
 */
export const obtenerDesempate = async (
    id_partido: number
): Promise<{ success: boolean; data?: any; message?: string }> => {
    const token = localStorage.getItem("token");

    if (!token) {
        return { success: false, message: "Token no encontrado. Debes iniciar sesión." };
    }

    try {
        const response = await fetch(`${API_URL}/api/desempate/${id_partido}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        const responseData = await response.json();

        // Verifica si la respuesta es exitosa y contiene datos
        if (!response.ok || !responseData || Object.keys(responseData).length === 0) {
            return { success: false, message: "No se encontraron datos para el desempate." };
        }

        return { success: true, data: responseData };
    } catch (error) {
        console.error("Error al obtener el desempate:", error);
        return { success: false, message: error.message || "Error al obtener el desempate." };
    }
};

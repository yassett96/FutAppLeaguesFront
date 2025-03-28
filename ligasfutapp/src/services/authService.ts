import { API_URL } from '@/constants';

// Función para hacer el login y devolver el token
export const login = async (email: string, password: string) => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                correo: email,
                password: password,
            }),
            credentials: 'include',
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error en el login');
        }

        return data; // Retornamos el token si todo está bien
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw error;
    }
};

// Servicio para recuperación de la contraseña
export const forgotPassword = async (email: string) => {
    try {
        const response = await fetch(`${API_URL}/auth/forgot-password/${email}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error en la recuperación de contraseña');
        }

        return data;
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw error;
    }
};

// Función para decodificar el JWT
export const decodeJWT = (token: string) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

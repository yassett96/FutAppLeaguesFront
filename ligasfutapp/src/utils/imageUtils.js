// Función para manejar la conversión de imagen
export const convertirImagenABase64 = (imagen) => {
    return new Promise((resolve, reject) => {
        if (!imagen) {
            resolve(null); // Si no hay imagen, resolvemos con null
        } else if (typeof imagen === 'string' && imagen.startsWith('data:image')) {
            resolve(imagen); // Si ya es una cadena base64, la retornamos tal cual
        } else {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) {
                    resolve(reader.result); // Convertimos el resultado a string (base64)
                } else {
                    reject(new Error('No se pudo leer el archivo de imagen'));
                }
            };
            reader.onerror = () => {
                reject(new Error('Error al leer el archivo de imagen'));
            };
            if (imagen instanceof Blob) {
                reader.readAsDataURL(imagen); // Intentamos leer la imagen si es un Blob
            } else {
                reject(new Error('El tipo de imagen no es soportado'));
            }
        }
    });
};
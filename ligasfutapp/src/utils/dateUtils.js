// Para formatear una fecha que está en formato yyyy-mm-dd o yyyy-mm-ddTHH:mm:ss a formato dd-mm-yyyy
export const formatearFechaDDMMYYYY = (dateString) => {
    // Si la fecha incluye tiempo, eliminar la parte de tiempo
    const [fecha] = dateString.split('T'); // Divide por "T" y solo toma la parte de la fecha

    const [year, month, day] = fecha.split('-'); // Extraer año, mes y día
    return `${day}-${month}-${year}`; // Formato dd-mm-yyyy
};

// Para obtener la fecha actual
export const obtenerFechaActual = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Los meses son de 0 a 11, así que sumamos 1
    const day = today.getDate().toString().padStart(2, '0'); // Obtenemos el día del mes y lo formateamos

    const currentDate = `${year}-${month}-${day}`;

    return currentDate;
}
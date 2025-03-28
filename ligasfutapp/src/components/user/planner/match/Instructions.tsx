import React from 'react';

const Intructions = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center">
            <div className="p-6 rounded-lg shadow-md my-6 w-full w-[80%] md:w-2/3 bg-white">
                <p className="text-black opacity-50 text-justify w-full md:w-5/6 mx-auto text-[10px] xxs:text-xl sm590:text-2xl text-shadow-lg">
                    Según lo que necesites, selecciona una de las pantallas para gestionar el partido:
                    <br />                    
                    <br />
                    * Firma: Permite verificar y registrar a los jugadores participantes en el partido.
                    <br />
                    * Datos: Accede y actualiza los datos relevantes del partido.
                    <br />
                    * Comentarios: Añade y visualiza comentarios y observaciones del partido de los capitanes y árbitros
                    <br />
                    * Resumen: Genera un resumen detallado del partido
                    <br />
                    <br />
                    Selecciona la opción que necesitas para continuar con el proceso.
                </p>
            </div>
        </div>
    );
};

export default Intructions;
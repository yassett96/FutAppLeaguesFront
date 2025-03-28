import React, { useState, useCallback } from 'react';
import Image from 'next/image';

const FormularioDesempate = ({ onFormChange, datosEquipos }) => {
    const [golesEquipoLocal, setGolesEquipoLocal] = useState<number | ''>('');
    const [golesEquipoVisitante, setGolesEquipoVisitante] = useState<number | ''>('');

    const notifyChange = useCallback((newData: any) => {
        // Pasar el estado actualizado al componente padre conservando los valores anteriores
        onFormChange && onFormChange((prevData: any) => ({
            ...prevData,            
            golesEquipoLocal,
            golesEquipoVisitante,
            ...newData,
        }));
    }, [golesEquipoLocal, golesEquipoVisitante, , onFormChange]);

    return (
        <div className="flex flex-col w-full mx-auto p-4 rounded-lg text-shadow-lg text-2xl sm:text-xl font-bold text-white">
            {/* Goles equipo local */}
            <div className="flex flex-col sm:flex-row items-center mb-4">
                <div className="flex items-center justify-center w-full sm:w-1/4 mb-2 sm:mb-0">
                    <Image src="/images/logos/Icono_Balon_Blanco.png" alt="Ícono de Fechas Sancionadas" className="mr-2 w-11 h-11" width={100} height={100} />
                    <label className="text-white text-center">Goles equipo &#39;{datosEquipos.nombre_equipo_local}&#39;:</label>
                </div>
                <input
                    type="number"
                    id="goles_equipo_visitante"
                    name="goles_equipo_visitante"
                    className="w-full sm:w-3/4 border border-gray-300 rounded-md p-2 text-black"
                    value={golesEquipoLocal}
                    onChange={(e) => {
                        const valor = e.target.value === '' ? '' : parseInt(e.target.value, 10); // Convertir a número
                        setGolesEquipoLocal(valor);
                        notifyChange({ golesEquipoLocal: valor });
                    }}
                />
            </div>

            {/* Goles equipo visitante */}
            <div className="flex flex-col sm:flex-row items-center mb-4">
                <div className="flex items-center justify-center w-full sm:w-1/4 mb-2 sm:mb-0">
                    <Image src="/images/logos/Icono_Balon_Blanco.png" alt="Ícono de Fechas Sancionadas" className="mr-2 w-11 h-11" width={100} height={100} />
                    <label className="text-white text-center">Goles equipo &#39;{datosEquipos.nombre_equipo_visitante}&#39;:</label>
                </div>
                <input
                    type="number"
                    id="goles_equipo_local"
                    name="goles_equipo_local"
                    className="w-full sm:w-3/4 border border-gray-300 rounded-md p-2 text-black"
                    value={golesEquipoVisitante}
                    onChange={(e) => {
                        const valor = e.target.value === '' ? '' : parseInt(e.target.value, 10); // Convertir a número
                        setGolesEquipoVisitante(valor);
                        notifyChange({ golesEquipoVisitante: valor });
                    }}
                />
            </div>
        </div>
    );
};

export default FormularioDesempate;
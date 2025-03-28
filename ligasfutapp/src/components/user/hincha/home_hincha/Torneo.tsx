"use client";
import React, { useState, useEffect } from 'react';

interface TorneoProps {
    torneos: Array<{ id_torneo: number; nombre_torneo: string }>;
    onTorneoSeleccionado: (torneo: any) => void;
}

const Torneo: React.FC<TorneoProps> = ({ torneos, onTorneoSeleccionado }) => {
    const [torneoSeleccionado, setTorneoSeleccionado] = useState('');

    // Convertir `torneos` en un array si es necesario
    const torneosArray = Array.isArray(torneos) ? torneos : [torneos];

    const handleTorneoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const torneoId = Number(e.target.value);
        setTorneoSeleccionado(e.target.value);
        // onTorneoSeleccionado(torneoId);

        // Buscar el torneo completo en el array
        const torneoSeleccionadoObj = torneosArray.find(
            (torneo) => torneo.id_torneo === torneoId
        );

        // Enviar el objeto si se encontró, o null/undefined si no
        onTorneoSeleccionado(torneoSeleccionadoObj);
    };

    return (
        <div className="my-6 w-full">
            <div className='-mt-[20px] flex justify-center items-center h-20 w-full'>
                <select
                    className="p-2 border border-gray-300 rounded-xl text-black font-bold opacity-50 w-[95%] xxs:w-[70%] text-sm sm750:text-2xl"
                    value={torneoSeleccionado}
                    onChange={handleTorneoChange}
                >
                    <option value="">Seleccione un torneo</option>
                    {Array.isArray(torneosArray) && torneosArray.map((torneo) => (
                        <option key={torneo.id_torneo} value={torneo.id_torneo}>
                            {torneo.nombre_torneo}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Torneo;
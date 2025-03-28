"use client";
import React, { useState } from 'react';
import Image from 'next/image';

const FechasTorneo = () => {
    const [numFechas, setNumFechas] = useState(3); // Estado para el número de fechas
    const [fechas, setFechas] = useState([]); // Estado para almacenar las fechas seleccionadas
    const [estadios, setEstadios] = useState([]); // Estado para almacenar los estadios seleccionados

    // Lista de estadios (puedes modificarla según tus necesidades)
    const opcionesEstadios = [
        { value: 'Estadio Nacional', label: 'Estadio Nacional' },
        { value: 'Estadio Monumental', label: 'Estadio Monumental' },
        { value: 'Estadio Matute', label: 'Estadio Matute' },
        { value: 'Estadio San Marcos', label: 'Estadio San Marcos' },
    ];

    // Función para manejar el cambio en el número de fechas
    const handleNumFechasChange = (event) => {
        const value = parseInt(event.target.value, 10) || 0;
        setNumFechas(value);

        // Ajustar la longitud del arreglo de fechas y estadios según el número ingresado
        const newFechas = Array.from({ length: value }, (_, i) => fechas[i] || "");
        setFechas(newFechas);

        const newEstadios = Array.from({ length: value }, (_, i) => estadios[i] || "");
        setEstadios(newEstadios);
    };

    // Función para manejar el cambio en una fecha específica
    const handleFechaChange = (index, event) => {
        const newFechas = [...fechas];
        newFechas[index] = event.target.value;
        setFechas(newFechas);
    };

    // Función para manejar el cambio en el estadio
    const handleEstadioChange = (index, event) => {
        const newEstadios = [...estadios];
        newEstadios[index] = event.target.value;
        setEstadios(newEstadios);
    };

    return (
        <div className='flex flex-col items-center justify-center'>
            <div className="flex flex-col items-center w-3/4 mb-6">
                {/* Campo para el número de fechas */}
                <div className="flex flex-col items-start mb-4 flex items-center justify-center">
                    <Image src="/images/logos/Icono_FechaMatch_Blanco.png"
                        className='shadow-lg h-10 w-10'
                        alt="Icono Fecha Match"
                        width={100}
                        height={100}
                    />
                    <label className='text-3xl font-bold text-white mb-1 text-center'>Número de fechas:</label>
                    <form className='flex items-center justify-center'>
                        <input
                            type="number"
                            min="0"
                            value={numFechas}
                            onChange={handleNumFechasChange}
                            className="border border-gray-300 rounded-md p-2 text-gray-700 text-center w-[100%]"
                            autoComplete="off"
                            inputMode="numeric"
                            pattern="\d*"
                        />
                    </form>
                </div>

                {/* Generar campos de fecha y selectbox de estadio según el número ingresado */}
                {Array.from({ length: numFechas }).map((_, index) => (
                    <div key={index} className="flex flex-col items-start mb-4 w-full">
                        <div className="flex items-center mb-1">
                            <Image
                                src="/images/logos/Icono_Fecha_Blanco.png"
                                alt="Icono de Calendario"
                                width={20}
                                height={20}
                                className="mr-2"
                            />
                            <span className='text-xl font-bold text-white'>
                                Fecha {index + 1}:
                            </span>
                        </div>
                        <input
                            type="date"
                            value={fechas[index] || ""}
                            onChange={(e) => handleFechaChange(index, e)}
                            className="border border-gray-300 rounded-md p-2 text-gray-700 w-full"
                        />
                        <select
                            value={estadios[index] || ""}
                            onChange={(e) => handleEstadioChange(index, e)}
                            className="border border-gray-300 rounded-md p-2 text-gray-700 w-full mt-2"
                        >
                            <option value="">Selecciona el estadio</option>
                            {opcionesEstadios.map((estadio, i) => (
                                <option key={i} value={estadio.value}>
                                    {estadio.label}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FechasTorneo;

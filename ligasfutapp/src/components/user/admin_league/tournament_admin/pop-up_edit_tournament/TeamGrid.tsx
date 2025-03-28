"use client";
import React, { useState } from 'react';
import Image from 'next/image';

const TablaEquipos = () => {
    const [selectedRow, setSelectedRow] = useState(null);

    const handleRowClick = (index) => {
        setSelectedRow(index);
    };

    const equipos = [
        { equipo: 'Real Madrid' },
        { equipo: 'FC Barcelona' },
        { equipo: 'Atlético Madrid' },
        { equipo: 'Sevilla FC' },
        { equipo: 'Valencia CF' },
        { equipo: 'Real Betis' },
        { equipo: 'Real Sociedad' },
        { equipo: 'Villarreal CF' },
        { equipo: 'Athletic Bilbao' },
        { equipo: 'Granada CF' },
        { equipo: 'Celta de Vigo' },
        { equipo: 'Osasuna' },
        { equipo: 'Málaga CF' },
        { equipo: 'Getafe CF' },
        { equipo: 'Levante UD' },
    ];

    return (
        <div className="mt-10">
            <div className="mb-4">
                <div className="flex flex-col lg:flex-row items-center justify-center relative">
                    <div className="flex items-center p-4">
                        <Image
                            width={100}
                            height={100}
                            src="/images/logos/Icono_Tabla_Blanco.png"
                            className="shadow-lg h-10 w-10 mt-1 mr-2"
                            alt="Icono Tabla"
                        />
                        <h3 className="text-4xl xs420:text-5xl font-bold text-center text-white mr-1 text-shadow-lg">Tabla de equipos</h3>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto w-full flex items-center justify-center">
                <div className="overflow-y-auto h-[310px] custom-scrollbar custom-scrollbarH w-2/3 lg:w-11/12 xl:w-10/12 shadow-lg">
                    <table className="w-full table-auto bg-gray-700 border border-gray-300 rounded-lg shadow-lg">
                        <thead className="bg-[#1e3a8a] text-white h-[60px] sticky top-0 z-10">
                            <tr className="border-b border-gray-300">                                
                                <th className="py-2 px-6 text-sm sm590:text-base sm670:text-xl text-center font-medium tracking-tight">Equipo</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {equipos.slice(0, 10).map((equipo, index) => (
                                <tr
                                    key={index}
                                    className={`border-b border-gray-200 cursor-pointer ${selectedRow === index ? 'bg-blue-200' : ''}`}
                                    onClick={() => handleRowClick(index)}
                                >                                    
                                    <td className="py-4 px-6 text-sm sm590:text-base sm670:text-xl text-gray-700 text-center">
                                        {equipo.equipo}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TablaEquipos;
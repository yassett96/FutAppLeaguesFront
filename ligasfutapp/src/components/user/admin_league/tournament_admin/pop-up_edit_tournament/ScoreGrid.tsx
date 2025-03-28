"use client";
import React, { useState } from "react";
import Image from "next/image";

const TablaPuntaje = () => {
    const [puntajes, setPuntajes] = useState([
        { resultados: "Ganador", puntos: "2" },
        { resultados: "Perdedor", puntos: "0" },
        { resultados: "Empate", puntos: "1" },
        { resultados: "Desempate", puntos: "0" },
    ]);

    const handlePuntajeChange = (e, index) => {
        const newPuntajes = [...puntajes];
        newPuntajes[index].puntos = e.target.value;
        setPuntajes(newPuntajes); // Actualiza el estado con los nuevos puntajes
    };

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
                        <h3 className="text-3xl xs420:text-5xl font-bold text-white mr-1 text-shadow-lg text-center">
                            Tabla de puntajes
                        </h3>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto w-full flex items-center justify-center">
                <div className="overflow-y-auto h-[310px] custom-scrollbar custom-scrollbarH w-2/3 lg:w-11/12 xl:w-10/12 shadow-lg">
                    <table className="w-full table-auto bg-gray-700 border border-gray-300 rounded-lg shadow-lg">
                        <thead className="bg-[#1e3a8a] text-white h-[60px] sticky top-0 z-10">
                            <tr className="border-b border-gray-300">                                
                                <th className="py-2 px-6 text-sm sm590:text-base sm670:text-xl text-center font-medium tracking-tight">Resultados</th>
                                <th className="py-2 px-6 text-sm sm590:text-base sm670:text-xl text-center font-medium tracking-tight">Puntos</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {puntajes.slice(0, 10).map((puntaje, index) => (
                                <tr key={index} className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>                                    
                                    <td className="py-4 px-6 text-sm sm590:text-base sm670:text-xl text-gray-700 text-center">
                                        {puntaje.resultados}
                                    </td>
                                    <td className="py-4 px-6 text-sm sm590:text-base sm670:text-xl text-gray-700 text-center">
                                        <input
                                            type="number"
                                            value={puntaje.puntos}
                                            onChange={(e) => handlePuntajeChange(e, index)}
                                            className="border border-gray-300 rounded p-2 text-center w-20"
                                        />
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

export default TablaPuntaje;

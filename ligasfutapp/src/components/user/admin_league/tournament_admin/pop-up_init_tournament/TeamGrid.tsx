"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface TeamGridProps {
    datosEquipos: Array<{
        delegado_correo: string;
        delegado_primer_apellido: string;
        delegado_primer_nombre: string;
        id_delegado_equipo_categoria: number;
        id_equipo: number;
        id_equipo_categoria: number;
        id_usuario: number;
        nombre_equipo: string;
    }>;
    onEquiposSeleccionados: (equiposSeleccionados: Array<any>) => void;
}

const TeamsGrids: React.FC<TeamGridProps> = ({
    datosEquipos,
    onEquiposSeleccionados,
}) => {
    // const [equipos, setEquipos] = useState<
    //     Array<{
    //         id_equipo: number;
    //         nombre_equipo: string;
    //         isChecked: boolean;
    //     }>
    // >([]);
    const [equipos, setEquipos] = useState<any[]>([]);
    const [selectedRow, setSelectedRow] = useState<number | null>(null);

    useEffect(() => {
        if (datosEquipos && datosEquipos.length > 0) {
            const equiposInicializados = datosEquipos.map((equipo) => ({
                id_equipo: equipo.id_equipo,
                id_equipo_categoria: equipo.id_equipo_categoria,
                nombre_equipo: equipo.nombre_equipo,
                isChecked: false,
            }));

            setEquipos(equiposInicializados);
        } else {
            // Si está vacío, inicializar equipos como un array vacío
            setEquipos([]);
        }
    }, [datosEquipos]);

    const handleRowClick = (index) => {
        setSelectedRow(index);
    };

    const handleCheckboxChange = (index: number, isChecked: boolean) => {
        const updatedEquipos = [...equipos];
        updatedEquipos[index].isChecked = isChecked;
        setEquipos(updatedEquipos);

        // Informar al padre los equipos seleccionados
        const equiposSeleccionadosConCategoria = updatedEquipos
        .filter((equipo) => equipo.isChecked)
        .map((equipo) => ({            
            id_equipo_categoria: equipo.id_equipo_categoria
        }));
        onEquiposSeleccionados(equiposSeleccionadosConCategoria);
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
                        <h3 className="text-xl sm590:text-2xl sm670:text-3xl font-bold text-center text-white mr-1 text-shadow-lg">
                            Selección de equipos que van a participar
                        </h3>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto w-full flex items-center justify-center">
                <div className="overflow-y-auto h-[310px] custom-scrollbar custom-scrollbarH w-[90%] xs360:w-[80%] shadow-lg">
                    <table className="w-full table-auto bg-gray-700 border border-gray-300 rounded-lg shadow-lg">
                        <thead className="bg-[#1e3a8a] text-white h-[60px] sticky top-0 z-10">
                            <tr className="border-b border-gray-300 text-[9px] sm590:text-sm sm670:text-xl">
                                <th className="py-2 px-6 text-center font-medium tracking-tight">
                                    Equipo
                                </th>
                                <th className="py-2 px-6 text-center font-medium tracking-tight">
                                    Seleccionar
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {equipos.map((equipo, index) => (
                                <tr
                                    key={index}
                                    className={`text-xs sm590:text-xl sm670:text-2xl border-b border-gray-200 cursor-pointer ${selectedRow === index ? "bg-blue-200" : ""
                                        }`}
                                    onClick={() => handleRowClick(index)}
                                >
                                    <td className="py-4 px-6 text-gray-700 text-center">
                                        {equipo.nombre_equipo}
                                    </td>
                                    <td className="py-4 px-6 text-gray-700 text-center">
                                        <input
                                            type="checkbox"
                                            checked={equipo.isChecked}
                                            onChange={(e) =>
                                                handleCheckboxChange(index, e.target.checked)
                                            }
                                            className="form-checkbox h-5 w-5 text-blue-600"
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

export default TeamsGrids;
"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Select from 'react-select';

const SelectCategory = ({ datosCategorias, onChange }: any) => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    // Verifica si datosCategorias y datosCategorias.data existen antes de mapear
    const opcionesCategorias = datosCategorias?.data?.map((item: any) => ({
        value: item.categoria.id_categoria, // El ID de la categoría
        label: item.categoria.nombre, // El nombre de la categoría
    })) || []; // Si datosCategorias.data es undefined, devuelve un arreglo vacío

    const handleChange = (selected: any) => {
        setSelectedOptions(selected || null);
        if (onChange) {
            onChange(selected); // Envía la selección al padre
        }
    };

    return (
        <div className="my-6 text-shadow-lg">
            <div className='flex justify-center items-center h-20 p-4 space-x-2'>
                <Image src="/images/logos/Icono_Categoria_Blanco.png" className='shadow-lgh-20 w-12 h-12' alt="Icono Categoría" width={100} height={100} />
                <p className='text-white text-3xl xs420:text-5xl text-center'>Categoría</p>
            </div>
            <div className="flex items-center justify-center">
                <div className="flex justify-center items-center h-20 w-3/4">
                    <Select
                        value={selectedOptions}
                        onChange={handleChange}
                        options={opcionesCategorias}
                        className="w-full text-black h-10"
                        placeholder="Selecciona una categoría"
                        isSearchable
                        styles={{
                            // menu: (provided) => ({
                            //     ...provided,
                            //     width: '150px', // Ajusta el ancho del menú desplegable
                            // }),
                            menuList: (provided) => ({
                                ...provided,
                                maxHeight: '115px', // Ajusta la altura máxima del menú desplegable
                            }),
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default SelectCategory;
"use client"
import React, { useState } from 'react';
import Image from 'next/image';

const SelectCity = ({ onCitySelected }) => {
    const [ciudadSeleccionada, setCitySelected] = useState('');

    const handleCiudadChange = (e) => {
        const ciudad = e.target.value;
        setCitySelected(ciudad);
        onCitySelected(ciudad);
    };

    return (
        <div className="my-6">
            <div className='flex justify-center items-center h-20'>
                <Image src="/images/logos/Icono_Ciudad.png" className='shadow-lgh-20 w-12 h-12 opacity-40' alt="Icono Categoría" width={100} height={100} />
                <p className='text-black text-center text-3xl sm590:text-5xl opacity-50'>Selecciona la ciudad de la liga</p>
            </div>
            <div className='flex justify-center items-center h-20'>
                <select className="p-2 border border-gray-300 rounded text-black font-bold opacity-50 w-full"
                    value={ciudadSeleccionada}
                    onChange={handleCiudadChange}
                >
                    <option value="Santiago">Santiago</option>
                    <option value="Valparaíso">Valparaíso</option>
                    <option value="Concepción">Concepción</option>
                    <option value="La Serena">La Serena</option>
                    <option value="Antofagasta">Antofagasta</option>
                    <option value="Temuco">Temuco</option>
                    <option value="Rancagua">Rancagua</option>
                    <option value="Iquique">Iquique</option>
                    <option value="Puerto Montt">Puerto Montt</option>
                    <option value="Coquimbo">Coquimbo</option>
                    <option value="Arica">Arica</option>
                    <option value="Punta Arenas">Punta Arenas</option>
                    <option value="Talca">Talca</option>
                    <option value="Chillán">Chillán</option>
                    <option value="Copiapó">Copiapó</option>
                </select>
            </div>
        </div>
    );
};

export default SelectCity;
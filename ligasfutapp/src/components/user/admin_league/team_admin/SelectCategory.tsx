"use client"
import React, { useState } from 'react';
import Image from 'next/image';

const SelectCategory = ({ categorias, onCategoryChange }) => {
    const [selectedCategory, setSelectedCategory] = useState('');    

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedCategory(value);
        // Encuentra la categoría seleccionada en el array
        const categoriaSeleccionada = categorias.find(categoria => categoria.id_liga_categoria === parseInt(value, 10));

        if (categoriaSeleccionada) {
            // Notifica al componente padre con ambos IDs
            onCategoryChange({
                id_categoria: categoriaSeleccionada.id_categoria,
                id_liga_categoria: categoriaSeleccionada.id_liga_categoria,
            });
        }        
    };

    return (
        <div className="my-6 text-shadow-lg w-full">
            <div className='flex justify-center items-center h-20'>
                <Image src="/images/logos/Icono_Categoria.png" className='shadow-lgh-20 w-8 sm750:w-12 h-8 sm750:h-12 opacity-40' alt="Icono Categoría" width={100} height={100} />
                <p className='text-center w-[60%] sm750:w-[30%] text-black text-xl sm590:text-2xl opacity-50'>Selecciona la categoría</p>
            </div>
            <div className='flex justify-center items-center h-20'>
                <select
                    value={selectedCategory}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded text-black text-sm sm750:text-2xl font-bold opacity-50 w-[80%] xs410:w-[40%] shadow-lg"
                >
                    <option value="" disabled>Selecciona una categoría</option>
                    {categorias.map((categoria, index) => (
                        <option key={categoria.id_liga_categoria || index} value={categoria.id_liga_categoria}>
                            {categoria.nombre_categoria}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SelectCategory;
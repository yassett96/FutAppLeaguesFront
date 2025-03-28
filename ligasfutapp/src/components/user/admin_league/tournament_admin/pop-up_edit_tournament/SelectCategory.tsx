"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Select from 'react-select';

const SelectCategory = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const options = [
        { value: 'Senior', label: 'Senior' },
        { value: 'Super Senior', label: 'Super Senior' },
        { value: 'Junior', label: 'Junior' },
        { value: 'Dorado', label: 'Dorado' },
    ];

    const handleChange = (selected) => {
        setSelectedOptions(selected || []);
    };

    return (
        <div className="my-6 text-shadow-lg">
            <div className='flex justify-center items-center h-20'>
                <Image src="/images/logos/Icono_Categoria_Blanco.png" className='shadow-lgh-20 w-12 h-12' alt="Icono Categoría" width={100} height={100} />
                <p className='text-white text-5xl'>Categoría</p>
            </div>
            <div className='flex items-center justify-center'>
                <div className='flex justify-center items-center h-20 w-3/4'>
                    <Select                        
                        value={selectedOptions}
                        onChange={handleChange}
                        options={options}
                        className="w-full text-black"                        
                        placeholder="Seleccionar..."
                    />
                </div>
            </div>
        </div>
    );
};

export default SelectCategory;
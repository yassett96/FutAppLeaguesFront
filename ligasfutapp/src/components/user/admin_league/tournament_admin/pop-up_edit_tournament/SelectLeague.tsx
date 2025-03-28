"use client"
import React, { useState } from 'react';
import Image from 'next/image';

const SelectLeague = ({  }) => {   

    return (
        <div className="my-6 text-shadow-lg">
            <div className='flex justify-center items-center h-20'>
                <Image src="/images/logos/Icono_Liga.png" className='shadow-lgh-20 w-12 h-12 opacity-40' alt="Icono Categoría" width={100} height={100} />
                <p className='text-black text-5xl opacity-50'>Selecciona la liga</p>
            </div>
            <div className='flex justify-center items-center h-20'>
                <select className="p-2 border border-gray-300 rounded text-black font-bold opacity-50 w-3/4 shadow-lg">
                    <option value="La Liga">La liga</option>
                    <option value="Liga Estelar">Liga Estelar</option>
                    <option value="Liga Pro">Liga Pro</option>
                </select>
            </div>
        </div>
    );
};

export default SelectLeague;
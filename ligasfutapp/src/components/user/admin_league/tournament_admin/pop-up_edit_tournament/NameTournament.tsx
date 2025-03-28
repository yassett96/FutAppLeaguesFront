"use client"
import React, { useState } from 'react';
import Image from 'next/image';

const NameTournament = ({  }) => {   

    return (
        <div className="my-6 text-shadow-lg">
            <div className='flex justify-center items-center h-20 p-4'>
                <Image src="/images/logos/Icono_Torneo_Blanco.png" className='shadow-lgh-20 w-12 h-12' alt="Icono Categoría" width={100} height={100} />
                <p className='text-white text-4xl xs410:text-5xl text-center'>Nombre del torneo</p>
            </div>
            <div className='flex justify-center items-center h-20'>
                <input className="p-2 border border-gray-300 rounded text-black font-bold w-3/4 shadow-lg"></input>
            </div>
        </div>
    );
};

export default NameTournament;
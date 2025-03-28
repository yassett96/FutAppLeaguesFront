"use client"
import React, { useState } from 'react';
import Image from 'next/image';

interface DescriptionTournamentProps {
    onDescripcionTorneoChange: (descripcion: string) => void;
}

const DescriptionTournament: React.FC<DescriptionTournamentProps> = ({ onDescripcionTorneoChange }) => {
    const [descripcionTorneo, setDescripcionTorneo] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const nuevoNombre = e.target.value;
        setDescripcionTorneo(nuevoNombre); // Actualiza el estado local
        onDescripcionTorneoChange(nuevoNombre); // Notifica al componente padre
    };

    return (
        <div className="my-6 text-shadow-lg">
            <div className='flex justify-center items-center h-20 p-4'>
                <Image src="/images/logos/Icono_Torneo_Blanco.png" className='shadow-lgh-20 w-8 sm750:w-12 h-8 sm750:h-12' alt="Icono Categoría" width={100} height={100} />
                <p className='text-white text-xl sm590:text-2xl xs420:text-5xl text-center'>Descripción del torneo</p>
            </div>
            <div className='flex justify-center items-center h-20'>
                <input
                    type='text'
                    className="p-2 border border-gray-300 rounded text-black font-bold w-3/4 shadow-lg text-sm sm590:text-2xl"
                    value={descripcionTorneo}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
};

export default DescriptionTournament;
"use client";
import React, { useState, useRef } from 'react';
import Image from 'next/image';

const LogoTournament = () => {
    const [league, setLeague] = useState({
        nombre: 'La Liga',
        logo: '/images/logos/Icono_Foto.png',
        descripcion: 'Descripción ejemplo de La Liga',
        verificacion: 'El administrador verificará si puede jugar con un equipo.',
    });

    const fileInputRef = useRef(null);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result;
                if (typeof result === 'string') {
                    setLeague({ ...league, logo: result });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePhotoClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="p-4 mx-auto bg-white rounded-lg opacity-90 text-black text-shadow-lg">
            <div className='flex justify-center items-center h-20'>
                <Image src="/images/logos/Icono_Foto2.png" className='shadow-lgh-20 w-12 h-12 opacity-40' alt="Icono Categoría" width={100} height={100} />
                <p className='text-black text-5xl opacity-50'>Cargue el logo del torneo</p>
            </div>
            <div className="mb-0 flex items-center justify-center">
                <div
                    className="border p-2 rounded w-32 h-32 flex items-center justify-center bg-gray-200 cursor-pointer"
                    onClick={handlePhotoClick}
                >
                    {league.logo ? (
                        <Image src={league.logo} alt="Player" className="w-full h-full object-cover" width={100} height={100} />
                    ) : (
                        <span className="text-gray-500">No image</span>
                    )}
                </div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    ref={fileInputRef}
                    className="hidden"
                />
            </div>
        </div>
    );
};

export default LogoTournament;
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const PlayerForm = ({ jugador, setPlayer }) => {
    const [player, setLocalPlayer] = useState(jugador || {});

    useEffect(() => {
        setLocalPlayer(jugador);
    }, [jugador]);

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value.replace(/[^A-Za-z0-9.@_-]/g, '');
        const updatedPlayer = { ...player, [name]: value };
        setLocalPlayer(updatedPlayer); // Actualiza el estado local
        setPlayer(updatedPlayer); // Actualiza el estado del componente padre
    };

    return (
        <div className="p-4 mx-auto rounded-lg text-white text-shadow-lg max-w-xl">
            {/* Primer Nombre */}
            <div className="mb-4 flex flex-wrap items-center justify-center text-center">
                <Image width={100} height={100} src="/images/logos/Icono_Nombres_Blanco.png" alt="Name" className="mr-1 h-10 w-10 mt-2" />
                <label className="text-xl font-bold w-full sm:w-auto">Primer nombre:</label>
                <input
                    type="text"
                    name="primer_nombre"
                    value={player.primer_nombre || ''}
                    onChange={handleInputChange}
                    className="border ml-2 p-2 rounded w-full sm:w-auto flex-1 mt-2 sm:mt-0 text-shadow-default text-black"
                    placeholder="Primer nombre"
                />
            </div>
            {/* Segundo Nombre */}
            <div className="mb-4 flex flex-wrap items-center justify-center text-center">
                <Image width={100} height={100} src="/images/logos/Icono_Nombres_Blanco.png" alt="Name" className="mr-1 h-10 w-10 mt-2" />
                <label className="text-xl font-bold w-full sm:w-auto">Segundo nombre:</label>
                <input
                    type="text"
                    name="segundo_nombre"
                    value={player.segundo_nombre || ''}
                    onChange={handleInputChange}
                    className="border ml-2 p-2 rounded w-full sm:w-auto flex-1 mt-2 sm:mt-0 text-shadow-default text-black"
                    placeholder="Segundo nombre"
                />
            </div>
            {/* Primer Apellido */}
            <div className="mb-4 flex flex-wrap items-center justify-center text-center">
                <Image width={100} height={100} src="/images/logos/Icono_Apellidos_Blanco.png" alt="Last Name" className="mr-2 h-10 w-10 mt-2" />
                <label className="text-xl font-bold w-full sm:w-auto">Primer apellido:</label>
                <input
                    type="text"
                    name="primer_apellido"
                    value={player.primer_apellido || ''}
                    onChange={handleInputChange}
                    className="border ml-2 p-2 rounded w-full sm:w-auto flex-1 mt-2 sm:mt-0 text-shadow-default text-black"
                    placeholder="Primer apellido"
                />
            </div>
            {/* Segundo Apellido */}
            <div className="mb-4 flex flex-wrap items-center justify-center text-center">
                <Image width={100} height={100} src="/images/logos/Icono_Apellidos_Blanco.png" alt="Last Name" className="mr-2 h-10 w-10 mt-2" />
                <label className="text-xl font-bold w-full sm:w-auto">Segundo apellido:</label>
                <input
                    type="text"
                    name="segundo_apellido"
                    value={player.segundo_apellido || ''}
                    onChange={handleInputChange}
                    className="border ml-2 p-2 rounded w-full sm:w-auto flex-1 mt-2 sm:mt-0 text-shadow-default text-black"
                    placeholder="Segundo apellido"
                />
            </div>
            {/* Correo */}
            <div className="mb-4 flex flex-wrap items-center justify-center text-center">
                <Image width={100} height={100} src="/images/logos/Icono_Correo_Blanco.png" alt="Email" className="mr-2 h-8 w-8 mt-2" />
                <label className="text-xl font-bold w-full sm:w-auto">Correo:</label>
                <input
                    type="email"
                    name="correo"
                    value={player.correo || ''}
                    onChange={handleInputChange}
                    className="border ml-2 p-2 rounded w-full sm:w-auto flex-1 mt-2 sm:mt-0 text-shadow-default text-black bg-white"
                    placeholder="Correo del jugador"
                />
            </div>
            {/* DNI */}
            <div className="mb-4 flex flex-wrap items-center justify-center text-center">
                <Image width={100} height={100} src="/images/logos/Icono_DNI_Blanco.png" alt="DNI" className="mr-2 h-9 w-10 mt-1" />
                <label className="text-xl font-bold w-full sm:w-auto">DNI:</label>
                <input
                    type="text"
                    name="dni"
                    value={player.dni || ''}
                    onChange={handleInputChange}
                    className="border ml-2 p-2 rounded w-full sm:w-auto flex-1 mt-2 sm:mt-0 text-shadow-default text-black"
                    placeholder='DNI'
                />
            </div>
        </div>
    );
};

export default PlayerForm;
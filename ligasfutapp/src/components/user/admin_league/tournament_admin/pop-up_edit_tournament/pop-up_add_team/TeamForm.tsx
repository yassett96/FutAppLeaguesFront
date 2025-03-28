import React from 'react';
import Image from 'next/image';

const FormularioEquipo = () => {
    return (
        <div className="flex flex-col w-100 mx-auto p-4 rounded-lg text-shadow-lg text-3xl font-bold text-black">
            <div className="flex items-center mb-4 flex-col sm500:flex-row">
                <Image src="/images/logos/Icono_Equipo_Blanco.png" alt="Ícono de Género" className="mr-2 w-11 h-11" width={100} height={100} />
                <label htmlFor="genero" className="mr-2 text-white">Equipo:</label>
                <select id="genero" name="genero" className="w-full flex-grow border border-gray-300 rounded-md p-2 mt-5 sm500:mt-0">
                    <option value="Real Madrid">Real Madrid</option>
                    <option value="Barcelona">Barcelona</option>
                    <option value="Villa Real">Villa Real</option>
                    <option value="Levante">Levante</option>
                </select>
            </div>
        </div>
    );
}

export default FormularioEquipo;
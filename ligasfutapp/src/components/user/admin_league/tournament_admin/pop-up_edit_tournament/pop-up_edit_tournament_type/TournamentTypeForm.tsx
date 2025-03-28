import React from 'react';
import Image from 'next/image';

const FormularioTipoTorneo = () => {
    return (
        <div className="flex flex-col w-100 mx-auto p-4 rounded-lg text-shadow-lg text-3xl font-bold text-black">
            <div className="flex flex-col sm500:flex-row items-center mb-4">
                <Image src="/images/logos/Icono_Tipo_Blanco.png" alt="Ícono de Tipo Torneo" className="mr-2 w-11 h-11" width={100} height={100} />
                <label htmlFor="genero" className="mr-2 text-white">Tipo Torneo:</label>
                <select id="genero" name="genero" className="flex-grow w-[80%] border border-gray-300 rounded-md p-2">
                    <option value="Liga">Liga</option>
                    <option value="Play-Off">Play-Off</option>
                    <option value="Liga/Play-Off">Liga/Play-Off</option>
                </select>
            </div>
            <div className="flex flex-col sm500:flex-row items-center mb-4">
                <Image src="/images/logos/Icono_Rondas_Blanco.png" alt="Ícono de Rondas" className="mr-2 w-11 h-11" width={100} height={100} />
                <label htmlFor="rondas" className="mr-2 text-white">Rondas:</label>
                <input type="number" id="rondas" name="rondas" placeholder="Inicial" className="w-[80%] sm500:w-40 border border-gray-300 rounded-md p-2" />
            </div>
            <div className="flex flex-col sm500:flex-row items-center mb-4">
                <Image src="/images/logos/Icono_Grupos_Blanco.png" alt="Ícono de N° Grupos" className="mr-2 w-11 h-11" width={100} height={100} />
                <label htmlFor="no_grupos" className="mr-2 text-white">N° Grupos:</label>
                <input type="number" id="no_grupos" name="no_grupos" placeholder="Inicial" className="w-[80%] sm500:w-40 border border-gray-300 rounded-md p-2" />
            </div>
            <div className="flex flex-col sm500:flex-row items-center mb-4">
                <Image src="/images/logos/Icono_Clasificados_Blanco.png" alt="Ícono de Clasificados" className="mr-2 w-11 h-11" width={100} height={100} />
                <label htmlFor="clasificados" className="mr-2 text-white">Clasificados:</label>
                <input type="number" id="clasificados" name="clasificados" placeholder="Inicial" className="w-[80%] sm500:w-40 border border-gray-300 rounded-md p-2" />
            </div>
        </div>
    );
}

export default FormularioTipoTorneo;
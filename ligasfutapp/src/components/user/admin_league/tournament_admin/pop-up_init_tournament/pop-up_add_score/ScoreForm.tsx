import React from 'react';
import Image from 'next/image';

const FormularioPuntaje = () => {
  return (
    <div className="flex flex-col w-100 mx-auto p-4 rounded-lg text-shadow-lg text-3xl font-bold text-black opacity-70">
      <div className="flex items-center mb-4">
        <Image src="/images/logos/Icono_Resultado.png" alt="Ícono de Género" className="mr-2 w-11 h-11 opacity-70" width={100} height={100} />
        <label htmlFor="genero" className="mr-2 text-gray-700">Resultados:</label>
        <select id="genero" name="genero" className="flex-grow border border-gray-300 rounded-md p-2">
          <option value="Ganador">Ganador</option>
          <option value="Perdedor">Perdedor</option>
          <option value="Empate">Empate</option>
          <option value="Desempate">Desempate</option>
        </select>
      </div>
      <div className="mb-4 items-center justify-center">
        <div className="flex items-center justify-center">
          <Image src="/images/logos/Icono_Punto.png" alt="Ícono de Edad" className="mr-2 w-11 h-11 opacity-70" width={100} height={100} />
          <label className="text-gray-700">Puntos:</label>
        </div>
        <div className="flex mt-2 justify-center">
          <input type="number" id="puntos" name="puntos" placeholder="Inicial" className="w-40 border border-gray-300 rounded-md p-2 mr-2" />
        </div>
      </div>
    </div>
  );
}

export default FormularioPuntaje;
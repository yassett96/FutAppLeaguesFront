import React, { useState } from 'react';
import Image from 'next/image';

const FormularioCategorias = ({ onNuevaCategoriaChange }) => {
  const [nuevaCategoria, setNuevaCategoria] = useState({
    genero: "",
    nombre: "",
    rangoEdad: { inicial: "", final: "" },
  });

  const handleNuevaCategoriaChange = (field, value) => {
    const updatedCategoria = {
      ...nuevaCategoria,
      [field]: field === "rangoEdad"
        ? { ...nuevaCategoria.rangoEdad, ...value }
        : value,
    };
    setNuevaCategoria(updatedCategoria);
    onNuevaCategoriaChange(updatedCategoria); // Notifica al padre
  };

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto p-4 rounded-lg text-shadow-lg text-xl sm500:text-2xl font-bold text-white">      
      {/* Campo de Género */}
      <div className="flex flex-col sm500:flex-row items-center mb-4">
        <div className="flex items-center sm500:mr-2 mb-2 sm500:mb-0">
          <Image
            src="/images/logos/Icono_Genero_Blanco.png"
            alt="Ícono de Género"
            className="mr-2 w-9 sm750:w-11 h-9 sm750:h-11"
            width={100}
            height={100}
          />
          <label htmlFor="genero" className="text-xl sm590:text-2xl text-white">
            Género:
          </label>
        </div>
        <select
          id="genero"
          name="genero"
          className="flex-grow border border-gray-300 rounded-md p-2 text-black w-full sm500:w-auto text-sm sm590:text-2xl"
          value={nuevaCategoria.genero}
          onChange={(e) => handleNuevaCategoriaChange("genero", e.target.value)}
        >
          <option value="" disabled>Selecciona</option>
          <option value="Hombre">Hombre</option>
          <option value="Mujer">Mujer</option>
          <option value="Mixto">Mixto</option>
        </select>
      </div>

      {/* Campo de Nombre */}
      <div className="flex flex-col sm500:flex-row items-center mb-4">
        <div className="flex items-center sm500:mr-2 mb-2 sm500:mb-0">
          <Image
            src="/images/logos/Icono_Categoria_Blanco.png"
            alt="Ícono de Categoría"
            className="mr-2 w-9 sm750:w-11 h-9 sm750:h-11"
            width={100}
            height={100}
          />
          <label htmlFor="categoria" className="text-white text-xl sm590:text-2xl">
            Nombre:
          </label>
        </div>
        <input
          type="text"
          id="categoria"
          name="categoria"
          className="flex-grow border border-gray-300 rounded-md p-2 h-auto text-black w-full sm500:w-auto sm500:w-auto text-sm sm590:text-2xl"
          placeholder="Ingresa el nombre de la categoría"
          value={nuevaCategoria.nombre}
          onChange={(e) => handleNuevaCategoriaChange("nombre", e.target.value)}
        />
      </div>

      {/* Campo de Rango de Edad */}
      <div className="flex flex-col items-center justify-center mb-4">
        <div className="flex items-center justify-center mb-2">
          <Image
            src="/images/logos/Icono_Rango_Blanco.png"
            alt="Ícono de Edad"
            className="mr-2 w-11 h-11"
            width={100}
            height={100}
          />
          <label className="text-white text-xl sm590:text-2xl">Rango de edad:</label>
        </div>
        <div className="flex justify-center w-full sm500:w-auto">
          <input
            type="number"
            id="edad-inicial"
            name="edad-inicial"
            placeholder="Inicial"
            className="text-black w-full sm500:w-40 border border-gray-300 rounded-md p-2 mr-2 text-sm sm590:text-2xl text-center"
            value={nuevaCategoria.rangoEdad.inicial}
            onChange={(e) =>
              handleNuevaCategoriaChange("rangoEdad", { inicial: e.target.value })
            }
          />
          <span className="self-center">-</span>
          <input
            type="number"
            id="edad-final"
            name="edad-final"
            placeholder="Final"
            className="text-black w-full sm500:w-40 border border-gray-300 rounded-md p-2 ml-2 text-sm sm590:text-2xl text-center"
            value={nuevaCategoria.rangoEdad.final}
            onChange={(e) =>
              handleNuevaCategoriaChange("rangoEdad", { final: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default FormularioCategorias;

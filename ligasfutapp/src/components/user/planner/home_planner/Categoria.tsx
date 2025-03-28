"use client";
import React, { useState } from 'react';
import Image from 'next/image';

const Categoria = ({ categorias = [], onCategoriaSeleccionada }) => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');

  const handleCategoriaChange = (e) => {
    const idCategoria = e.target.value;
    setCategoriaSeleccionada(idCategoria);
    onCategoriaSeleccionada(idCategoria);
  };

  return (
    <div className="my-6">
      <div className='flex justify-center items-center h-20'>
        <p className='text-black text-2xl xs340:text-3xl sm500:text-4xl opacity-50 text-center w-[80%]'>
          Selecciona la categoría del torneo
        </p>
      </div>
      <div className='flex justify-center items-center h-20 w-full'>
        <select
          className="p-2 border border-gray-300 rounded-xl text-black font-bold opacity-50 w-[95%] xxs:w-[70%] text-sm sm500:text-2xl"
          value={categoriaSeleccionada}
          onChange={handleCategoriaChange}
        >
          <option value="">Seleccionar categoría</option>
          {Array.isArray(categorias) && categorias.map((categoria) => (
            <option key={categoria.id_categoria} value={categoria.id_categoria}>
              {categoria.nombre}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Categoria;
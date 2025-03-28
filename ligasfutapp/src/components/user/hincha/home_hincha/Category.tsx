"use client"
import React, { useState } from 'react';
import Image from 'next/image';

const Categoria = ({ categorias, onCategoriaSeleccionada }) => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');

  const handleCategoriaChange = (e) => {
    const categoria = e.target.value;
    setCategoriaSeleccionada(categoria);
    onCategoriaSeleccionada(categoria);
  };

  return (
    <div className="w-full items-center">
      <div className="flex items-center justify-center mb-4">
        <h3 className="text-xl sm590:text-2xl font-bold text-black opacity-40 mr-1 text-blue-003366 text-shadow-lg">Categoría</h3>
        <Image src="/images/pages/Icono_Categoria.png" className='h-10 sm750:h-20 w-10 sm750:w-20 opacity-40' alt="Icono Categoría" width={100} height={100} />
      </div>      
      <div className='-mt-[18px] flex justify-center items-center h-20 w-[100%]'>
        <select className="p-2 border border-gray-300 rounded-xl text-black font-bold opacity-50 w-[95%] xxs:w-[70%] text-sm sm750:text-2xl"
          value={categoriaSeleccionada}
          onChange={handleCategoriaChange}
        >
          <option value="">Seleccione una categoría</option>
          {categorias && categorias.map((categoria: any) => (
            <option key={categoria.id_categoria} value={categoria.id_categoria}>
              {`${categoria.nombre_categoria}`}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Categoria;
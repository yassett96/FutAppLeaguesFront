import React from 'react';
import Image from 'next/image';

const Header = () => {
  return (
    <div className="flex items-center p-4 text-shadow-lg">
      <Image src="/images/logos/Icono_Nuevo.png" alt="Nuevo Evento" className="w-10 h-10 mr-2 opacity-50" width={100} height={100} />
      <h2 className="text-4xl font-bold text-black opacity-50">Agregar Puntaje</h2>
    </div>
  );
};

export default Header;
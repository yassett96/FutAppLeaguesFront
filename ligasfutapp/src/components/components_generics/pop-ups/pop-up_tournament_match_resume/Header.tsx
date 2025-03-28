import React from 'react';
import Image from 'next/image';

const Header = () => {
  return (
    <div className="text-center flex items-center p-4 text-shadow-lg">
      <Image width={100} height={100} src="/images/logos/Icono_Posicion_Actual_Blanco.png" alt="Nuevo Evento" className="w-12 h-12 mr-2" />
      <h2 className="text-4xl font-bold text-white">Resumen Partido</h2>
    </div>
  );
};

export default Header;
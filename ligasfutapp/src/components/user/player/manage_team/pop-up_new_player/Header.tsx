import React from 'react';
import Image from 'next/image';

const Header = () => {
  return (
    <div className="flex items-center p-4 text-shadow-lg text-center">
      <Image width={100} height={100} src="/images/logos/Icono_Nuevo_Blanco.png" alt="Nuevo Evento" className="w-12 h-12 mr-2" />
      <h2 className="text-4xl font-bold text-white">Nuevo Jugador</h2>
    </div>
  );
};

export default Header;
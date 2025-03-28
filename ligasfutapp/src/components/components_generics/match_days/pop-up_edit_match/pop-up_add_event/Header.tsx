import React from 'react';
import Image from 'next/image';

const Header = () => {
  return (
    <div className="flex items-center p-4 mt-5 xs270:mt-0">
      <Image width={100} height={100} src="/images/logos/Icono_Nuevo_Blanco.png" alt="Nuevo Evento" className="w-7 xs270:w-10 h-7 xs270:h-10 mr-2" />
      <h2 className="text-2xl xs270:text-4xl font-bold text-white text-center">Nuevo Evento</h2>
    </div>
  );
};

export default Header;
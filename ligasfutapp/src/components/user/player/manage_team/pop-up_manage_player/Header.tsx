import React from 'react';
import Image from 'next/image';

const Header = () => {
  return (
    <div className="flex items-center p-4 text-shadow-lg text-white text-center">
      <Image width={100} height={100} src="/images/logos/Icono_GestionarJugador_Blanco.png" alt="Nuevo Evento" className="w-10 h-10 mr-2" />
      <h2 className="text-4xl font-bold">Gestionar jugador</h2>
    </div>
  );
};

export default Header;
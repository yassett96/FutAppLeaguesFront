import React, { useState } from 'react';

const InviteForm = ({ onCorreoChange }: { onCorreoChange: (correo: string) => void }) => {
  const [correo, setCorreo] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCorreo(value);
    onCorreoChange(value); // Llamar a la función para pasar el correo al componente padre
  };

  return (
    <div className="p-4 mx-auto rounded-lg opacity-90 text-white text-center text-shadow-lg">
      <div className="mb-4 flex items-center justify-center flex-col">
        <img src="/images/logos/Icono_Correo_Blanco.png" alt="Correo" className="mr-1 h-8 sm750:h-10 w-8 sm750:w-10 mt-2" />
        <label className="text-xl sm590:text-2xl font-bold">Ingresa el correo:</label>
      </div>
      <input
        type="email"
        value={correo}
        onChange={handleInputChange}
        className="border ml-2 p-2 rounded flex-1 text-shadow-default w-full shadow-lg text-black text-sm sm590:text-2xl"
        placeholder="Correo a invitar"
      />
    </div>
  );
};

export default InviteForm;
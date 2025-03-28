import React, { useState } from 'react';
import Image from 'next/image';

interface PasswordFormProps {
  contrasenaActual: string;
  nuevaContrasena: string;
  confirmarNuevaContrasena: string;
  onInputChange: (name: string, value: string) => void; // Función para pasar el valor al padre
}

const PasswordForm: React.FC<PasswordFormProps> = ({
  contrasenaActual,
  nuevaContrasena,
  confirmarNuevaContrasena,
  onInputChange,
}) => {
  const [showPasswordActual, setShowPasswordActual] = useState(false);
  const [showPasswordNueva, setShowPasswordNueva] = useState(false);
  const [showPasswordConfirmar, setShowPasswordConfirmar] = useState(false);

  return (
    <div className="p-4 mx-auto bg-blue-900 rounded-lg opacity-90 text-black text-shadow-lg w-full max-w-3xl relative">
      {/* Campo de Contraseña actual */}
      <div className="mb-4 flex flex-wrap items-center text-center justify-center">
        <Image width={100} height={100} src="/images/logos/Icono_Nombres_Blanco.png" alt="First Name" className="mr-1 h-10 w-10 mt-2" />
        <label className="text-white text-xl font-bold w-full sm:w-auto sm:mr-4">Contraseña actual:</label>
        <div className="relative flex items-center w-full">
          <input
            type={showPasswordActual ? 'text' : 'password'}
            name="contrasena_actual"
            value={contrasenaActual}
            onChange={(e) => onInputChange('contrasena_actual', e.target.value)}
            className="border p-2 rounded flex-1 text-shadow-default w-full sm:w-auto"
            placeholder="Contraseña actual"
          />
          <button
            type="button"
            onClick={() => setShowPasswordActual(!showPasswordActual)}
            className="absolute right-3 top-3 text-black"
          >
            {showPasswordActual ? 'Ocultar' : 'Ver'}
          </button>
        </div>
      </div>

      {/* Campo de Nueva contraseña */}
      <div className="mb-4 flex flex-wrap items-center text-center justify-center">
        <Image width={100} height={100} src="/images/logos/Icono_Nombres_Blanco.png" alt="First Name" className="mr-1 h-10 w-10 mt-2" />
        <label className="text-white text-xl font-bold w-full sm:w-auto sm:mr-4">Nueva contraseña:</label>
        <div className="relative flex items-center bg-black w-full">
          <input
            type={showPasswordNueva ? 'text' : 'password'}
            name="nueva_contrasena"
            value={nuevaContrasena}
            onChange={(e) => onInputChange('nueva_contrasena', e.target.value)}
            className="border p-2 rounded flex-1 text-shadow-default w-full sm:w-auto"
            placeholder="Nueva contraseña"
          />
          <button
            type="button"
            onClick={() => setShowPasswordNueva(!showPasswordNueva)}
            className="absolute right-3 top-3 text-black"
          >
            {showPasswordNueva ? 'Ocultar' : 'Ver'}
          </button>
        </div>
      </div>

      {/* Campo de Confirmar nueva contraseña */}
      <div className="mb-4 flex flex-wrap items-center text-center justify-center">
        <Image width={100} height={100} src="/images/logos/Icono_Nombres_Blanco.png" alt="First Name" className="mr-1 h-10 w-10 mt-2" />
        <label className="text-white text-xl font-bold w-full sm:w-auto sm:mr-4">Confirmar nueva contraseña:</label>
        <div className="relative flex items-center w-full">
          <input
            type={showPasswordConfirmar ? 'text' : 'password'}
            name="confirmar_nueva_contrasena"
            value={confirmarNuevaContrasena}
            onChange={(e) => onInputChange('confirmar_nueva_contrasena', e.target.value)}
            className="border p-2 rounded flex-1 text-shadow-default w-full sm:w-auto"
            placeholder="Confirmar nueva contraseña"
          />
          <button
            type="button"
            onClick={() => setShowPasswordConfirmar(!showPasswordConfirmar)}
            className="absolute right-3 top-3 text-black"
          >
            {showPasswordConfirmar ? 'Ocultar' : 'Ver'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordForm;

import React, { useEffect, useState } from 'react';
import CustomButton from '../button/CustomButton';
import Image from 'next/image';

const CustomAlert = ({ message, show, onClose }) => {
  const [visible, setVisible] = useState(false); // Controla si el componente se renderiza
  const [animationActive, setAnimationActive] = useState(false); // Controla la animación

  // Efecto para manejar la animación de crecimiento al aparecer y decrecimiento al cerrar
  useEffect(() => {
    if (show) {
      setVisible(true);
      // Pequeño retardo para activar la animación después de mostrar el modal
      setTimeout(() => setAnimationActive(true), 50);
    } else {
      // Desactivar la animación antes de cerrar el modal
      setAnimationActive(false);
      setTimeout(() => setVisible(false), 300); // El tiempo debe coincidir con la duración de la animación
    }
  }, [show]);

  if (!visible) return null; // No renderiza nada si 'visible' es false

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 text-black">
      <div
        className={`bg-white p-6 rounded-lg shadow-lg max-w-sm w-full transform transition-transform duration-300 ${
          animationActive ? 'scale-100' : 'scale-0'
        }`}
      >
        {/* Imagen en la parte superior izquierda */}
        <div className="absolute top-0 left-0 mt-2 ml-2">
          <Image src="/images/logos/app-logo-primary.png" width={100} height={100} alt="Alerta" className="w-[100px] h-10" />
        </div>

        <p className="text-lg text-center mt-6">{message}</p> {/* Ajustamos el margen para que el texto no choque con la imagen */}

        <div className="flex justify-center mt-4">
          <CustomButton
            text="Cerrar"
            color="#3b82f6"
            width=""
            height=""
            onClick={onClose}
            className="flex-col w-[80%] sm750:w-[40%]"
            icon="/images/logos/Icono_Confirmar_Blanco.png"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;

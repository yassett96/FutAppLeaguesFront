import React, { useEffect, useState } from 'react';
import CustomButton from '../button/CustomButton';
import Image from 'next/image';

const CustomAlertAcceptOrCancel = ({ message, show, onAccept, onCancel }) => {
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
        <div className="absolute top-0 left-0 mt-2 ml-2 w-full">
          <Image src="/images/logos/app-logo-primary.png" width={100} height={100} alt="Alerta" className="w-[40%] h-10" />
        </div>

        <p className="text-lg text-center mt-6">{message}</p> {/* Ajustamos el margen para que el texto no choque con la imagen */}

        <div className="flex justify-between mt-4">
          <CustomButton
            text="Cancelar"
            color="#f87171" // Rojo para cancelar
            width=""
            height=""
            onClick={onCancel}
            className="flex-col w-[45%]"
            icon="/images/logos/Icono_Cancelar_Blanco.png"
          />
          <CustomButton
            text="Aceptar"
            color="#3b82f6" // Azul para aceptar
            width=""
            height=""
            onClick={onAccept}
            className="flex-col w-[45%]"
            icon="/images/logos/Icono_Confirmar_Blanco.png"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomAlertAcceptOrCancel;
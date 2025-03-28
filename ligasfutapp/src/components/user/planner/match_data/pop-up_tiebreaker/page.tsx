"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from './Header';
import TiebreakerForm from './TiebreakerForm';
import CustomButton from '../../../../components_generics/button/CustomButton';
import CustomAlert from '@/components/components_generics/custom_alert/CustomAlert';
import { registrarDesempate } from '@/services/desempateService';

interface PageProps {
  onClose?: () => void;
  onSave?: () => void;
  id_partido: number;
  datosEquipos: any;
  userRole: any;
}

const PopUpAddTiebreaker: React.FC<PageProps> = ({ onClose, onSave, id_partido, datosEquipos, userRole }) => {
  const [formData, setFormData] = useState<any>({});
  const [showAlertCustom, setShowAlertCustom] = useState(false);
  const [messageAlertCustom, setMessageAlertCustom] = useState('');
  const router = useRouter();

  const clickAddTiebreaker = async () => {
    console.log("formData: ", formData);
    console.log("datosEquipos: ", datosEquipos);

    const data = {
      id_partido: id_partido,
      goles_penales_local: formData.golesEquipoLocal,
      goles_penales_visitante: formData.golesEquipoVisitante,
    };

    try {
      const response = await registrarDesempate(data);

      if (response.success) {
        setMessageAlertCustom("¡Desempate registrado correctamente!");
        setShowAlertCustom(true);

        setTimeout(() => {
          if (process.env.NODE_ENV === 'production') {
            router.push(`/user/planner/match_comment.html?role=${userRole}&id_p=${id_partido}`);
          } else {
            router.push(`/user/planner/match_comment/?role=${userRole}&id_p=${id_partido}`);
          }
          // router.push(`/user/planner/match_comment/?role=${userRole}&id_p=${id_partido}`);
        }, 3000)
      }
    } catch (error) {
      console.error('Error al crear desempate:', error);
      alert("Error al crear la desempate");
    }
  };

  const handleFormChange = (data: any) => {
    setFormData(data);
  };

  const handleCloseAlertCustom = () => {
    setShowAlertCustom(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-30">
      <div className="relative bg-blue-900 rounded-lg p-6 w-full max-w-3xl z-30 overflow-auto max-h-[90vh]">
        <Header />
        <TiebreakerForm onFormChange={handleFormChange} datosEquipos={datosEquipos} />
        <div className='flex-col sm:flex-row flex items-center justify-center p-4 space-x-0 sm:space-x-5 mb-8'>
          <CustomButton text="Cancelar" color="#ef4444" width="" height="" onClick={onClose} className='flex-col w-[80%] sm750:w-[40%]' icon="/images/logos/Icono_Cancelar_Blanco.png" />
          <CustomButton text="Agregar" color="#3b82f6" width="" height="" onClick={clickAddTiebreaker} className='flex-col w-[80%] sm750:w-[40%] mt-5 sm:mt-0' icon="/images/logos/Icono_Guardar_Blanco.png" />
        </div>
        {/** Alertas de las acciones */}
        <CustomAlert message={messageAlertCustom} show={showAlertCustom} onClose={handleCloseAlertCustom} />
      </div>
    </div>
  );
};

export default PopUpAddTiebreaker;
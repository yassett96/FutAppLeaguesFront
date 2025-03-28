"use client";
import React from 'react';
import Header from '../../../../../../components/user/admin_league/tournament_admin/pop-up_edit_tournament/pop-up_add_team/Header';
import TeamForm from '../../../../../../components/user/admin_league/tournament_admin/pop-up_edit_tournament/pop-up_add_team/TeamForm';
import CustomButton from '../../../../../../components/components_generics/button/CustomButton';

interface PageProps {
  onInit?: () => void;
  onClose?: () => void;
}

const PopUpAddTeam: React.FC<PageProps> = ({ onInit, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-40">
      <div className="bg-blue-900 rounded-lg overflow-y-auto max-h-screen w-full max-w-3xl">
        <Header />
        <br />
        <TeamForm />        
        <div className='flex-col sm500:flex-row pl-4 pt-4 pr-4 pb-8 flex items-center justify-center space-x-0 sm500:space-x-5'>
          <CustomButton text="Cancelar" color="#ef4444" width="" height="" onClick={onClose} className='flex-col w-[80%] sm750:w-[40%]' icon="/images/logos/Icono_Cancelar_Blanco.png" />
          <CustomButton text="Agregar" color="#3b82f6" width="" height="" onClick={onClose} className='flex-col w-[80%] sm750:w-[40%] mt-5 sm500:mt-0' icon="/images/logos/Icono_Guardar_Blanco.png" />
        </div>
      </div>
    </div>
  );
};

export default PopUpAddTeam;
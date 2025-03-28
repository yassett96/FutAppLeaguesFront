import React, { useState } from 'react';
import Image from 'next/image';
import CustomButton from '@/components/components_generics/button/CustomButton';

interface TeamSelectionProps {
  idEquipoCategoriaLocal: any;
  idEquipoCategoriaVisitante: any;
  nombreEquipoLocal: string;
  nombreEquipoVisitante: string;
  idEquipoLocal: number;
  idEquipoVisitante: number;  
  onTeamSelect: (teamId: any, teamCategoryId: any) => void;
}

const TeamSelection: React.FC<TeamSelectionProps> = ({ idEquipoCategoriaLocal, idEquipoCategoriaVisitante, nombreEquipoLocal, nombreEquipoVisitante, idEquipoLocal, idEquipoVisitante, onTeamSelect }) => {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  const handleTeamClick = (team: 'local' | 'visitor') => {    
    const idEquipo = team === 'local' ? idEquipoLocal : idEquipoVisitante;
    const idEquipoCategoria = team === 'local' ? idEquipoCategoriaLocal : idEquipoCategoriaVisitante;

    setSelectedTeam(team);
    onTeamSelect(idEquipo, idEquipoCategoria); // Enviar el ID del equipo seleccionado a PopUpAddEvent
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex items-center justify-center mb-2">
        <Image width={100} height={100} src="/images/logos/Icono_Equipo_Blanco.png" alt="Equipo" className="w-10 h-10 mr-2" />
        <h3 className="text-4xl font-bold text-white">Equipo</h3>
      </div>
      <div className="flex-col sm500:flex-row flex items-center justify-center space-x-0 sm500:space-x-4 w-full">
        <CustomButton
          text={nombreEquipoLocal}
          color=""
          width=""
          height=""
          onClick={() => handleTeamClick('local')}
          className={`flex-col ${selectedTeam === 'local' ? 'bg-green-700' : 'bg-blue-500 '} w-[100%]`}
          icon="/images/logos/Icono_Confirmar_Blanco.png"
        />
        <CustomButton
          text={nombreEquipoVisitante}
          color=""
          width=""
          height=""
          onClick={() => handleTeamClick('visitor')}
          className={`flex-col ${selectedTeam === 'visitor' ? 'bg-green-700' : 'bg-blue-500 '} w-[100%] mt-4 sm500:mt-0`}
          icon="/images/logos/Icono_Confirmar_Blanco.png"
        />
      </div>
    </div>
  );
};

export default TeamSelection;
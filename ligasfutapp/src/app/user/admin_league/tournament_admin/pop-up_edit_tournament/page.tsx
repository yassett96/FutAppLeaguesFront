"use client";
import React, { useState } from 'react';
import Header from '../../../../../components/user/admin_league/tournament_admin/pop-up_edit_tournament/Header';
// import SelectLeague from '../../../../../components/user/admin_league/tournament_admin/pop-up_edit_tournament/SelectLeague';
import SelectCategory from '../../../../../components/user/admin_league/tournament_admin/pop-up_edit_tournament/SelectCategory';
import NameTournament from '../../../../../components/user/admin_league/tournament_admin/pop-up_edit_tournament/NameTournament';
// import LogoTournament from '../../../../../components/user/admin_league/tournament_admin/pop-up_edit_tournament/LogoTournament';
import DatesTournament from '../../../../../components/user/admin_league/tournament_admin/pop-up_edit_tournament/DateRangeTournament';
import ScoreGrid from '../../../../../components/user/admin_league/tournament_admin/pop-up_edit_tournament/ScoreGrid';
// import ScoreActionsButtons from '../../../../../components/user/admin_league/tournament_admin/pop-up_edit_tournament/ScoreActionButtons';
import TournamentType from '../../../../../components/user/admin_league/tournament_admin/pop-up_edit_tournament/TournamentType';
import TeamsGrids from '../../../../../components/user/admin_league/tournament_admin/pop-up_edit_tournament/TeamGrid';
import CustomButton from '../../../../../components/components_generics/button/CustomButton';
import TeamActionButtons from '../../../../../components/user/admin_league/tournament_admin/pop-up_edit_tournament/TeamActionButtons';
import ModifyTournamentButton from '../../../../../components/user/admin_league/tournament_admin/pop-up_edit_tournament/ModifyTournamentButton';
// import PopUpAddScore from '../../../../user/admin_league/tournament_admin/pop-up_edit_tournament/pop-up_add_score/page';
import PopUpEditTournamentType from '../../../../user/admin_league/tournament_admin/pop-up_edit_tournament/pop-up_edit_tournament_type/page';
import PopUpAddTeam from '../../../../user/admin_league/tournament_admin/pop-up_edit_tournament/pop-up_add_team/page';

interface PageProps {
  onClose?: () => void;
}

const PopUpAddCategory: React.FC<PageProps> = ({ onClose }) => {
  const [showPopUpAddScore, setshowPopUpAddScore] = useState(false);
  const [showPopUpEditTournamentType, setShowPopUpEditTournamentType] = useState(false);
  const [showPopUpAddTeam, setShowPopUpAddTeam] = useState(false);

  const handleEliminateTeam = () =>{

  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-30">
      <div className="bg-blue-900 rounded-lg overflow-y-auto max-h-screen w-full max-w-3xl">
        <Header />
        <br />
        {/* <SelectLeague /> */} {/*ELIMINAR DESPUÉS, YA NO SE OCUPA EN ADMIN_LIGA*/}
        <NameTournament />
        <SelectCategory />
        {/* <LogoTournament /> */} {/*A PRIMERA INSTANCIA NO SE OCUPARÁ, ELIMINAR DESPUÉS */}
        <DatesTournament />
        <ScoreGrid />
        <br />
        {/* <ScoreActionsButtons onAddScore={() => setshowPopUpAddScore(true)} />
        {showPopUpAddScore && <PopUpAddScore onClose={() => setshowPopUpAddScore(false)} />} */}
        <br />
        <TournamentType tipo_torneo={"Liga"} no_grupo={undefined} rondas={3} clasificados={undefined} onEditTournament={() => setShowPopUpEditTournamentType(true)} />
        {showPopUpEditTournamentType && <PopUpEditTournamentType onClose={() => setShowPopUpEditTournamentType(false)} />}
        <br />
        <TeamsGrids />
        <br />
        <div className='flex-col xs360:flex-row p-7 flex items-center justify-center space-x-0 xs360:space-x-5'>
          <CustomButton text="Agregar equipo" color="#3b82f6" width="" height="" onClick={() => setShowPopUpAddTeam(true)} className='flex-col w-[100%] sm750:w-[40%]' icon="/images/logos/Icono_Nuevo_Blanco.png" />
          <CustomButton text="Eliminar equipo" color="#ef4444" width="" height="" onClick={handleEliminateTeam} className='flex-col w-[100%] sm750:w-[40%] mt-5 xs360:mt-0' icon="/images/logos/Icono_Cancelar_Blanco.png" />
        </div>
        {showPopUpAddTeam && <PopUpAddTeam onClose={() => setShowPopUpAddTeam(false)} />}
        <br />        
        <div className='pt-4 pb-10 pr-4 pl-4 flex items-center justify-center'>
          <CustomButton text="Guardar cambios" color="#22c55e" width="" height="50px" onClick={onClose} className='flex-col w-[100%] sm750:w-[40%] mt-5 xs360:mt-0' icon="/images/logos/Icono_Guardar_Blanco.png" />
        </div>
      </div>
    </div>
  );
};

export default PopUpAddCategory;
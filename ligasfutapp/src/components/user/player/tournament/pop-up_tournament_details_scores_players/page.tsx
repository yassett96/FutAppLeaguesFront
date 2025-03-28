"use client";
import React, { useState, useEffect } from 'react';
import Header from '../../../../../components/user/player/tournament/pop-up_tournament_details_scores_players/Header';
import TopDetailScorePlayerGrid from '../../../../../components/user/player/tournament/pop-up_tournament_details_scores_players/TopDetailScorePlayerGrid';
import CustomButton from '../../../../../components/components_generics/button/CustomButton';
import { obtenerDetallesGoleador } from '@/services/jugadorService';

interface PopUpTournamentDetailScorePlayerProps {
  id_jugador: number;
  id_torneo: number;
  id_categoria: number;
  onClose?: () => void;
}

const PopUpTournamentDetailScorePlayer: React.FC<PopUpTournamentDetailScorePlayerProps> = ({ id_jugador, id_torneo, id_categoria, onClose }) => {
  const [detallesGoleador, setDetallesGoleador] = useState<any[]>([]);

  useEffect(() => {
    const fetchDetallesGoleador = async () => {
      try {
        const detalles = await obtenerDetallesGoleador(id_jugador, id_torneo, id_categoria);
        setDetallesGoleador(Array.isArray(detalles) ? detalles : [detalles]);
      } catch (error) {
        console.error('Error al obtener detalles del goleador:', error);
      }
    };

    fetchDetallesGoleador();
  }, [id_jugador, id_torneo, id_categoria]);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-30">
      {/* Contenedor del popup con scroll */}
      <div className="bg-blue-900 rounded-lg overflow-auto w-[95%] max-w-3xl max-h-[97vh]">
        <Header />
        <br />
        {/* Pasamos los detalles obtenidos a TopDetailScorePlayerGrid */}
        <TopDetailScorePlayerGrid detalles={detallesGoleador} />
        <div className="flex items-center justify-center mb-5">
          <CustomButton
            text="Aceptar"
            color="#24b364"
            width=""
            height=""
            onClick={onClose}
            className="flex-col"
            icon="/images/logos/Icono_Confirmar_Blanco.png"
            classNameText='text-sm sm590:text-xl'
            classNameIcon='w-6 sm590:h-8 w-6 sm590:w-8'
          />
        </div>
      </div>
    </div>
  );
};

export default PopUpTournamentDetailScorePlayer;
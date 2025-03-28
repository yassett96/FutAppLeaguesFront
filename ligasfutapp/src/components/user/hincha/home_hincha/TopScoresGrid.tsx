"use client";
import React, { useState } from "react";
import PopUpTournamentDetailsScoresPlayers from "../../../../components/user/hincha/home_hincha/pop-up_tournament_details_scores_players/page";
import Image from "next/image";
import CustomButton from "../../../../components/components_generics/button/CustomButton";

interface InfoTablaGoleadores {
  id_jugador: number,
  nombre_jugador: string;
  apellido_jugador: string;
  equipo: string;
  goles: number;
}

interface TablaGoleadoresProps {
  goleadores: InfoTablaGoleadores[];
  idTorneo: number;
  idCategoria: number;
}

const TablaGoleadores: React.FC<TablaGoleadoresProps> = ({ goleadores, idTorneo, idCategoria }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedJugador, setSelectedJugador] = useState<number | null>(null);

  const handleOpenPopup = (id_jugador: number) => {
    setSelectedJugador(id_jugador);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setSelectedJugador(null);
    setIsPopupOpen(false);
  };

  return (
    <div className="bg-transparent shadow border rounded-xl overflow-hidden overflow-x-auto xl1800:w-[97%] ml-[1%] mb-6">
      <div className="flex items-center px-6 py-4 bg-gray-50 h-[85px]">
        <div className="flex items-center">
          <Image width={100} height={100} src="/images/logos/Icono_Tabla.png" className="shadow-lg h-10 w-10 mt-1 mr-2 opacity-60" alt="Icono Tabla" />
          <h2 className="text-xl sm590:text-2xl sm670:text-3xl font-semibold tracking-tight text-gray-700">Tabla de Goleadores</h2>
        </div>
      </div>

      {/* Contenedor con scrollbar horizontal y vertical habilitado */}
      <div className="overflow-x-auto overflow-y-auto custom-scrollbar max-h-[615px] h-auto">
        <table className="w-full table-auto">
          <thead className="bg-[#1e3a8a] text-white h-[60px] sticky top-0 z-10 text-[9px] sm590:text-sm sm670:text-xl">
            <tr>
              <th className="py-3 px-0 sm500:px-10 text-center font-medium tracking-tight">Jugador</th>
              <th className="py-3 px-0 sm500:px-10 text-center font-medium tracking-tight">Equipo</th>
              <th className="py-3 px-0 sm500:px-10 text-center font-medium tracking-tight">Goles</th>
              <th className="py-3 px-0 sm500:px-10 text-center font-medium tracking-tight">Acción</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {goleadores.map((goleador, index) => (
              <tr key={index} className={`text-xs sm590:text-xl sm670:text-2xl border-b border-gray-200 cursor-pointer ${selectedJugador === goleador.id_jugador ? "bg-blue-200" : ""}`} onClick={() => setSelectedJugador(goleador.id_jugador)}>
                <td className="py-4 px-0 sm500:px-10 text-center text-gray-700">{`${goleador.nombre_jugador} ${goleador.apellido_jugador}`}</td>
                <td className="py-4 px-0 sm500:px-10 text-center text-gray-700">{goleador.equipo}</td>
                <td className="py-4 px-0 sm500:px-10 text-center text-gray-700">{goleador.goles}</td>
                <td className="py-4 px-0 sm500:px-10 text-center flex justify-center">
                  <CustomButton
                    disabled={goleador.goles === 0}
                    text="Detalles"
                    color="#3b81f5"
                    width=""
                    height=""
                    onClick={handleOpenPopup}
                    className={`flex-col sm500:w-full sm750:w-[80%] ${goleador.goles === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                    classNameText="text-xs sm590:text-xl sm670:text-2xl"
                    classNameIcon='w-6 sm590:h-8 w-6 sm590:w-8'
                    icon="/images/logos/Icono_Resumen_Blanco.png"                    
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PopUp con los detalles del jugador */}
      {isPopupOpen && selectedJugador !== null && (
        <PopUpTournamentDetailsScoresPlayers id_jugador={selectedJugador} id_torneo={idTorneo} id_categoria={idCategoria} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default TablaGoleadores;
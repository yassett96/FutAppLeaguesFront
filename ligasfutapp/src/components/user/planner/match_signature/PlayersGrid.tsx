import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

const PlayersGrid = ({ teamName, teamIcon, players, onPlayerChange }) => {
  const [playerData, setPlayerData] = useState(players);

  // Sincronizar el estado de playerData con los datos de players cuando cambien
  useEffect(() => {
    if (JSON.stringify(players) !== JSON.stringify(playerData)) {
      setPlayerData(players);
    }
  }, [players, playerData]);

  const handleInputChange = (index, event) => {
    const newPlayerData = [...playerData];
    newPlayerData[index].dorsal = event.target.value;
    setPlayerData(newPlayerData);
    onPlayerChange(newPlayerData);
  };
  return (
    <div className="bg-transparent shadow border rounded-xl overflow-hidden overflow-x-auto w-[98%] xl1200:w-[48.5%] xl1800:w-[49%] h-auto h-max-[675px] mb-6">
      <div className="flex items-center px-6 py-4 bg-gray-50 h-[80px]">
        <h2 className="text-xl sm590:text-2xl sm670:text-3xl font-semibold tracking-tight text-gray-700">{teamName}</h2>
        <Image width={50} height={50} src={teamIcon} alt={`${teamName} Icon`} className="ml-auto w-10 h-10" />
      </div>

      <div className="overflow-x-auto overflow-y-auto custom-scrollbar h-auto max-h-[615px]">
        <table className="w-full table-auto bg-gray-700 rounded-b-full">
          <thead className="text-[9px] sm590:text-[10px] sm670:text-xl bg-[#1e3a8a] text-white h-[60px] sticky top-0 z-1">
            <tr>
              <th className="py-3 px-1 sm500:px-10 font-medium tracking-wider tracking-tight">DNI</th>
              <th className="py-3 px-1 sm500:px-10 font-medium tracking-wider tracking-tight">Nombres</th>
              <th className="py-3 px-1 sm500:px-10 font-medium tracking-wider flex items-center justify-center tracking-tight mt-[12px]">Dorsal</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {playerData.map((player, index) => (
              <tr key={index} className="border-b border-gray-200 text-xs sm590:text-xl sm670:text-2xl">
                <td className="py-4 px-1 sm500:px-10 text-gray-700 text-center">{player.dni}</td>
                <td className="py-4 px-1 sm500:px-10 text-gray-700 text-center">{player.nombre}</td>
                <td className="py-4 px-1 sm500:px-10 text-gray-700 text-center">
                  {player.sancionado ? (
                    <p>Sancionado: {player.fechas_pendientes} fechas</p>
                  ) : (
                    <input
                      type="text"
                      value={player.dorsal}
                      onChange={(e) => handleInputChange(index, e)}
                      className="text-sm sm500:text-2xl w-[100%] sm480:w-[50%] sm750:w-[30%] text-center border border-gray-300 rounded"
                    />
                  )
                  }

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const transformJugadores = (jugadores) => {
  return jugadores.map(jugador => ({
    id_jugador: jugador.id_jugador,
    id_jugador_partido: jugador.id_jugador_partido,
    dni: jugador.dni,
    nombre: jugador.nombre,
    dorsal: jugador.dorsal || '',
    sancionado: jugador.sancionado || null,
    fechas_pendientes: jugador.fechas_pendientes || null,
  }));
};

const TeamsGrids = ({ equipoLocal, equipoVisitante, onPlayersUpdate }) => {
  const [playersLocal, setPlayersLocal] = useState(
    equipoLocal ? transformJugadores(equipoLocal.jugadores) : []
  );
  const [playersVisitante, setPlayersVisitante] = useState(
    equipoVisitante ? transformJugadores(equipoVisitante.jugadores) : []
  );

  useEffect(() => {
    if (equipoLocal) {
      setPlayersLocal(transformJugadores(equipoLocal.jugadores));
    }
  }, [equipoLocal]);

  useEffect(() => {
    if (equipoVisitante) {
      setPlayersVisitante(transformJugadores(equipoVisitante.jugadores));
    }
  }, [equipoVisitante]);

  useEffect(() => {
    const updatedData = { local: playersLocal, visitante: playersVisitante };
    if (JSON.stringify(updatedData) !== JSON.stringify({ local: equipoLocal?.jugadores, visitante: equipoVisitante?.jugadores })) {
      onPlayersUpdate(updatedData);
    }
  }, [equipoLocal?.jugadores, equipoVisitante?.jugadores, playersLocal, playersVisitante, onPlayersUpdate]);

  const handlePlayersUpdate = useCallback(() => {
    const updatedData = { local: playersLocal, visitante: playersVisitante };
    onPlayersUpdate(updatedData);
  }, [playersLocal, playersVisitante, onPlayersUpdate]);

  useEffect(() => {
    handlePlayersUpdate();
  }, [handlePlayersUpdate]);

  return (
    <div className="flex flex-col items-start space-y-0 xl1200:flex-row xl1200:space-x-10">
      {equipoLocal && (
        <PlayersGrid
          teamName={equipoLocal.nombre}
          teamIcon={equipoLocal.logo}
          players={playersLocal}
          onPlayerChange={setPlayersLocal}
        />
      )}
      {equipoVisitante && (
        <PlayersGrid
          teamName={equipoVisitante.nombre}
          teamIcon={equipoVisitante.logo}
          players={playersVisitante}
          onPlayerChange={setPlayersVisitante}
        />
      )}
    </div>
  );
};

export default TeamsGrids;
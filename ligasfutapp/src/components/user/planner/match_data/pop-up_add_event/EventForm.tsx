import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Image from 'next/image';

interface EventFormProps {
  jugadoresAsistentes: Array<{
    id_jugador_partido: number;
    id_jugador: number;
    primer_nombre: string;
    primer_apellido: string;
    dorsal: number;
  }> | null;
  onPlayerSelect: (idJugadorPartido: number | null) => void;
  onPlayerOutSelect: (idJugadorPartido: number | null) => void;
  onPlayerInSelect: (idJugadorPartido: number | null) => void;
  onObservationChange: (observacion: string) => void;
  eventType: string | null;
}

const EventForm: React.FC<EventFormProps> = ({
  jugadoresAsistentes,
  onPlayerSelect,
  onPlayerOutSelect,
  onPlayerInSelect,
  onObservationChange,
  eventType,
}) => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedPlayerOut, setSelectedPlayerOut] = useState(null);
  const [selectedPlayerIn, setSelectedPlayerIn] = useState(null);
  const [observation, setObservation] = useState('');

  // Resetear los estados cuando 'jugadoresAsistentes' cambie
  useEffect(() => {
    setSelectedPlayer(null);
    setSelectedPlayerOut(null);
    setSelectedPlayerIn(null);
    console.log("otra vez");
  }, [jugadoresAsistentes]);

  // Generamos las opciones de jugador con dorsal y nombre
  const playerOptions = jugadoresAsistentes
    ? jugadoresAsistentes.map((jugador) => ({
      value: jugador.id_jugador_partido,
      label: `${jugador.dorsal} - ${jugador.primer_nombre} ${jugador.primer_apellido}`,
    }))
    : [];

  const handlePlayerOutChange = (selectedOption: { value: number; label: string } | null) => {
    setSelectedPlayerOut(selectedOption);
    onPlayerOutSelect(selectedOption ? selectedOption.value : null);
  };

  const handlePlayerInChange = (selectedOption: { value: number; label: string } | null) => {
    setSelectedPlayerIn(selectedOption);
    onPlayerInSelect(selectedOption ? selectedOption.value : null);
  };

  const handleObservationChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setObservation(value);
    onObservationChange(value);
  };

  return (
    <div className="p-4">
      {eventType === 'Sustitución' ? (
        <>
          <div className="mb-4">
            <label className="flex flex-col xxxs:flex-row items-start xxxs:items-center mb-2 items-center justify-center">
              <Image
                width={100}
                height={100}
                src="/images/logos/soccer-player_Blanco.png"
                alt="Jugador que sale"
                className="w-10 h-10 mr-2"
              />
              <span className="text-2xl font-semibold text-white">Sale:</span>
              <Select
                className="ml-0 xxxs:ml-2 mt-2 xxxs:mt-0 w-full text-black"
                value={selectedPlayerOut}
                onChange={handlePlayerOutChange}
                options={playerOptions}
                isSearchable
                placeholder="Seleccione un jugador"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="flex flex-col xxxs:flex-row items-start xxxs:items-center mb-2 items-center justify-center">
              <Image
                width={100}
                height={100}
                src="/images/logos/soccer-player_Blanco.png"
                alt="Jugador que entra"
                className="w-10 h-10 mr-2"
              />
              <span className="text-2xl font-semibold text-white">Entra:</span>
              <Select
                className="ml-0 xxxs:ml-2 mt-2 xxxs:mt-0 w-full text-black"
                value={selectedPlayerIn}
                onChange={handlePlayerInChange}
                options={playerOptions}
                isSearchable
              />
            </label>
          </div>
        </>
      ) : (
        <div className="mb-4">
          <label className="flex flex-col xxxs:flex-row items-start xxxs:items-center mb-2 items-center justify-center">
            <Image
              width={100}
              height={100}
              src="/images/logos/soccer-player_Blanco.png"
              alt="Jugador"
              className="w-8 sm590:w-10 h-8 sm590:h-10 mr-2"
            />
            <span className="text-xl sm590:text-2xl font-semibold text-white">Jugador:</span>
            <Select
              className="ml-0 xxxs:ml-2 mt-2 xxxs:mt-0 w-full text-black"
              value={selectedPlayer}
              onChange={(option) => {
                const selectedValue = option ? option.value : null;
                setSelectedPlayer(option); // Actualizamos el estado
                onPlayerSelect(selectedValue);
              }
              }
              options={playerOptions}
              isSearchable
            />
          </label>
        </div>
      )}
      <label className="flex items-center justify-center mb-2">
        <Image
          width={100}
          height={100}
          src="/images/logos/Icono_Observación_Blanco.png"
          alt="Observaciones"
          className="w-8 sm590:w-10 h-8 sm590:h-10 mr-2"
        />
        <span className="text-xl sm590:text-2xl font-semibold text-white">Observaciones</span>
      </label>
      <textarea
        className="text-[13px] p-2 border border-gray-300 rounded w-full text-black"
        rows={4}
        value={observation}
        onChange={handleObservationChange}
      ></textarea>
    </div>
  );
};

export default EventForm;
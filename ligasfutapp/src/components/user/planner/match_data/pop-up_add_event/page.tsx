"use client";
import React, { useState } from 'react';
import Header from './Header';
import TeamSelection from './TeamSelection';
import EventForm from './EventForm';
import CustomButton from '../../../../components_generics/button/CustomButton';
import CustomAlert from '@/components/components_generics/custom_alert/CustomAlert';
import EventSelector from './EventSelector';
import { obtenerJugadoresAsistentesPorEquipo } from '@/services/partidoService';
import { crearEvento } from '@/services/eventoService';
import { EVENT_TYPES } from '@/constants';

interface PopUpAddEventProps {
  onClose?: () => void;
  equipos?: {
    nombre_equipo_local: string;
    nombre_equipo_visitante: string;
    id_equipo_local: number;
    id_equipo_visitante: number;
  } | null;
  idPartido: number;
  currentMinute: number;
  segundoTiempo: boolean;
}

const PopUpAddEvent: React.FC<PopUpAddEventProps> = ({ onClose, equipos, idPartido, currentMinute, segundoTiempo }) => {
  const [selectedTeamId, setSelectedTeamId] = React.useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = React.useState<string | null>(null);
  const [jugadoresAsistentes, setJugadoresAsistentes] = React.useState<any | null>(null);
  const [selectedPlayerMatchId, setSelectedPlayerMatchId] = React.useState<number | null>(null);
  const [selectedPlayerOutId, setSelectedPlayerOutId] = React.useState<number | null>(null);
  const [selectedPlayerInId, setSelectedPlayerInId] = React.useState<number | null>(null);
  const [observation, setObservation] = React.useState('');
  const [showAlertCustom, setShowAlertCustom] = useState(false);
  const [messageAlertCustom, setMessageAlertCustom] = useState('');

  const handleTeamSelection = async (teamId: number) => {
    setSelectedTeamId(teamId);

    const consultaJugadoresAsistentes = await obtenerJugadoresAsistentesPorEquipo(idPartido, teamId);
    setJugadoresAsistentes(consultaJugadoresAsistentes);
  };

  const handleEventSelector = (event: string) => {
    setSelectedEvent(event);
  };

  const handlePlayerSelect = (idJugadorPartido: number | null) => {
    setSelectedPlayerMatchId(idJugadorPartido);
  };

  const handleObservationChange = (observacion: string) => {
    setObservation(observacion);
  };

  const handlePlayerOutSelect = (idJugadorPartido: number | null) => {
    setSelectedPlayerOutId(idJugadorPartido);
  };

  const handlePlayerInSelect = (idJugadorPartido: number | null) => {
    setSelectedPlayerInId(idJugadorPartido);
  };

  const handleSaveEvent = async () => {
    let minutos = 0;
    let minutos_extra = 0;

    if (!segundoTiempo) {
      currentMinute > 45 ? (minutos = 45, minutos_extra = (currentMinute - 45)) : minutos = currentMinute;
    } else {
      currentMinute > 90 ? (minutos = 90, minutos_extra = (currentMinute - 90)) : minutos = currentMinute;
    }

    // Aquí no varía con los minutos_extra en el primer tiempo, 
    // porque se considera que está en el segundo tiempo cuando es mayor que 45        

    try {
      if (selectedEvent === 'Sustitución') {
        // Lógica para el evento de Sustitución
        if (selectedTeamId && selectedPlayerOutId && selectedPlayerInId) {
          const eventoSale = {
            id_partido: idPartido,
            id_jugador_partido: selectedPlayerOutId,
            equipo: selectedTeamId,
            tipo_evento: EVENT_TYPES.SUSTITUCION_SALE,
            minuto: currentMinute,
            observacion: observation,
            Activo: true,
          };

          const eventoEntra = {
            id_partido: idPartido,
            id_jugador_partido: selectedPlayerInId,
            equipo: selectedTeamId,
            tipo_evento: EVENT_TYPES.SUSTITUCION_ENTRA,
            minuto: currentMinute,
            observacion: observation,
            Activo: true,
          };

          // Crear ambos eventos de Sustitución
          const creacionEventos = await Promise.all([
            crearEvento(eventoSale),
            crearEvento(eventoEntra),
          ]);

          if (creacionEventos.every((res) => res.success)) {
            setMessageAlertCustom('¡Eventos de sustitución guardados exitosamente!');
            setShowAlertCustom(true);
            onClose?.();
          } else {
            alert('Hubo un problema al guardar los eventos de sustitución.');
          }
        } else {
          setMessageAlertCustom('¡Debe seleccionar el equipo, el jugador que sale y el jugador que entra!');
          setShowAlertCustom(true);
        }
      } else {
        // Lógica para otros tipos de eventos
        if (selectedTeamId && selectedPlayerMatchId) {
          const eventoData = {
            id_partido: idPartido,
            id_jugador_partido: selectedPlayerMatchId,
            equipo: selectedTeamId,
            tipo_evento: selectedEvent,
            minuto: currentMinute,
            observacion: observation,
            Activo: true,
          };

          const creacionEvento = await crearEvento(eventoData);

          if (creacionEvento.success) {
            setMessageAlertCustom('¡Evento guardado exitosamente!');
            setShowAlertCustom(true);
            onClose?.();
          } else {
            alert('Hubo un problema al guardar el evento.');
          }
        } else {
          setMessageAlertCustom('¡Debe seleccionar el equipo y el jugador para registrar el evento!');
          setShowAlertCustom(true);
        }
      }
    } catch (error) {
      console.error('Error al guardar el evento:', error);
      alert('Ocurrió un error inesperado. Por favor, intente nuevamente.');
    }
  };

  const handleCloseAlertCustom = () => {
    setShowAlertCustom(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-30 overflow-auto">
      <div className="relative bg-blue-900 rounded-lg p-6 w-[96%] z-30 overflow-auto max-h-[90vh]">
        <Header />
        <TeamSelection
          equipoLocal={equipos?.nombre_equipo_local || 'Equipo Local'}
          equipoVisitante={equipos?.nombre_equipo_visitante || 'Equipo Visitante'}
          idEquipoLocal={equipos?.id_equipo_local}
          idEquipoVisitante={equipos?.id_equipo_visitante}
          onTeamSelect={handleTeamSelection}
        />
        <EventSelector onSelect={handleEventSelector} />
        <EventForm
          jugadoresAsistentes={jugadoresAsistentes}
          onPlayerSelect={handlePlayerSelect}
          onPlayerOutSelect={setSelectedPlayerOutId}
          onPlayerInSelect={setSelectedPlayerInId}
          onObservationChange={handleObservationChange}
          eventType={selectedEvent}
        />

        <div className="flex-col sm500:flex-row flex items-center justify-center space-x-0 sm500:space-x-4 w-full pb-8 pr-4 pl-4">
          <CustomButton text="Cancelar" color="#ef4444" width="" height="" onClick={onClose} className={`flex-col w-[100%]`} icon="/images/logos/Icono_Cancelar_Blanco.png" classNameText='text-sm sm590:text-xl' classNameIcon='w-6 sm590:w-8 h-6 sm590:h-8' />
          <CustomButton text="Guardar" color="#3b82f6" width="" height="" onClick={handleSaveEvent} className={`flex-col w-[100%] mt-4 sm500:mt-0`} icon="/images/logos/Icono_Guardar_Blanco.png" classNameText='text-sm sm590:text-xl' classNameIcon='w-6 sm590:w-8 h-6 sm590:h-8' />
        </div>
      </div>
      {/** Alertas de las acciones */}
      <CustomAlert message={messageAlertCustom} show={showAlertCustom} onClose={handleCloseAlertCustom} />
    </div>
  );
};

export default PopUpAddEvent;
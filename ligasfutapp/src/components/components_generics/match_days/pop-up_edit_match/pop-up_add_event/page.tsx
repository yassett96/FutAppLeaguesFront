"use client";
import React, { useState } from 'react';
import Header from './Header';
import TeamSelection from './TeamSelection';
import EventForm from './EventForm';
import CustomButton from '@/components/components_generics/button/CustomButton';
import CustomAlert from '@/components/components_generics/custom_alert/CustomAlert';
import { RingLoader } from 'react-spinners';
import EventSelector from './EventSelector';
import { obtenerJugadoresAsistentesPorEquipo } from '@/services/partidoService';
import { crearEvento } from '@/services/eventoService';
import { EVENT_TYPES, USER_ROLES } from '@/constants';
import { obtenerJugadoresPlantaSegunEquipoCategoria } from '@/services/equipoCategoriaService';
import { actualizarJugadorPartido } from '@/services/jugadorPartidoService';

interface PopUpAddEventProps {
  onClose?: () => void;
  equipos?: {
    nombre_equipo_local: string;
    nombre_equipo_visitante: string;
    id_equipo_local: number;
    id_equipo_visitante: number;
    id_equipo_categoria_local: number;
    id_equipo_categoria_visitante: number;
  } | null;
  idPartido: number;
  tipoUsuario: any;
  onSave?: (evento: any) => void;
}

const PopUpAddEvent: React.FC<PopUpAddEventProps> = ({ onClose, equipos, idPartido, tipoUsuario, onSave }) => {
  const [selectedTeamId, setSelectedTeamId] = React.useState<number | null>(null);
  const [selectedTeamCategoryId, setSelectedTeamCategoryId] = React.useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = React.useState<string | null>(null);
  const [jugadores, setJugadores] = React.useState<any | null>(null);
  const [selectedPlayerMatchId, setSelectedPlayerMatchId] = React.useState<number | null>(null);
  const [selectedPlayerOutId, setSelectedPlayerOutId] = React.useState<number | null>(null);
  const [selectedPlayerInId, setSelectedPlayerInId] = React.useState<number | null>(null);
  const [observation, setObservation] = React.useState('');
  const [minute, setMinute] = React.useState(0);
  const [showAlertCustom, setShowAlertCustom] = useState(false);
  const [messageAlertCustom, setMessageAlertCustom] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTeamSelection = async (teamId: any, teamCategoryId: any) => {
    setSelectedTeamId(teamId);
    setSelectedTeamCategoryId(teamCategoryId);

    if (tipoUsuario === USER_ROLES.PLANILLERO) {
      const consultaJugadoresAsistentes = await obtenerJugadoresAsistentesPorEquipo(idPartido, teamId);
      setJugadores(consultaJugadoresAsistentes);
    }

    if (tipoUsuario === USER_ROLES.ADMIN_LIGA) {
      const consultaJugadores = await obtenerJugadoresPlantaSegunEquipoCategoria(teamCategoryId);
      setJugadores(consultaJugadores.data);
    }

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

  const handleMinuteChange = (minute: number) => {
    setMinute(minute);
  };

  const handleSaveEvent = async () => {
    setIsLoading(true);
    let minutos = 0;
    let minutos_extra = 0;

    // Aquí no varía con los minutos_extra en el primer tiempo, 
    // porque se considera que está en el segundo tiempo cuando es mayor que 45    
    minute > 90 ? (minutos = 90, minutos_extra = (minute - 90)) : minutos = minute;

    try {
      let jugadorPartido = null;
      let jugadorPartidoEntra = null;
      let jugadorPartidoSale = null;

      if (selectedEvent === 'Sustitución') {
        if (tipoUsuario === USER_ROLES.ADMIN_LIGA) {
          const jugadorEntra = [{
            id_jugador: selectedPlayerInId,
            id_partido: idPartido,
            dorsal: 0,
            asistencia: true,
            capitan: 0,
            activo: 1
          }];

          const jugadorSale = [{
            id_jugador: selectedPlayerOutId,
            id_partido: idPartido,
            dorsal: 0,
            asistencia: true,
            capitan: 0,
            activo: 1
          }];

          jugadorPartidoEntra = await actualizarJugadorPartido(jugadorEntra);
          jugadorPartidoSale = await actualizarJugadorPartido(jugadorSale);
        }

        // Lógica para el evento de Sustitución
        if (selectedTeamId && selectedPlayerOutId && selectedPlayerInId) {

          const eventoEntra = {
            id_partido: idPartido,
            id_jugador_partido: jugadorPartidoEntra.data[0].id_jugador_partido,
            equipo: selectedTeamId,
            tipo_evento: EVENT_TYPES.SUSTITUCION_ENTRA,
            minuto: minutos,
            minutos_extra: minutos_extra,
            observacion: observation,
            Activo: true,
          };

          const eventoSale = {
            id_partido: idPartido,
            id_jugador_partido: jugadorPartidoSale.data[0].id_jugador_partido,
            equipo: selectedTeamId,
            tipo_evento: EVENT_TYPES.SUSTITUCION_SALE,
            minuto: minutos,
            minutos_extra: minutos_extra,
            observacion: observation,
            Activo: true,
          };          

          // Crear ambos eventos de Sustitución
          const creacionEventos = await Promise.all([
            crearEvento(eventoSale),
            crearEvento(eventoEntra),
          ]);

          if (creacionEventos.every((res) => res.success)) {
            setIsLoading(false);
            setMessageAlertCustom('¡Eventos de sustitución guardados exitosamente!');
            setShowAlertCustom(true);

            setTimeout(() => {
              onSave(eventoEntra);
              onClose?.();
            }, 2000);
          } else {
            setIsLoading(false);
            alert('Hubo un problema al guardar los eventos de sustitución.');
          }
        } else {
          setIsLoading(false);
          setMessageAlertCustom('¡Debe seleccionar el equipo, el jugador que sale y el jugador que entra!');
          setShowAlertCustom(true);
        }
      } else {

        if (tipoUsuario === USER_ROLES.ADMIN_LIGA) {
          const jugador = [{
            id_jugador: selectedPlayerMatchId,
            id_partido: idPartido,
            dorsal: 0,
            asistencia: true,
            capitan: 0,
            activo: 1
          }];

          jugadorPartido = await actualizarJugadorPartido(jugador);
        }
        // Lógica para otros tipos de eventos
        if (selectedTeamId) {
          const eventoData = {
            id_partido: idPartido,
            id_jugador_partido: jugadorPartido.data[0].id_jugador_partido || null,
            equipo: selectedTeamId,
            tipo_evento: selectedEvent,
            minuto: minutos,
            minutos_extra: minutos_extra,
            observacion: observation,
            Activo: true,
          };

          const creacionEvento = await crearEvento(eventoData);          

          setIsLoading(false);
          if (creacionEvento.success) {
            setMessageAlertCustom('¡Evento guardado exitosamente!');
            setShowAlertCustom(true);

            setTimeout(() => {
              onSave(eventoData);
              onClose?.();
            }, 2000);
          } else {
            setIsLoading(false);
            alert('Hubo un problema al guardar el evento.');
          }
        } else {
          setIsLoading(false);
          setMessageAlertCustom('¡Debe seleccionar el equipo y el jugador para registrar el evento!');
          setShowAlertCustom(true);
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error al guardar el evento:', error);
      alert('Ocurrió un error inesperado. Por favor, intente nuevamente.');
    }
  };

  const handleCloseAlertCustom = () => {
    setShowAlertCustom(false);
    // onSave();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-30 overflow-auto">
      <div className="relative bg-blue-900 rounded-lg p-6 w-[95%] z-30 overflow-auto max-h-[90vh]">
        <Header />
        <TeamSelection
          nombreEquipoLocal={equipos?.nombre_equipo_local || 'Equipo Local'}
          nombreEquipoVisitante={equipos?.nombre_equipo_visitante || 'Equipo Visitante'}
          idEquipoLocal={equipos?.id_equipo_local}
          idEquipoVisitante={equipos?.id_equipo_visitante}
          idEquipoCategoriaLocal={equipos?.id_equipo_categoria_local}
          idEquipoCategoriaVisitante={equipos?.id_equipo_categoria_visitante}
          onTeamSelect={handleTeamSelection}
        />
        <EventSelector onSelect={handleEventSelector} />
        <EventForm
          jugadoresAsistentes={jugadores}
          onPlayerSelect={handlePlayerSelect}
          onPlayerOutSelect={setSelectedPlayerOutId}
          onPlayerInSelect={setSelectedPlayerInId}
          onObservationChange={handleObservationChange}
          onMinuteChange={handleMinuteChange}
          eventType={selectedEvent}
          tipoUsuario={tipoUsuario}
        />

        <div className="flex-col sm500:flex-row flex items-center justify-center space-x-0 sm500:space-x-4 w-full pb-8 pr-4 pl-4">
          <CustomButton text="Cancelar" color="#ef4444" width="" height="" onClick={onClose} className={`flex-col w-[100%]`} icon="/images/logos/Icono_Cancelar_Blanco.png" />
          <CustomButton text="Guardar" color="#3b82f6" width="" height="" onClick={handleSaveEvent} className={`flex-col w-[100%] mt-4 sm500:mt-0`} icon="/images/logos/Icono_Guardar_Blanco.png" />
        </div>
      </div>
      {/** Alertas de las acciones */}
      <CustomAlert message={messageAlertCustom} show={showAlertCustom} onClose={handleCloseAlertCustom} />

      {/* Animación de carga */}
      {isLoading && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fondo semitransparente
            zIndex: '100', // Para asegurarse de que se muestre sobre otros elementos
          }}
          className="flex items-center justify-center"
        >
          <RingLoader color="#007bff" />
        </div>
      )}
    </div>
  );
};

export default PopUpAddEvent;
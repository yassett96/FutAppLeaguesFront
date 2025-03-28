"use client";
import React, { useState, useCallback, useEffect } from 'react';
import Header from './Header';
import MatchForm from './MatchForm';
import CustomButton from '@/components/components_generics/button/CustomButton';
import PopUpAddEvent from './pop-up_add_event/page';
import { obtenerEquiposPorPartido } from '@/services/partidoService';
import { RingLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';
import { EVENT_TYPES } from '@/constants';
import { desactivarEvento } from '@/services/eventoService';

interface PageProps {
  onCancel?: () => void;
  partidoAEditar?: any;
  editar?: boolean;
  onSave?: (formData: any) => void;
  tipoUsuario: any;
}

const PopUpEditMatch: React.FC<PageProps> = ({ onCancel, partidoAEditar, editar, tipoUsuario, onSave }) => {
  console.log("partidoAEditar: ", partidoAEditar);
  const [formData, setFormData] = useState(partidoAEditar);
  const [showPopUpAddEvent, setShowPopUpAddEvent] = useState(false);
  const router = useRouter();
  const [datosEquipos, setDatosEquipos] = useState<any>([]);
  const [actualizarEventos, setActualizarEventos] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean | null>(false);

  const handleFormChange = (updatedFormData: any) => {
    setFormData(updatedFormData);
  };

  useEffect(() => {
    if (partidoAEditar) {
      setFormData(partidoAEditar);
    }
  }, [partidoAEditar]);

  const obtenerDatosEquipos = async () => {
    try {
      // Obtener los datos de los equipos del partido
      const consultaDatosEquipos = await obtenerEquiposPorPartido(Number(partidoAEditar.id_partido));
      setDatosEquipos(consultaDatosEquipos);

      // return consultaDatosEventos;
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      alert('Error: ' + error);
      if (process.env.NODE_ENV === 'production') {
        router.push('/login.html');
      } else {
        router.push('/login');
      }
      // router.push('/login');
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave(formData); // Llama a la función del padre con los datos actualizados
    }
  };

  const handleOnSaveAddEvent = async (evento) => {
    console.log("evento: ", evento);
    if (evento.tipo_evento === EVENT_TYPES.GOL) {
      if (evento.equipo === partidoAEditar.id_equipo_categoria_local || evento.equipo === partidoAEditar.id_equipo_local) {
        setFormData((prev) => ({
          ...prev,
          resultado_local: (prev.resultado_local || 0) + 1,
        }));
      } else if (evento.equipo === partidoAEditar.id_equipo_categoria_visitante || evento.equipo === partidoAEditar.id_equipo_visitante) {
        setFormData((prev) => ({
          ...prev,
          resultado_visitante: (prev.resultado_visitante || 0) + 1,
        }));
      }
    } else if (evento.tipo_evento === EVENT_TYPES.AUTO_GOL) {
      if (evento.equipo === partidoAEditar.id_equipo_categoria_local || evento.equipo === partidoAEditar.id_equipo_local) {
        setFormData((prev) => ({
          ...prev,
          resultado_visitante: (prev.resultado_visitante || 0) + 1,
        }));
      } else if (evento.equipo === partidoAEditar.id_equipo_categoria_visitante || evento.equipo === partidoAEditar.id_equipo_visitante) {
        setFormData((prev) => ({
          ...prev,
          resultado_local: (prev.resultado_local || 0) + 1,
        }));
      }
    }

    setShowPopUpAddEvent(false);
    setActualizarEventos(!actualizarEventos);
  };

  const handleAddEvent = async (addEvent: boolean) => {
    await obtenerDatosEquipos();
    setShowPopUpAddEvent(addEvent);
  };

  const handleEliminateEvent = async (evento: any) => {
    setIsLoading(true);
    if (evento.tipo_evento === EVENT_TYPES.GOL) {
      if (evento.id_equipo === partidoAEditar.id_equipo_categoria_local || evento.id_equipo === partidoAEditar.id_equipo_local) {
        setFormData((prev) => ({
          ...prev,
          resultado_local: (prev.resultado_local || 0) - 1,
        }));
      } else if (evento.id_equipo === partidoAEditar.id_equipo_categoria_visitante || evento.id_equipo === partidoAEditar.id_equipo_visitante) {
        setFormData((prev) => ({
          ...prev,
          resultado_visitante: (prev.resultado_visitante || 0) - 1,
        }));
      }
    } else if (evento.tipo_evento === EVENT_TYPES.AUTO_GOL) {
      if (evento.id_equipo === partidoAEditar.id_equipo_categoria_local || evento.id_equipo === partidoAEditar.id_equipo_local) {
        setFormData((prev) => ({
          ...prev,
          resultado_visitante: (prev.resultado_visitante || 0) - 1,
        }));
      } else if (evento.id_equipo === partidoAEditar.id_equipo_categoria_visitante || evento.id_equipo === partidoAEditar.id_equipo_visitante) {
        setFormData((prev) => ({
          ...prev,
          resultado_local: (prev.resultado_local || 0) - 1,
        }));
      }
    }

    const eventEliminado = await desactivarEvento(evento.id_evento);
    setIsLoading(false);

    if (eventEliminado && eventEliminado.success) {
      setActualizarEventos(!actualizarEventos);
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-blue-900 rounded-lg overflow-auto w-[95%] max-h-[90vh]">
        <Header />
        <MatchForm
          partido={formData}
          onChange={handleFormChange}
          onAddEvent={handleAddEvent}
          onEliminateEvent={handleEliminateEvent}
          editar={editar}
          actualizarEventos={actualizarEventos}
        />
        {showPopUpAddEvent && (
          <PopUpAddEvent
            onClose={() => setShowPopUpAddEvent(false)}
            onSave={handleOnSaveAddEvent}
            equipos={datosEquipos}
            idPartido={Number(partidoAEditar.id_partido)}
            tipoUsuario={tipoUsuario}
          />
        )}

        <div className="p-4 flex items-center justify-center space-y-5 sm750:space-y-0 space-x-0 sm750:space-x-5 flex-col sm750:flex-row">
          {/* <CustomButton
            text="Cancelar"
            color="#ef4444"
            width=""
            height=""
            onClick={onCancel}
            className="flex-col w-[80%] sm750:w-[40%] mt-5 xs300:mt-0"
            classNameText='text-3xl'
            classNameIcon='h-9 w-9'
            icon="/images/logos/Icono_Cancelar_Blanco.png"
          /> */}
          {editar && (
            <CustomButton
              text="Guardar"
              color="#3b82f6"
              width=""
              height=""
              onClick={handleSave}
              className="flex-col w-[80%] sm750:w-[40%] mt-5 xs300:mt-0"
              classNameText='text-3xl'
              classNameIcon='h-9 w-9'
              icon="/images/logos/Icono_Guardar_Blanco.png"
            />
          )}
        </div>
        <br />
        <br />
        {/* Animación de carga */}
        {
          isLoading && (
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
          )
        }
      </div>
    </div>
  );
};

export default PopUpEditMatch;
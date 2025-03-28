"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Header from './Header';
import CustomButton from '@/components/components_generics/button/CustomButton';
import CustomAlert from '@/components/components_generics/custom_alert/CustomAlert';
import MatchDays from '@/components/components_generics/match_days/MatchDays';
import { USER_ROLES } from '@/constants';
import { RingLoader } from 'react-spinners';
import { actualizarPartido } from '@/services/partidoService';
import { obtenerJornadasSegunTorneoCategoria } from '@/services/jornadaService';

interface PageProps {
  idTorneoCategoria: number;
  onAccept?: () => void;
  tipoTorneo: string;
}

const PopUpManageMatchAdmin: React.FC<PageProps> = ({ onAccept, idTorneoCategoria, tipoTorneo }) => {
  const [showPopupEditMatch, setShowPopupEditMatch] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [datosPartidoAEditar, setDatosPartidoAEditar] = useState<any>(null);
  const [idPartidoSeleccionado, setIdPartidoSeleccionado] = useState<number | null>(null);
  const [showAlertCustom, setShowAlertCustom] = useState(false);
  const [messageAlertCustom, setMessageAlertCustom] = useState('');
  const router = useRouter();

  const today = new Date();
  const offset = today.getTimezoneOffset();

  const [datosJornadas, setDatosJornadas] = useState(null);

  const obtenerFixturesSegunJornada = useCallback(async (idTorneoCategoria: number, idJornada: any) => {
    try {
      let fixturesPorJornadasYTorneoCategoria = null;
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
  }, [router]);

  const obtenerJornadas = useCallback(async (idTorneoCategoria: number) => {
    try {
      const jornadasPorTorneoCategoria = await obtenerJornadasSegunTorneoCategoria(idTorneoCategoria);

      setDatosJornadas(jornadasPorTorneoCategoria.data.data);
      await obtenerFixturesSegunJornada(idTorneoCategoria, jornadasPorTorneoCategoria.data.data[0].id_jornada);
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
  }, [router, obtenerFixturesSegunJornada]);

  useEffect(() => {
    const fetchDatos = async () => {
      await obtenerJornadas(idTorneoCategoria);
    };
    fetchDatos();
  }, [idTorneoCategoria, obtenerJornadas]);

  const handleSaveMatch = async (updatedMatch: any) => {
    // Agregar idPartidoSeleccionado al objeto updatedMatch
    const updatedMatchWithId = {
      ...updatedMatch,
      id_partido: idPartidoSeleccionado, // Asegúrate de que coincide con la clave esperada
    };

    // Extraer equipoLocal y equipoVisitante, y dejar el resto en cleanedMatch
    const { equipoLocal, equipoVisitante, ...cleanedMatch } = updatedMatchWithId;

    const resActualizarPartido = await actualizarPartido(idPartidoSeleccionado, cleanedMatch);

    if (resActualizarPartido.success) {
      setMessageAlertCustom("¡El partido se ha actualizado correctamente!");
      setShowAlertCustom(true);
      setShowPopupEditMatch(false);
    } else {
      alert("¡Error al actualizar el partido!");
    }
  };

  const handleCloseAlertCustom = () => {
    setShowAlertCustom(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-30">
      <div className="bg-blue-900 rounded-lg overflow-hidden w-[95%] overflow-x-auto overflow-y-auto max-h-[95vh] custom-scrollbar">
        <Header />
        <MatchDays idTorneoCategoria={idTorneoCategoria} jornadas={datosJornadas} tipoUsuario={USER_ROLES.ADMIN_LIGA} tipoTorneo={tipoTorneo} />
        <div className='p-5 flex items-center justify-center space-x-5'>
          <CustomButton
            text="Aceptar"
            color="#22c55e"
            width=""
            height=""
            onClick={onAccept}
            className='flex-col w-[80%] sm750:w-[40%] mt-5 xs300:mt-0'
            icon="/images/logos/Icono_Confirmar_Blanco.png"
            classNameText = "text-sm sm590:text-xl"
            classNameIcon='w-6 sm590:h-8 w-6 sm590:w-8'
          />
          {/* <CustomButton text="Editar" color="#3b82f6" width="" height="40px" onClick={() => setShowPopupEditMatch(true)} className='w-[80%] sm750:w-[40%] mt-5 xs300:mt-0' icon="/images/logos/Icono_Editar_Blanco.png" /> */}
        </div>
      </div>
      {/** Alertas de las acciones */}
      <CustomAlert message={messageAlertCustom} show={showAlertCustom} onClose={handleCloseAlertCustom} />

      {showLoading && <div
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
          zIndex: '9999', // Para asegurarse de que se muestre sobre otros elementos
        }}
        className="flex items-center justify-center"
      >
        <RingLoader color="#007bff" />
      </div>}

    </div >
  );
};

export default PopUpManageMatchAdmin;
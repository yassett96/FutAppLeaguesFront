"use client";
import React, { useState, useEffect } from 'react';
import Header from './Header';
import SelectCategory from './SelectCategory';
import NameTournament from './NameTournament';
import DescriptionTournament from './DescriptionTournament';
import ScoreGrid from './ScoreGrid';
import TournamentType from './TournamentType';
import TeamsGrids from './TeamGrid';
import CustomButton from '../../../../components_generics/button/CustomButton';
import PopUpEditTournamentType from './pop-up_edit_tournament_type/page';
import PopUpAddTeam from './pop-up_add_team/page';
import { obtenerEquiposPorIdLigaYIdCategoria } from '@/services/ligaCategoriaService';
import MatchesPerRound from './MatchesPerRound';
import { crearTorneoPlayOffCompleto } from '@/services/creacionTorneosPlayOffService';
import { crearTorneoLigaCompleto } from '@/services/creacionTorneosLigaService';
import { crearTorneoLigaPlayOffCompleto } from '@/services/creacionTorneosLigaPlayOffService';
import CustomAlertAcceptOrCancel from '@/components/components_generics/custom_alert/CustomAlertAcceptOrCancel';
import CustomAlert from '@/components/components_generics/custom_alert/CustomAlert';
import { TIPOS_TORNEOS } from '@/constants';

interface PageProps {
  id_liga: number;
  id_categoria: number;
  onCancel: () => void;
  setIsLoading: (isLoading: Boolean) => any;
  onCreatedTournament: () => void;
}

const PopUpInitTournament: React.FC<PageProps> = ({ id_liga, id_categoria, onCancel, setIsLoading, onCreatedTournament }) => {
  // const [datosCategorias, setDatosCategorias] = useState<any>(null);
  // const [idCategoriaSeleccionada, setIdCategoriaSeleccionada] = useState<any>(null); // Almacena la categoría seleccionada
  const [datosEquipos, setDatosEquipos] = useState<any>(null);
  const [equiposSeleccionados, setEquiposSeleccionados] = useState<number[]>([]);
  const [datosPuntajes, setDatosPuntajes] = useState([]);
  const [nombreTorneo, setNombreTorneo] = useState("");
  const [descripcionTorneo, setDescripcionTorneo] = useState("");
  const [showAlertCustomAcceptOrCancel, setShowAlertCustomAcceptOrCancel] = useState(false);
  const [messageAlertCustomAcceptOrCancel, setMessageAlertCustomAcceptOrCancel] = useState('');
  const [showAlertCustom, setShowAlertCustom] = useState(false);
  const [messageAlertCustom, setMessageAlertCustom] = useState('');

  const [tipoTorneo, setTipoTorneo] = useState("Play-Off"); // Valores posibles: "Liga", "Play-Off", "Liga/Play-Off"
  const [datosTorneo, setDatosTorneo] = useState({
    no_grupos: undefined, // Número de grupos (solo aplicable para "Play-Off" y "Liga/Play-Off")
    rondas: 0, // Cantidad de rondas (común para todos)
    clasificados: undefined, // Número de clasificados (solo para "Play-Off" y "Liga/Play-Off")
    tercerLugar: false,
    copaPlata: false,
    rondasPlayOff: undefined,
  });
  const [numeroPartidos, setNumeroPartidos] = useState({
    numeroPartidosFinal: 0,
    numeroPartidosSemiFinal: 0,
    numeroPartidosCuartosFinal: 0,
    numeroPartidosOctavosFinal: 0,
    numeroPartidosDieciseisavoFinal: 0,
    numeroPartidosTreintaidosavoFinal: 0
  });

  useEffect(() => {
    const fetchDatos = async () => {
      try {        
        const equipos = await obtenerEquiposPorIdLigaYIdCategoria(id_categoria, id_liga);
        setDatosEquipos(equipos.equipos);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        alert('Error: ' + error)
      }
    };
    fetchDatos();
  }, [id_liga, id_categoria]);

  useEffect(() => {
    const fetchDatos = async () => { };
    fetchDatos();
  }, [equiposSeleccionados]);

  // Callback para manejar cambios en puntajes
  const handlePuntajesChange = (newPuntajes: any) => {
    setDatosPuntajes(newPuntajes); // Actualiza el estado de los puntajes en el padre
  };


  const handleNombreTorneoChange = (nombre: string) => {
    setNombreTorneo(nombre); // Actualiza el estado con el nombre del torneo
  };

  const handleDescripcionTorneoChange = (nombre: string) => {
    setDescripcionTorneo(nombre); // Actualiza el estado con el nombre del torneo
  };

  // Callback para manejar cambios en tipo de torneo
  const handleTournamentTypeChange = (nuevoTipoTorneo: string, nuevosDatosTorneo: any) => {
    setTipoTorneo(nuevoTipoTorneo);
    setDatosTorneo(nuevosDatosTorneo);
  };

  const handleCrearTorneo = async () => {
    setMessageAlertCustomAcceptOrCancel(`Se empezará el proceso de creación del torneo ${nombreTorneo}. ¿Estás seguro que quieres iniciarlo?`);
    setShowAlertCustomAcceptOrCancel(true);
  };

  const handleSeleccionEquipos = (idsEquiposSeleccionados: any) => {
    setEquiposSeleccionados(idsEquiposSeleccionados);
  };

  const onCambioNumeroPartido = (data: any) => {
    setNumeroPartidos((prevState) => ({
      ...prevState,
      ...data,
    }));
  };

  const handleCancelAlertCustomAcceptOrCancel = () => {
    setShowAlertCustomAcceptOrCancel(false);
  };

  const handleAcceptAlertCustomAcceptOrCancel = async () => {
    setIsLoading(true);
    setShowAlertCustomAcceptOrCancel(false);

    const numero_partidos_por_etapa = {
      "Final": numeroPartidos.numeroPartidosFinal,
      "Semi final": numeroPartidos.numeroPartidosSemiFinal,
      "Cuartos de final": numeroPartidos.numeroPartidosCuartosFinal,
      "Octavos de final": numeroPartidos.numeroPartidosOctavosFinal,
      "Dieciseisavo de final": numeroPartidos.numeroPartidosDieciseisavoFinal,
      "Treintaidosavo de final": numeroPartidos.numeroPartidosTreintaidosavoFinal
    };

    // Preparar los datos del Torneo        
    const torneoData = {
      id_liga: id_liga,
      nombre: nombreTorneo,
      id_categoria: id_categoria,
      tipo_torneo: tipoTorneo,
      descripcion: descripcionTorneo,
      detalles: {
        rondas: datosTorneo.rondas,
        tercerLugar: datosTorneo.tercerLugar,
        copaPlata: datosTorneo.copaPlata,
        no_grupos: datosTorneo.no_grupos,
        clasificados: datosTorneo.clasificados,
      },
      equipos: equiposSeleccionados,
      numero_partidos_por_etapa: numero_partidos_por_etapa,
      puntajes: datosPuntajes
    };

    try {
      if (tipoTorneo === TIPOS_TORNEOS.PLAY_OFF) {
        const response = await crearTorneoPlayOffCompleto(torneoData);
        setIsLoading(false);

        if (response.success) {
          setMessageAlertCustom(`¡El torneo ${nombreTorneo} se ha creado con éxito, puedes modificar los Fixtures!`);
          setShowAlertCustom(true);

          setTimeout(() => {
            onCreatedTournament();
          }, 4000);
        } else {
          setMessageAlertCustom("¡Hubo un error al intentar crear el Torneo!");
          setShowAlertCustom(true);
        }
      } else if (tipoTorneo === TIPOS_TORNEOS.LIGA) {
        const response = await crearTorneoLigaCompleto(torneoData);
        setIsLoading(false);

        if (response.success) {
          setMessageAlertCustom(`¡El torneo ${nombreTorneo} se ha creado con éxito, puedes modificar los Fixtures!`);
          setShowAlertCustom(true);

          setTimeout(() => {
            onCreatedTournament();
          }, 4000);
        } else {
          setMessageAlertCustom("¡Hubo un error al intentar crear el Torneo!");
          setShowAlertCustom(true);
        }
      } else if (tipoTorneo === TIPOS_TORNEOS.LIGA_PLAY_OFF) {
        let maxGrupos = Math.floor(torneoData.equipos.length / 2); // Son 2 equipos como mínimo en un grupo
        let equiposEnGrupo = (torneoData.equipos.length / torneoData.detalles.no_grupos);

        if (torneoData.detalles.no_grupos <= maxGrupos) {
          const response = await crearTorneoLigaPlayOffCompleto(torneoData);

          if (response.success) {
            setMessageAlertCustom(`¡El torneo ${nombreTorneo} se ha creado con éxito, puedes modificar los Fixtures!`);
            setShowAlertCustom(true);

            setTimeout(() => {
              onCreatedTournament();
            }, 4000);
          } else {
            setMessageAlertCustom("¡Hubo un error al intentar crear el Torneo");
            setShowAlertCustom(true);
          }
        } else if (torneoData.detalles.clasificados >= (equiposEnGrupo)) {
          setMessageAlertCustom("¡El número de clasificados no debe de ser mayor o igual al número de equipos en un grupo!");
          setShowAlertCustom(true);
        } else {
          setMessageAlertCustom("¡El número de grupos no debe de tener menos de 3 equipos!");
          setShowAlertCustom(true);
        }
      }

    } catch (error) {
      console.error('Error al crear el torneo')
    }

    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-30">
      <div className="bg-blue-900 rounded-lg overflow-y-auto max-h-[90%] w-[90%]">
        <Header />
        <br />
        <NameTournament onNombreTorneoChange={handleNombreTorneoChange} />
        <DescriptionTournament onDescripcionTorneoChange={handleDescripcionTorneoChange} />
        <TournamentType
          tipoTorneo={tipoTorneo}
          datosTorneo={datosTorneo}
          onChange={handleTournamentTypeChange}
        />

        {(tipoTorneo === TIPOS_TORNEOS.LIGA || tipoTorneo === TIPOS_TORNEOS.LIGA_PLAY_OFF) && (
          <ScoreGrid onPuntajesChange={handlePuntajesChange} />
        )}

        <br />
        <TeamsGrids
          datosEquipos={datosEquipos}
          onEquiposSeleccionados={(EquiposSeleccionados) => {
            handleSeleccionEquipos(EquiposSeleccionados);
          }}
        />
        <br />

        {(tipoTorneo === TIPOS_TORNEOS.PLAY_OFF || tipoTorneo === TIPOS_TORNEOS.LIGA_PLAY_OFF) && (
          <MatchesPerRound equiposSeleccionados={equiposSeleccionados} onNumeroPartidosCambiado={onCambioNumeroPartido} tipoTorneo={tipoTorneo} datosTorneo={datosTorneo} />
        )}

        <div className="pt-4 pb-10 pr-4 pl-4 flex flex-col items-center justify-center space-y-4">
          <CustomButton
            text="Iniciar torneo"
            color="#22c55e"
            width=""
            height=""
            onClick={handleCrearTorneo}
            className="flex-col w-[100%] sm750:w-[40%]"
            classNameText='text-sm sm590:text-xl'
            classNameIcon='w-6 sm590:h-8 w-6 sm590:w-8'
            icon="/images/logos/Icono_Confirmar_Blanco.png"
          />
          <CustomButton
            text="Cancelar"
            color="#ef4444"
            width=""
            height=""
            onClick={onCancel}
            className="flex-col w-[100%] sm750:w-[40%]"
            classNameText='text-sm sm590:text-xl'
            classNameIcon='w-6 sm590:h-8 w-6 sm590:w-8'
            icon="/images/logos/Icono_Cancelar_Blanco.png"
          />
        </div>
      </div>
      <CustomAlertAcceptOrCancel message={messageAlertCustomAcceptOrCancel} show={showAlertCustomAcceptOrCancel} onCancel={handleCancelAlertCustomAcceptOrCancel} onAccept={handleAcceptAlertCustomAcceptOrCancel} />
      <CustomAlert message={messageAlertCustom} onClose={() => { setShowAlertCustom(false); }} show={showAlertCustom} />
    </div>
  );
};

export default PopUpInitTournament;
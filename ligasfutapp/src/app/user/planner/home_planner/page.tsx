"use client";
import Image from 'next/image';
import React, { useState, Suspense, useEffect, useRef, createContext, useContext } from 'react';
import SideBar from '../../../../components/components_generics/side_bar/SideBar';
import SearchBar from '../../../../components/components_generics/search_bar/SearchBar';
import WelcomeMessage from '../../../../components/user/planner/home_planner/WelcomeMessage';
import LigasCarousel from '../../../../components/user/planner/home_planner/LigasCarousel';
import Torneo from '../../../../components/user/planner/home_planner/Torneo';
import Categoria from '../../../../components/user/planner/home_planner/Categoria';
import PartidosGrid from '../../../../components/user/planner/home_planner/PartidosGrid';
import MatchDays from '@/components/components_generics/match_days/MatchDays';
import { USER_ROLES } from '@/constants';
import Footer from '../../../../components/components_generics/footer/Footer';
import { RingLoader } from 'react-spinners';
import { useSearchParams, useRouter } from 'next/navigation';
import { obtenerDatosUsuario } from '@/services/usuarioService';
import { obtenerTorneosPorLigaYCategoria, obtenerCategoriasSegunLiga, obtenerTorneosPorLiga, obtenerCategoriasPorTorneo, obtenerPartidosPorCategoria } from '@/services/planilleroTorneoCategoriaService';
import { obtenerLigasSegunPlanillero } from '@/services/planilleroLigaService';
import { obtenerTorneoCategoriaSegunIdTorneoIdCategoria } from '@/services/torneoCategoriaService';
import { obtenerJornadasSegunTorneoCategoria } from '@/services/jornadaService';
import { menuOptionsPlanillero } from '../../../../components/components_generics/footer/menu_options/MenuOptions';
import CustomAlert from '@/components/components_generics/custom_alert/CustomAlert';

// Contexto de Scroll
const ScrollContext = createContext(null);

// Hook para contexto de Scroll
const useScroll = () => useContext(ScrollContext);

const IniciacionHomePlanillero: React.FC = () => {

  return (
    <div className="min-h-screen bg-cream-faf9f6">
      <Suspense fallback={
        <>
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
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              zIndex: '9999',
            }}
            className="flex items-center justify-center"
          >
            <RingLoader color="#007bff" />
          </div>
        </>
      }
      >
        <HomePlanilleroContent scroll={800} />
      </Suspense>
    </div>
  );
};

interface HomePlanilleroContentProps {
  scroll: number;
}

const HomePlanilleroContent: React.FC<HomePlanilleroContentProps> = ({ scroll }) => {
  const [showLigas, setShowLigas] = useState(false);
  const [showTorneos, setShowTorneos] = useState(false);
  const [showCategoria, setShowCategoria] = useState(false);
  const [showPartidos, setShowPartidos] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [datosUsuario, setDatosUsuario] = useState<any>(null);
  const [datosLigasPlanillero, setDatosLigasPlanillero] = useState<any>(null);
  const [idLigaSelected, setIdLigaSelected] = useState<number>(0);
  const [idTorneoSelected, setIdTorneoSelected] = useState<number>(0);
  const [idTorneoCategoria, setIdTorneoCategoria] = useState<number>(0);
  const [idCategoriaSelected, setIdCategoriaSelected] = useState<number>(0);
  const [datosTorneosLiga, setDatosTorneosLiga] = useState<any[]>([]);
  const [datosCategoriasTorneoLiga, setDatosCategoriasTorneoLiga] = useState<any>(null);
  const [datosJornadas, setDatosJornadas] = useState(null);
  const [nombreLiga, setNombreLiga] = useState<any>(null);
  const [tipoTorneo, setTipoTorneo] = useState(null);
  const [messageCustomAlert, setMessageCustomAlert] = useState(null);
  const [showCustomAlert, setShowCustomAlert] = useState(null);

  // References for scrolling
  const torneosRef = useRef<HTMLDivElement>(null);
  const categoriaRef = useRef<HTMLDivElement>(null);
  const partidosRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const userRole = searchParams.get('role');

  const obtenerTorneosSegunLiga = async (id_usuario: number, id_liga: number) => {
    try {
      const torneosLigas = await obtenerTorneosPorLiga(id_liga);
      setDatosTorneosLiga(torneosLigas);
      return torneosLigas;
    } catch (error) {
      console.error("Error al obtener los torneos: ", error);
    }
  }

  const obtenerCategoriasSegunTorneoYLiga = async (id_usuario: number, id_liga: number, id_torneo: number) => {
    try {
      const categoriasTorneosLigas = await obtenerCategoriasPorTorneo(id_liga, id_torneo);
      setDatosCategoriasTorneoLiga(categoriasTorneosLigas);
      return categoriasTorneosLigas;
    } catch (error) {
      console.error("Error al obtener las categorías: ", error);
    }
  }

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        // Obtener datos del usuario
        const usuario = await obtenerDatosUsuario();
        setDatosUsuario(usuario);

        // Obtener las ligas del planillero
        const ligasPlanillero = await obtenerLigasSegunPlanillero(usuario.id_usuario);
        console.log("ligasPlanillero: ", ligasPlanillero);
        setDatosLigasPlanillero(ligasPlanillero.data);

        if (ligasPlanillero.data.length === 1) {
          setIdLigaSelected(ligasPlanillero.data[0].id_liga);
          setNombreLiga(ligasPlanillero.data[0].Liga.nombre_liga);

          const categoriasSegunLiga = await obtenerCategoriasSegunLiga(ligasPlanillero.data[0].id_liga);
          setDatosCategoriasTorneoLiga(categoriasSegunLiga);
          const categoriasArray = Array.isArray(categoriasSegunLiga) ? categoriasSegunLiga : [categoriasSegunLiga];

          if (categoriasArray.length === 1) {
            setIdCategoriaSelected(categoriasArray[0].id_categoria);

            const torneosSegunLigaYCategoria = await obtenerTorneosPorLigaYCategoria(ligasPlanillero.data[0].id_liga, categoriasArray[0].id_categoria);
            setDatosTorneosLiga(torneosSegunLigaYCategoria);

            if (torneosSegunLigaYCategoria.length === 1) {
              setIdTorneoSelected(torneosSegunLigaYCategoria[0].id_torneo);

              const torneoCategoria = await obtenerTorneoCategoriaSegunIdTorneoIdCategoria(torneosSegunLigaYCategoria[0].id_torneo, categoriasArray[0].id_categoria);
              setIdTorneoCategoria(torneoCategoria.data[0].id_torneo_categoria);

              const datosJornadas = await obtenerJornadasSegunTorneoCategoria(torneoCategoria.data.id_torneo_categoria);
              setDatosJornadas(datosJornadas.data.data);
            } else {
              setShowTorneos(true);
            }
          } else {
            setShowCategoria(true);
          }
        } else {
          setShowLigas(true);
        }

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
    fetchDatos();
  }, [router]);

  if (!datosUsuario) {
    return <div
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
    </div>;
  }

  const handleLigasSelect = async (id_liga: number) => {
    obtenerTorneosSegunLiga(datosUsuario.id_usuario, id_liga);
    const ligaSeleccionada = datosLigasPlanillero.find((liga: { id_liga: number; }) => liga.id_liga === id_liga);
    setNombreLiga(ligaSeleccionada.Liga.nombre_liga);
    setShowTorneos(true);
    setTimeout(() => {
      torneosRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleCategoriaSelect = async (id_categoria: number) => {
    setIdCategoriaSelected(id_categoria);

    const torneosSegunLigaYCategoria = await obtenerTorneosPorLigaYCategoria(idLigaSelected, id_categoria);
    setDatosTorneosLiga(torneosSegunLigaYCategoria);

    setShowTorneos(true);

    setTimeout(() => {
      window.scrollTo({ top: 1000, behavior: 'smooth' });
    }, 100);

    setTimeout(() => {
      partidosRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  const handleTorneosSelect = async (torneo: any) => {
    const idTorneo = torneo.id_torneo;
    const tipoTorneo = torneo.tipo_torneo
    setIdTorneoSelected(idTorneo);
    setTipoTorneo(tipoTorneo);
    // await obtenerCategoriasSegunTorneoYLiga(datosUsuario.id_usuario, idLigaSelected, idTorneo);
    setIdTorneoSelected(idTorneo);

    const torneoCategoria = await obtenerTorneoCategoriaSegunIdTorneoIdCategoria(idTorneo, idCategoriaSelected);
    setIdTorneoCategoria(torneoCategoria.data[0].id_torneo_categoria);

    const datosJornadas = await obtenerJornadasSegunTorneoCategoria(torneoCategoria.data[0].id_torneo_categoria);
    if (datosJornadas.data.data.length > 0) {
      setDatosJornadas(datosJornadas.data.data);

      setShowPartidos(true);

      setTimeout(() => {
        categoriaRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);      
    } else {
      setMessageCustomAlert("¡Este torneo no tiene Fixtures asignados!");
      setShowCustomAlert(true);
    }    
  };

  const handleSidebarToggle = (state: boolean) => {
    setIsOpen(state);
  };

  const handleSidebarToggleMobile = (state: boolean) => {
    setIsMobileOpen(state);
  };

  // Función para manejar la apertura/cierre del menú en móviles
  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleOnPlanillar = (fixture: any) => {
    if (process.env.NODE_ENV === 'production') {
      router.push(`/user/planner/match.html?role=` + userRole + `&id_p=${fixture.id_partido}`);
    } else {
      router.push(`/user/planner/match/?role=` + userRole + `&id_p=${fixture.id_partido}`);
    }
    // router.push(`/user/planner/match/?role=` + userRole + `&id_p=${fixture.id_partido}`);
  }

  // Generar dinámicamente las opciones del menú
  const menuOptionsLeft = menuOptionsPlanillero.left.map((option) => ({
    ...option,
    color: option.label === 'Firma' ? 'text-black' : option.color,
    disabled: option.label === 'Datos' || option.label === 'Firma'
  }));

  const menuOptionsRight = menuOptionsPlanillero.right.map((option) => ({
    ...option,
    disabled: option.label === 'Comentarios' || option.label === 'Resumen'
  }));

  return (
    <div className="min-h-screen bg-cream-faf9f6 overflow-x-hidden">
      <div className={`${isOpen ? 'lg:ml-70 ml-0' : 'lg:ml-[0%] ml-[0%]'}`}>
        <SideBar userType='Planillero' menuDisabled={true} onToggleSidebar={handleSidebarToggle} onToggleSidebarMobile={handleSidebarToggleMobile} isMobileOpen={isMobileOpen} />
      </div>

      <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
        <div className={`transition-all duration-300 ${isOpen ? 'lg:w-[75%] xl1500:w-[85%] lg:left-[21%] xl1500:left-[13%]' : 'w-[95%] xxs:w-[90%] xl1500:w-[95%] lg:left-[6.5%] xl1500:left-[3.5%]'}  mx-4 my-4 top-0 xxs:left-[3.6%] z-20`}>
          <SearchBar onToggleSidebarMobile={handleSidebarToggleMobile} userType={userRole} userName={datosUsuario.primer_nombre + " " + datosUsuario.primer_apellido} userPhotoBlob={datosUsuario.foto} />
        </div>
      </div>

      <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
        <div className="flex-grow w-[95%] mx-4 mt-[10px]">
          <WelcomeMessage nombre={datosUsuario.primer_nombre + " " + datosUsuario.primer_apellido} />
        </div>
      </div>

      {showLigas && (
        <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
          <div className="flex-grow w-[95%] mx-4 my-4 max-w-full">
            <div className='flex items-center justify-center mb-7 text-shadow-lg opacity-60'>
              <Image width={100} height={100} alt="Logo Ligas" src="/images/pages/Icono_Liga.png" className='h-10 w-10' />
              <a className='text-black text-4xl font-bold'>Ligas</a>
            </div>
            <LigasCarousel ligas={datosLigasPlanillero} onSelectLiga={handleLigasSelect} />
          </div>
        </div>
      )}

      <div
        className={`flex flex-1 flex-col justify-start items-center transition-all duration-300 ${isOpen
          ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0'
          : 'lg:ml-[5%] ml-[0%]'
          }`}
      >
        <div className="flex items-center mb-0 mt-5 mr-[2%]">
          <span className="text-3xl font-bold">Liga &nbsp;</span>
          <a className="text-3xl font-bold">&#39;</a>
          <h3
            className="text-3xl font-bold"
            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
          >
            {nombreLiga}
          </h3>
          <a className="text-3xl font-bold">&#39;</a>
        </div>
      </div>

      <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
        {showCategoria && (
          <div ref={categoriaRef} className="flex-grow mx-4 my-4 max-w-full overflow-hidden w-full mr-4 xxs:mr-10">
            <div className='flex items-center justify-center mb-7 text-shadow-lg opacity-60 flex items-center justify-center'>
              <Image width={100} height={100} alt="Logo Categorías" src="/images/pages/Icono_Categoria.png" className='h-10 w-10' />
              <a className='text-black text-4xl font-bold'>Categorías</a>
            </div>
            <Categoria categorias={datosCategoriasTorneoLiga} onCategoriaSeleccionada={handleCategoriaSelect} />
          </div>
        )}
      </div>

      {showTorneos && (
        <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
          <div ref={torneosRef} className="flex-grow mx-4 my-4 max-w-full overflow-hidden w-full mr-4 xxs:mr-10">
            <div className='flex items-center justify-center mb-7 text-shadow-lg flex items-center justify-center'>
              <Image width={100} height={100} alt="Logo Torneos" src="/images/pages/Icono_Torneos.png" className='h-10 w-10' />
              <a className='text-black text-4xl font-bold opacity-60'>Torneos</a>
            </div>
            <Torneo torneos={datosTorneosLiga} onTorneoSeleccionado={handleTorneosSelect} />
          </div>
        </div>
      )}

      <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
        {showPartidos && (
          <div ref={partidosRef} className="mx-4 my-4 ml-4 lg:ml-7 xl1200:-ml-3 overflow-x-auto w-full ">
            <div className='flex items-center justify-center mb-7 text-shadow-lg '>
              <Image width={100} height={100} alt="Logo Categorías" src="/images/pages/Icono_Partido.png" className='h-10 w-10' />
              <a className='text-black text-4xl font-bold opacity-60'>Partidos</a>
            </div>
            <MatchDays idTorneoCategoria={idTorneoCategoria} jornadas={datosJornadas} tipoUsuario={USER_ROLES.PLANILLERO} onPlanillar={handleOnPlanillar} tipoTorneo={tipoTorneo} />
          </div>
        )}
      </div>
      <br />

      <CustomAlert message={messageCustomAlert} onClose={() => { setShowCustomAlert(false) }} show={showCustomAlert} />

      <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
        <Footer
          userType='Planillero'
          menuOptionsLeft={menuOptionsLeft} // Pasar las opciones modificadas
          menuOptionsRight={menuOptionsRight} // Pasar las opciones modificadas
        />
      </div>
    </div>
  );
};

export default IniciacionHomePlanillero;
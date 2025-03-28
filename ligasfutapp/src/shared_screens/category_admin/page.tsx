"use client";
import React, { useState, Suspense, useEffect, useCallback } from 'react';
import SideBar from '@/components/components_generics/side_bar/SideBar';
import SearchBar from '@/components/components_generics/search_bar/SearchBar';
import Footer from '@/components/components_generics/footer/Footer';
import TitleWithImages from '@/components/components_generics/title_with_images/TitleWithImages';
import CategoryGrid from '@/components/user/admin_league/category_admin/CategoryGrid';
import CustomButton from '@/components/components_generics/button/CustomButton';
import PopUpAddCategory from '@/components/user/admin_league/category_admin/pop-up_add_category/page';
import PopUpEditCategory from '@/components/user/admin_league/category_admin/pop-up_edit_category/page';
import { RingLoader } from 'react-spinners';
import SelectLeague from '@/components/user/admin_league/category_admin/SelectLeague';
import Image from 'next/image';
import { menuOptionsAdminLeague } from '@/components/components_generics/footer/menu_options/MenuOptions';
import { obtenerDatosUsuario } from '@/services/usuarioService';
import { useSearchParams, useRouter } from 'next/navigation';
import { obtenerCategoriasPorAdminLiga } from '@/services/ligaCategoriaService';
import { obtenerLigasAsignadas } from '@/services/adminLigaLigaService';

interface Categoria_AdminProps {
    userRole: string;
}

const Categoria_AdminContent: React.FC<Categoria_AdminProps> = ({ userRole }) => {
    const [showPopupAddCategory, setShowPopupAddCategory] = useState(false);
    const [showPopupEditCategory, setShowPopupEditCategory] = useState(false);
    const [selectedLeague, setSelectedLeague] = useState<number | null>(null);
    const searchParams = useSearchParams();
    const [showLigas, setShowLigas] = useState(false);
    const [showGridCategoria, setShowGridCategoria] = useState(false);
    const [datosUsuario, setDatosUsuario] = useState<any>(null);
    const [datosCategorias, setDatosCategorias] = useState<any>(null);
    const [datosCategoriaSeleccionada, setDatosCategoriaSeleccionada] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [datosLigasAsignadas, setDatosLigasAsignadas] = useState<any>(null);
    const [nombreLiga, setNombreLiga] = useState<any>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const router = useRouter();

    const handleIsLoading = (isLoading: boolean) => {
        setIsLoading(isLoading);
    };

    const obtenerDatos = useCallback(async () => {
        // Obtener datos del usuario
        const usuario = await obtenerDatosUsuario();
        setDatosUsuario(usuario);

        // Obtenemos las ligas a las que el usuario Admin_Liga tiene asignado        
        const ligasAsignadas = await obtenerLigasAsignadas(usuario.id_usuario);
        const ligasAsignadasArray = Array.isArray(ligasAsignadas) ? ligasAsignadas : [ligasAsignadas]
        setDatosLigasAsignadas(ligasAsignadasArray);

        // Verificamos si solo solo es una liga que se obtuvo, si no hacemos que seleccione primeramente la liga que quiere gestionar
        if (ligasAsignadasArray.length === 1) {
            setSelectedLeague(ligasAsignadasArray[0].id_liga);
            setNombreLiga(ligasAsignadasArray[0].nombre);

            await obtenerDatosCategorias(ligasAsignadasArray[0].id_liga);
            setShowGridCategoria(true);
        } else {
            setShowLigas(true);
            setShowGridCategoria(false);
        }
    }, []);

    const obtenerDatosCategorias = async (idLiga: number) => {
        const categorias = await obtenerCategoriasPorAdminLiga(idLiga);
        setDatosCategorias(Array.isArray(categorias.categorias) ? categorias.categorias : [categorias.categorias]);
    };

    useEffect(() => {
        const fetchDatos = async () => {
            try {
                setIsLoading(true);
                await obtenerDatos();
                setIsLoading(false);
            } catch (error) {
                console.error('Error al obtener los datos de la categoría:', error);
                alert('Error: ' + error)

                if (process.env.NODE_ENV === 'production') {
                    router.push('/login.html');
                } else {
                    router.push('/login');
                }
                // router.push('/login');
            }
        };
        fetchDatos();
    }, [obtenerDatos, router]);

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

    // Asegura que `userRole` tenga un valor por defecto si no está definido
    // const userRole = searchParams.get('role') || 'admin';  // Valor por defecto 'admin'

    const handleSidebarToggle = (state) => {
        setIsOpen(state);
    };

    const handleSidebarToggleMobile = (state) => {
        setIsMobileOpen(state);
    };

    // Función para manejar el cambio de torneo seleccionado
    const handleLeagueChange = async (idLiga: number) => {
        if (idLiga === 0) {
            setSelectedLeague(null);
            return;
        }

        // Buscar el nombre de la liga en datosLigasAsignadas
        const ligaSeleccionada = datosLigasAsignadas.find((liga: { id_liga: number; }) => liga.id_liga === idLiga);
        setNombreLiga(ligaSeleccionada.nombre);

        setSelectedLeague(idLiga);
        setShowGridCategoria(true);

        try {
            await obtenerDatosCategorias(idLiga);
        } catch (error) {
            console.error('Error al obtener categorías:', error);
        }
    };

    const handleEditCategory = (categoria) => {
        setDatosCategoriaSeleccionada(categoria);
        setShowPopupEditCategory(true);
    }

    const menuOptionsLeft = menuOptionsAdminLeague.left.map((option) => ({
        ...option,
        color: option.label === 'Categoría' ? 'text-blue-500' : option.color
    }));

    const menuOptionsRight = menuOptionsAdminLeague.right.map((option) => ({
        ...option,
    }));

    return (
        <div className="min-h-screen bg-cream-faf9f6">
            <div className={`${isOpen ? 'lg:ml-70 ml-0' : 'lg:ml-[0%] ml-[0%]'}`}>
                <SideBar userType={userRole} menuDisabled={false} onToggleSidebar={handleSidebarToggle} onToggleSidebarMobile={handleSidebarToggleMobile} isMobileOpen={isMobileOpen} />
            </div>

            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className={`transition-all duration-300 ${isOpen ? 'lg:w-[75%] xl1500:w-[85%] lg:left-[21%] xl1500:left-[13%]' : 'w-[95%] xxs:w-[90%] xl1500:w-[95%] lg:left-[6.5%] xl1500:left-[3.5%]'}  mx-4 my-4 top-0 xxs:left-[3.6%] z-20`}>
                    <SearchBar onToggleSidebarMobile={handleSidebarToggleMobile} userType={userRole} userName={datosUsuario.primer_nombre + " " + datosUsuario.primer_apellido} userPhotoBlob={datosUsuario.foto} />
                </div>
            </div>
            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className="flex flex-col sm850:flex-row justify-center items-center sm500:-translate-x-[7%]">
                    <TitleWithImages
                        leftImageSrc="/images/logos/Icono_Categoria.png"
                        rightImageSrc="/images/logos/Icono_Categoria.png"
                        titleText="Categoría"
                        leftImageOpacity={1}
                        rightImageOpacity={1}
                        titleOpacity={1}
                    />
                </div>
            </div>
            {showLigas && (
                <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                    <SelectLeague
                        label="Liga"
                        icon={<Image src="/images/logos/Icono_Liga.png" width={100} height={100} alt='Icono Torneo' className='w-12 h-12' />}
                        options={datosLigasAsignadas ? datosLigasAsignadas.map(liga => ({ id: liga.id_liga, nombre: liga.nombre })) : []}
                        onChange={(value) => {
                            handleLeagueChange(value);
                        }}
                    />
                </div>
            )}
            {showGridCategoria && (
                <>
                    <div
                        className={`flex flex-1 flex-col justify-start items-center transition-all duration-300 ${isOpen
                            ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0'
                            : 'lg:ml-[5%] ml-[0%]'
                            }`}
                    >
                        <div className="flex items-center mb-5 mr-[2%]">
                            <span className="text-xl xs340:text-3xl sm500:text-4xl font-bold">Liga &nbsp;</span>
                            <a className="text-xl xs340:text-3xl sm500:text-4xl font-bold">&#39;</a>
                            <h3
                                className="text-xl xs340:text-3xl sm500:text-4xl font-bold"
                                style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
                            >
                                {nombreLiga}
                            </h3>
                            <a className="text-xl xs340:text-3xl sm500:text-4xl font-bold">&#39;</a>
                        </div>
                    </div>
                    <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                        <div className="flex-grow w-[95%] mx-4">
                            <CategoryGrid categorias={datosCategorias || []} onCategoriaEliminada={() => obtenerDatosCategorias(selectedLeague)} onEdit={handleEditCategory} setIsLoading={handleIsLoading} />
                        </div>
                    </div>
                    <div className={`flex-col sm500:flex-row flex-1 flex justify-center space-x-0 sm500:space-x-10 items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                        <CustomButton
                            text="Crear categoría"
                            color="#3b82f6"
                            width=""
                            height=""
                            onClick={() => setShowPopupAddCategory(true)}
                            className='w-[80%] flex-col sm750:w-[40%] mt-5 xs300:mt-0'
                            classNameText='text-sm xs360:text-xl'
                            classNameIcon='w-6 sm590:h-8 w-6 sm590:w-8'
                            icon="/images/logos/Icono_Nuevo_Blanco.png"
                        />
                    </div>
                </>
            )}
            {showPopupEditCategory &&
                <PopUpEditCategory
                    onClose={() => { setShowPopupEditCategory(false) }}
                    id_liga={selectedLeague}
                    onCategoryEdited={() => { obtenerDatosCategorias(selectedLeague) }}
                    datosCategoriaSeleccionada={datosCategoriaSeleccionada}
                    setIsLoading={handleIsLoading}
                />}
            {showPopupAddCategory &&
                <PopUpAddCategory
                    onClose={() => { setShowPopupAddCategory(false) }}
                    id_liga={selectedLeague}
                    onCategoryRegistered={() => { obtenerDatosCategorias(selectedLeague) }}
                    setIsLoading={handleIsLoading}
                />}
            <br />
            <br />
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
                        zIndex: '9999', // Para asegurarse de que se muestre sobre otros elementos
                    }}
                    className="flex items-center justify-center"
                >
                    <RingLoader color="#007bff" />
                </div>
            )}
            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <Footer
                    userType={userRole}
                    menuOptionsLeft={menuOptionsLeft}
                    menuOptionsRight={menuOptionsRight}
                />
            </div>
        </div>
    );
};

const Categoria_Admin:React.FC<Categoria_AdminProps> = ({ userRole }) => {
    return (
        <Suspense fallback={
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
                    zIndex: '9999', // Para asegurarse de que se muestre sobre otros elementos
                }}
                className="flex items-center justify-center"
            >
                <RingLoader color="#007bff" />
            </div>
        }>
            <Categoria_AdminContent userRole={userRole} />
        </Suspense >
    );
};

export default Categoria_Admin;

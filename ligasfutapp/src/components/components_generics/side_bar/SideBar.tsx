import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { IoDocumentText, IoPeople, IoChatbox, IoList, IoClose } from 'react-icons/io5';
import PlanilleroMenu from './menus_side_bar/PlanilleroMenu';
import JugadorMenu from './menus_side_bar/JugadorMenu';
import HinchaMenu from './menus_side_bar/HinchaMenu';
import DelegadoMenu from './menus_side_bar/DelegadoMenu';
import AdminMaestroMenu from './menus_side_bar/AdminMaestroMenu';
import AdminLigaMenu from './menus_side_bar/AdminLigaMenu';
import { USER_ROLES } from '@/constants';

const Sidebar: React.FC<{
    userType: string;
    menuDisabled: boolean;
    onToggleSidebar: (state: boolean) => void;
    onToggleSidebarMobile: (state: boolean) => void;
    isMobileOpen: boolean;
    id_partido?: number;
}> = ({ userType, menuDisabled, onToggleSidebarMobile, onToggleSidebar, isMobileOpen, id_partido }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isFullyClosed, setIsFullyClosed] = useState(true);
    const router = useRouter();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
        onToggleSidebar(!isOpen);
    };

    const toggleSidebarMobile = () => {
        onToggleSidebarMobile(!isMobileOpen);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    // Monitorea el estado de isOpen para ajustar isFullyClosed
    useEffect(() => {
        if (isOpen) {
            setIsFullyClosed(false); // Panel está abierto o en proceso de apertura
        } else {
            // Espera a que la transición termine antes de considerar el panel completamente cerrado
            const timer = setTimeout(() => {
                setIsFullyClosed(true);
            }, 300); // 300ms es la duración de la transición

            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isMobileOpen) {
            setIsOpen(true); // Abrir el menú en móviles
        } else {
            setIsOpen(false); // Cerrar el menú en móviles
        }
    }, [isMobileOpen]);

    // Menú de navegación condicional según el tipo de usuario
    const renderMenuItems = () => {
        if (userType === USER_ROLES.PLANILLERO) {
            return <PlanilleroMenu isOpen={isOpen} isHovered={isHovered} menuDisabled={menuDisabled} userType={userType} idPartido={Number(id_partido)} />;
        }

        if (userType === USER_ROLES.JUGADOR) {
            return <JugadorMenu isOpen={isOpen} isHovered={isHovered} menuDisabled={menuDisabled} userType={userType} />;
        }

        if (userType === USER_ROLES.HINCHA) {
            return <HinchaMenu isOpen={isOpen} isHovered={isHovered} menuDisabled={menuDisabled} />
        }

        if (userType === USER_ROLES.DELEGADO) {
            return <DelegadoMenu isOpen={isOpen} isHovered={isHovered} menuDisabled={menuDisabled} userType={userType} />;
        }

        if (userType === USER_ROLES.ADMIN_MAESTRO) {
            return <AdminMaestroMenu isOpen={isOpen} isHovered={isHovered} menuDisabled={menuDisabled} />;
        }

        if (userType === USER_ROLES.ADMIN_LIGA) {
            return <AdminLigaMenu isOpen={isOpen} isHovered={isHovered} menuDisabled={menuDisabled} userType={userType} />;
        }
        // Puedes agregar otros menús para diferentes tipos de usuarios aquí si es necesario
        return null;
    };

    return (
        <div
            className={`fixed z-30 flex-col h-screen p-4 bg-blue-900 text-white shadow-lg transition-all duration-150 ease-in-out
                ${isMobileOpen ? 'w-64 opacity-100 visible' : 'w-20 opacity-0 invisible'} 
                lg:opacity-100 lg:visible lg:flex
                ${isOpen || isHovered ? 'lg:w-64' : 'lg:w-20'} `}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >

            <div className="flex items-center justify-between relative">
                <Image
                    src="/images/apple-touch-icon.png"
                    alt="Futapp Logo"
                    width={isOpen || isHovered ? 40 : 30}
                    height={isOpen || isHovered ? 40 : 30}
                    className="transition-all duration-300 ml-1"
                />
                {/* Imagen que se muestra solo cuando el panel no está completamente cerrado */}
                {
                    <Image
                        src="/images/logos/app-logo-white-futapp.png"
                        alt="Futapp Logo"
                        width={isOpen || isHovered ? 40 : 30}
                        height={isOpen || isHovered ? 40 : 30}
                        className={`transition-all transition-opacity duration-300 ml-5 absolute left-12 w-20 h-9 ${isOpen || isHovered ? 'opacity-100' : 'opacity-0'}`}
                    />
                }
                <button
                    onClick={toggleSidebar}
                    className={`hidden lg:flex absolute right-0 top-0 mt-1 -mr-0 rounded-full border-2 border-white transition-transform duration-300 w-4 h-4 ${isOpen || isHovered ? 'opacity-100' : 'opacity-0'} ${isOpen ? 'bg-green-400' : 'bg-gray-400'}`}
                >
                </button>
                <button
                    onClick={toggleSidebarMobile}
                    className={`lg:hidden absolute right-0 top-0 mt-1 -mr-0 transition-transform duration-300 w-5 h-7 text-2xl `}
                >
                    <IoClose />
                </button>
            </div>

            <div className="mt-10">
                {renderMenuItems()}
            </div>
        </div>
    );
};

export default Sidebar;

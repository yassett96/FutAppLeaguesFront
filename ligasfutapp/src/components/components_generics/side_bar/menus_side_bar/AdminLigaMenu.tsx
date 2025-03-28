import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MenuItem } from '@/interfaces/menuItem';

const AdminLigaMenu: React.FC<{ isOpen: boolean; isHovered: boolean; menuDisabled: boolean, userType: string }> = ({ isOpen, isHovered, menuDisabled, userType }) => {
    const router = useRouter();

    // Definimos los items del menú
    const menuItems: MenuItem[] = [
        { text: 'Categoría', icon: '/images/logos/Icono_Categoria_Blanco.png', enabled: true, path: process.env.NODE_ENV === 'production' ? `/user/admin_league/category_admin.html?role=${userType}`:`/user/admin_league/category_admin/?role=${userType}` , background: '' },
        { text: 'Equipo', icon: '/images/logos/Icono_Equipo_Blanco.png', enabled: true, path: process.env.NODE_ENV === 'production' ?`/user/admin_league/team_admin.html?role=${userType}`:`/user/admin_league/team_admin/?role=${userType}`, background: '' },
        { text: 'Torneos', icon: '/images/logos/Icono_Torneos_General_Blanco.png', enabled: true, path: process.env.NODE_ENV === 'production' ?`/user/admin_league/tournament_admin.html?role=${userType}`:`/user/admin_league/tournament_admin/?role=${userType}`, background: '' },
        { text: 'Sancionado', icon: '/images/logos/Icono_Sancionado_Blanco.png', enabled: true, path: process.env.NODE_ENV === 'production' ? `/user/admin_league/sanctioned_admin.html?role=${userType}` : `/user/admin_league/sanctioned_admin/?role=${userType}`, background: '' },
        { text: 'Planillero', icon: '/images/logos/Icono_Planillero_Blanco.png', enabled: true, path: process.env.NODE_ENV === 'production' ? `/user/admin_league/planner_admin.html?role=${userType}` : `/user/admin_league/planner_admin/?role=${userType}`, background: '' },
        { text: 'Gestionar', icon: '/images/logos/Icono_Gestionar_Blanco.png', enabled: true, path: process.env.NODE_ENV === 'production' ? `/user/admin_league/manage_team.html?role=${userType}` : `/user/admin_league/manage_team/?role=${userType}`, background: '' },
    ];

    return (
        <>
            {menuItems.map((item) => (
                <button
                    key={item.text}
                    className={`text-xl flex items-center mb-3 px-4 py-2 text-left text-gray-200 hover:bg-blue-800 ${menuDisabled || !item.enabled ? 'cursor-not-allowed opacity-50' : ''}`}
                    disabled={menuDisabled || !item.enabled}
                    onClick={() => {                        
                        router.push(item.path)
                    }}
                >
                    <Image
                        src={item.icon}
                        alt={item.text}
                        width={20}
                        height={20}
                        className={`mr-2 ${isOpen || isHovered ? 'ml-0' : '-ml-2'}`}
                    />
                    <span className={`transition-opacity duration-300 ${isOpen || isHovered ? 'opacity-100' : 'opacity-0'}`}>
                        {item.text}
                    </span>
                </button>
            ))}
        </>
    );
};

export default AdminLigaMenu;
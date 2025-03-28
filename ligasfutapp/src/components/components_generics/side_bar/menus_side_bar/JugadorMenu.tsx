import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MenuItem } from '@/interfaces/menuItem';

const JugadorMenu: React.FC<{ isOpen: boolean; isHovered: boolean; menuDisabled: boolean, userType: string }> = ({ isOpen, isHovered, menuDisabled, userType }) => {
    const router = useRouter();

    // Definimos los items del menú
    const menuItems: MenuItem[] = [
        { text: 'Mi perfil', icon: '/images/logos/soccer-player_Blanco.png', enabled: true, path: process.env.NODE_ENV === 'production' ? `/user/player/profile.html?role=${userType}` : `/user/player/profile/?role=${userType}`, background: '' },
        { text: 'Mi equipo', icon: '/images/logos/Icono_Equipo_Blanco.png', enabled: true, path: process.env.NODE_ENV === 'production' ? `/user/player/my_team.html?role=${userType}` : `/user/player/my_team/?role=${userType}`, background: '' },
        { text: 'Torneo', icon: '/images/logos/Icono_Torneo_Blanco.png', enabled: true, path: process.env.NODE_ENV === 'production' ? `/user/player/tournament.html?role=${userType}` : `/user/player/tournament/?role=${userType}`, background: '' },
    ];

    return (
        <>
            {menuItems.map((item) => (
                <button
                    key={item.text}
                    className={`text-xl flex items-center mb-3 px-4 py-2 text-left text-gray-200 hover:bg-blue-800 ${menuDisabled || !item.enabled ? 'cursor-not-allowed opacity-50' : ''}`}
                    disabled={menuDisabled || !item.enabled}
                    onClick={() => router.push(item.path)}
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

export default JugadorMenu;
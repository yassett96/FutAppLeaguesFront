import React, { useState, useRef, useEffect } from 'react';
// import SearchInput from './components_search_bar/SearchInput';
// import LanguageSelector from './components_search_bar/LanguageSelector';
// import ThemeToggle from './components_search_bar/ThemeToggle';
// import ShortcutsPanel from './components_search_bar/ShortcutsPanel';
// import NotificationsPanel from './components_search_bar/NotificationsPanel';
import UserProfile from './components_search_bar/UserProfile';
import {IoMenu, IoClose } from 'react-icons/io5';

interface SearchBarProps {
    onToggleSidebarMobile: (state: boolean) => void;
    userType: string;
    userName: string;
    userPhotoBlob: any;
}

const SearchBar: React.FC<SearchBarProps> = ({ onToggleSidebarMobile, userType, userName, userPhotoBlob  }) => {
    const [searchActive, setSearchActive] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [toggleSideBarMobile, setToggleSideBarMobile] = useState(false);
    const searchRef = useRef(null);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);    
      

    const toggleSearch = () => {
        setSearchActive(!searchActive);
        setSearchTerm('');
    };

    const toggleSidebarMobile = () => {
        onToggleSidebarMobile(!toggleSideBarMobile);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchActive(false);
                setSearchTerm('');
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [searchRef]);

    return (
        <div
            className="sticky top-0 z-50 flex items-center justify-between pr-4 pl-4 pt-1 pb-1 bg-white shadow-lg rounded-xl"
            ref={searchRef}
        >
            <div className="flex items-center space-x-0 xs260:space-x-0 xxxs:space-x-4 w-full">
                {!searchActive ? (
                    <>
                        {/* Botón de menú para pantallas pequeñas */}
                        <IoMenu
                            className="w-6 xxs:w-8 h-6 xxs:h-8 lg:hidden text-gray-500 cursor-pointer"
                            size={24}
                            onClick={toggleSidebarMobile}
                        />
                        {/* <IoSearch
                            className="w-6 xxs:w-8 h-6 xxs:h-8 text-gray-500 cursor-pointer"
                            size={24}
                            onClick={toggleSearch}
                        /> */}
                    </>
                ) : (
                    <>
                        {/* <SearchInput
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            filteredPages={filteredPages}
                            filteredFiles={filteredFiles}
                            filteredMembers={filteredMembers}
                        /> */}
                    </>
                )}
            </div>
            <div className="flex items-center xxs:space-x-4">
                {searchActive && (
                    <IoClose
                        className="w-6 xxs:w-8 h-6 xxs:h-8 text-gray-500 cursor-pointer"
                        size={24}
                        onClick={toggleSearch}
                    />
                )}
                {!searchActive && (
                    <>
                        {/* <LanguageSelector />
                        <ThemeToggle />
                        <ShortcutsPanel />
                        <NotificationsPanel /> */}
                        <UserProfile
                            avatarUrl={userPhotoBlob}
                            userName={userName}
                            userRole={userType}
                            unreadNotifications={4}
                        />
                    </>
                )}
            </div>
        </div>
    );    
};

export default SearchBar;

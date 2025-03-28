import React, { useState, useRef, useEffect } from 'react';
import { IoSunny, IoMoon, IoDesktop } from 'react-icons/io5';

const ThemeToggle: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState('light'); // 'light', 'dark', 'system'
    const toggleRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const selectTheme = (selectedTheme) => {
        setTheme(selectedTheme);
        setIsOpen(false);
    };

    const handleClickOutside = (event) => {
        if (toggleRef.current && !toggleRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const renderIcon = () => {
        switch (theme) {
            case 'dark':
                return <IoMoon className="w-6 xxs:w-8 h-6 xxs:h-8 text-gray-500" size={24} />;
            case 'system':
                return <IoDesktop className="w-6 xxs:w-8 h-6 xxs:h-8 text-gray-500" size={24} />;
            case 'light':
            default:
                return <IoSunny className="w-6 xxs:w-8 h-6 xxs:h-8 text-gray-500" size={24} />;
        }
    };

    const renderTooltipText = () => {
        switch (theme) {
            case 'dark':
                return "Dark Mode";
            case 'system':
                return "System Mode";
            case 'light':
            default:
                return "Light Mode";
        }
    };

    return (
        <div className="relative" ref={toggleRef}>
            <div 
                className="rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-300 hover:cursor-pointer relative group"
                onClick={toggleDropdown}
            >
                {renderIcon()}
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xm rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-32 flex justify-center">
                    <div className="relative">
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-800 rotate-45"></div>
                        {renderTooltipText()}
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg text-xl">
                    <div
                        className={`px-4 py-2 cursor-pointer hover:bg-[#e9e7fd] ${theme === 'light' ? 'bg-[#e9e7fd] text-[#8176f2]' : 'text-black'}`}
                        onClick={() => selectTheme('light')}
                    >
                        <IoSunny className="inline mr-2" />
                        Light
                    </div>
                    <div
                        className={`px-4 py-2 cursor-pointer hover:bg-[#e9e7fd] ${theme === 'dark' ? 'bg-[#e9e7fd] text-[#8176f2]' : 'text-black'}`}
                        onClick={() => selectTheme('dark')}
                    >
                        <IoMoon className="inline mr-2" />
                        Dark
                    </div>
                    <div
                        className={`px-4 py-2 cursor-pointer hover:bg-[#e9e7fd] ${theme === 'system' ? 'bg-[#e9e7fd] text-[#8176f2]' : 'text-black'}`}
                        onClick={() => selectTheme('system')}
                    >
                        <IoDesktop className="inline mr-2" />
                        System
                    </div>
                </div>
            )}
        </div>
    );
};

export default ThemeToggle;

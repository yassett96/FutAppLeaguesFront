import React, { useState, useRef, useEffect } from 'react';
import { IoLanguage } from 'react-icons/io5';

const LanguageSelector: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('Español'); // Idioma por defecto
    const selectorRef = useRef(null);

    const languages = ['Español', 'English', 'French'];

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const selectLanguage = (language) => {
        setSelectedLanguage(language);
        setIsOpen(false);
    };

    const handleClickOutside = (event) => {
        if (selectorRef.current && !selectorRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={selectorRef}>
            <div 
                className='rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-300 hover:cursor-pointer'
                onClick={toggleDropdown}
            >
                <IoLanguage className="w-6 xxs:w-8 h-6 xxs:h-8 text-gray-500" size={24} />
            </div>
            {isOpen && (
                <div className="absolute -right-2 xxxs:right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg">
                    {languages.map((language, index) => (
                        <div
                            key={index}
                            className={`px-4 py-2 cursor-pointer text-xl hover:bg-[#f3f2f3] ${
                                selectedLanguage === language ? 'bg-[#e9e7fd] text-[#8176f2]' : 'text-black'
                            }`}
                            onClick={() => selectLanguage(language)}
                        >
                            {language}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;

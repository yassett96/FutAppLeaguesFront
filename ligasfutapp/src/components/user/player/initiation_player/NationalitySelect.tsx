import React, { useState } from 'react';
import Image from 'next/image';

const NationalitySelect = ({ onNationalityChange }) => {
  // Lista de nacionalidades (puedes añadir más si es necesario)
  const nacionalidades = [
    'Argentina', 'Bolivia', 'Brasil', 'Chile', 'Colombia', 'Costa Rica', 'Cuba',
    'Ecuador', 'El Salvador', 'Guatemala', 'Honduras', 'México', 'Nicaragua',
    'Panamá', 'Paraguay', 'Perú', 'República Dominicana', 'Uruguay', 'Venezuela'
  ];

  // Estados para la búsqueda y el select
  const [inputValue, setInputValue] = useState('');
  const [filteredNacionalidades, setFilteredNacionalidades] = useState(nacionalidades);
  const [showDropdown, setShowDropdown] = useState(false);

  // Manejar el cambio en el input de texto
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Filtrar nacionalidades según el valor del input
    const filtered = nacionalidades.filter((nacionalidad) =>
      nacionalidad.toLowerCase().includes(value.toLowerCase())
    );
    
    setFilteredNacionalidades(filtered);

    // Mostrar el dropdown solo si hay algo en el input
    setShowDropdown(value.length > 0);
  };

  // Manejar el focus en el input para mostrar el dropdown
  const handleInputFocus = () => {    
    setShowDropdown(true);    
  };

  // Manejar la selección de una opción del dropdown
  const handleOptionClick = (nacionalidad: any) => {
    setInputValue(nacionalidad); // Actualiza el valor del input con la nacionalidad seleccionada
    setShowDropdown(false); // Ocultar el dropdown al seleccionar
    onNationalityChange(nacionalidad); // Notificar al componente padre
  };

  return (
    <div className="text-center mb-6">
      {/* Título con icono */}
      <div className="flex justify-center items-center mb-2">
        <Image
          width={100}
          height={100}
          src="/images/logos/Icono_Nacionalidad.png"
          alt="Nationality Icon"
          className="w-7 sm750:w-10 h-7 sm750:h-10 mr-2 mt-1 opacity-50"
        />
        <h3 className="text-xl sm590:text-2xl font-bold text-black opacity-50">Nacionalidad</h3>
      </div>

      {/* Input para búsqueda */}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus} // Mostrar el dropdown al hacer click en el input
        placeholder="Escriba para buscar una nacionalidad"
        className="w-[80%] xxs:w-[50%] lg:w-1/4 p-2 border border-gray-300 rounded mx-auto block text-black mb-2 text-sm sm750:text-2xl"
      />

      {/* Dropdown dinámico */}
      {showDropdown && (
        <ul
          className="w-[80%] xxs:w-[50%] lg:w-1/4 p-2 border border-gray-300 rounded mx-auto block text-black max-h-32 overflow-y-auto"
        >
          {filteredNacionalidades.length > 0 ? (
            filteredNacionalidades.map((nacionalidad, index) => (
              <li
                key={index}
                className="cursor-pointer p-2 hover:bg-gray-200"
                onClick={() => handleOptionClick(nacionalidad)}
              >
                {nacionalidad}
              </li>
            ))
          ) : (
            <li className="p-2">No se encontraron coincidencias</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default NationalitySelect;

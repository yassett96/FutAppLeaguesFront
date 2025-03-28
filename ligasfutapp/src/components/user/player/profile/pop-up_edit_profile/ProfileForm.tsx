import React, { useRef, useState } from 'react';
import Image from 'next/image';

const PlayerForm = ({
  primer_nombre,
  segundo_nombre,
  primer_apellido,
  segundo_apellido,
  foto,
  dni,
  fecha_nacimiento,
  nacionalidad,
  onInputChange,
  onFotoChange,
}) => {
  const nacionalidades = [
    'Argentina', 'Bolivia', 'Brasil', 'Chile', 'Colombia', 'Costa Rica', 'Cuba',
    'Ecuador', 'El Salvador', 'Guatemala', 'Honduras', 'México', 'Nicaragua',
    'Panamá', 'Paraguay', 'Perú', 'República Dominicana', 'Uruguay', 'Venezuela'
  ];

  const [inputValue, setInputValue] = useState(nacionalidad);
  const [filteredNacionalidades, setFilteredNacionalidades] = useState(nacionalidades);
  const [showDropdown, setShowDropdown] = useState(false);
  const fileInputRef = useRef(null);

  const handleFotoClick = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onInputChange(name, value);
  };

  const handleNacionalidadChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    const filtered = nacionalidades.filter((nacionalidad) =>
      nacionalidad.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredNacionalidades(filtered);
    setShowDropdown(true);
    onInputChange('nacionalidad', value);
  };

  const handleSelectChange = (nacionalidad) => {
    setInputValue(nacionalidad);
    setShowDropdown(false);
    onInputChange('nacionalidad', nacionalidad);
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === 'string') {
          onFotoChange(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4 mx-auto bg-blue-900 rounded-lg opacity-90 text-black text-shadow-lg w-full max-w-3xl relative">
      {/* Campo de Primer Nombre */}
      <div className="mb-4 flex flex-wrap items-center text-center justify-center">
        <Image width={100} height={100} src="/images/logos/Icono_Nombres_Blanco.png" alt="First Name" className="mr-1 h-10 w-10 mt-2" />
        <label className="text-white text-xl sm590:text-2xl font-bold w-full sm:w-auto sm:mr-4">Primer Nombre:</label>
        <input
          type="text"
          name="primer_nombre"
          value={primer_nombre}
          onChange={handleInputChange}
          className="border ml-2 p-2 rounded flex-1 text-[13px] text-shadow-default w-full sm:w-auto"
          placeholder="Primer Nombre"
        />
      </div>

      {/* Campo de Segundo Nombre */}
      <div className="mb-4 flex flex-wrap items-center text-center justify-center">
        <Image width={100} height={100} src="/images/logos/Icono_Nombres_Blanco.png" alt="Second Name" className="mr-1 h-10 w-10 mt-2" />
        <label className="text-white text-xl sm590:text-2xl font-bold w-full sm:w-auto sm:mr-4">Segundo Nombre:</label>
        <input
          type="text"
          name="segundo_nombre"
          value={segundo_nombre}
          onChange={handleInputChange}
          className="border ml-2 p-2 rounded flex-1 text-shadow-default w-full sm:w-auto"
          placeholder="Segundo Nombre"
        />
      </div>

      {/* Campo de Primer Apellido */}
      <div className="mb-4 flex flex-wrap items-center text-center justify-center">
        <Image width={100} height={100} src="/images/logos/Icono_Apellidos_Blanco.png" alt="First Last Name" className="mr-2 h-10 w-10 mt-2" />
        <label className="text-xl sm590:text-2xl font-bold text-white w-full sm:w-auto sm:mr-4">Primer Apellido:</label>
        <input
          type="text"
          name="primer_apellido"
          value={primer_apellido}
          onChange={handleInputChange}
          className="border ml-2 p-2 rounded flex-1 text-shadow-default w-full sm:w-auto"
          placeholder="Primer Apellido"
        />
      </div>

      {/* Campo de Segundo Apellido */}
      <div className="mb-4 flex flex-wrap items-center text-center justify-center">
        <Image width={100} height={100} src="/images/logos/Icono_Apellidos_Blanco.png" alt="Second Last Name" className="mr-2 h-10 w-10 mt-2" />
        <label className="text-xl sm590:text-2xl font-bold text-white w-full sm:w-auto sm:mr-4">Segundo Apellido:</label>
        <input
          type="text"
          name="segundo_apellido"
          value={segundo_apellido}
          onChange={handleInputChange}
          className="border ml-2 p-2 rounded flex-1 text-shadow-default w-full sm:w-auto"
          placeholder="Segundo Apellido"
        />
      </div>

      {/* Foto */}
      <div className="mb-4 flex flex-wrap items-center text-center justify-center">
        <Image width={100} height={100} src="/images/logos/Icono_Foto_Blanco.png" alt="foto" className="mr-2 h-9 w-10 mt-2" />
        <label className="text-xl sm590:text-2xl font-bold text-white mr-2 w-full sm:w-auto">Foto:</label>
        <div
          className="border p-2 rounded w-32 h-32 flex items-center justify-center bg-gray-200 cursor-pointer"
          onClick={handleFotoClick}
        >
          {foto ? (
            <Image width={100} height={100} src={foto} alt="Player" className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-500">No image</span>
          )}
        </div>
        <input
          type="file"
          accept="image/jpeg"
          onChange={handleFotoChange}
          ref={fileInputRef}
          className="hidden"
        />
      </div>

      {/* DNI */}
      <div className="mb-4 flex flex-wrap items-center text-center justify-center">
        <Image width={100} height={100} src="/images/logos/Icono_DNI_Blanco.png" alt="DNI" className="mr-2 h-9 w-10 mt-1" />
        <label className="text-xl sm590:text-2xl font-bold text-white w-full sm:w-auto sm:mr-4">DNI:</label>
        <input
          type="text"
          name="dni"
          value={dni}
          disabled
          className="border ml-2 p-2 rounded flex-1 bg-gray-100 text-shadow-default w-full sm:w-auto"
        />
      </div>

      {/* Fecha de Nacimiento */}
      <div className="mb-4 flex flex-wrap items-center text-center justify-center">
        <Image width={100} height={100} src="/images/logos/Icono_Cumple_Blanco.png" alt="Birth Date" className="mr-2 h-9 w-9" />
        <label className="text-xl sm590:text-2xl font-bold text-white w-full sm:w-auto sm:mr-4">F. de Nac.:</label>
        <input
          type="date"
          name="fecha_nacimiento"
          value={fecha_nacimiento}
          onChange={handleInputChange}
          className="border ml-2 p-2 rounded flex-1 text-shadow-default w-full sm:w-auto"
        />
      </div>

      {/* Nacionalidad */}
      <div className="relative mb-4 flex flex-wrap items-center text-center justify-center">
        <Image
          width={100}
          height={100}
          src="/images/logos/Icono_Nacionalidad_Blanco.png"
          alt="nacionalidad"
          className="mr-2 h-9 w-9"
        />
        <label className="text-xl sm590:text-2xl font-bold text-white w-full sm:w-auto sm:mr-4">Nacionalidad:</label>
        <div className='w-full flex items-center justify-center flex-col mt-3'>
          {/* Input para búsqueda */}
          <input
            type="text"
            value={inputValue}
            onChange={handleNacionalidadChange}
            onFocus={() => setShowDropdown(true)} // Mostrar el dropdown al hacer click en el input
            placeholder="Escriba para buscar una nacionalidad"
            className="border ml-2 p-2 rounded flex-1 text-shadow-default w-full sm:w-auto mb-2"
          />

          {/* Dropdown dinámico */}
          {showDropdown && (
            <div className="border p-2 rounded flex-1 text-shadow-default w-1/2 max-h-40 overflow-y-auto bg-white z-50">
              {filteredNacionalidades.length > 0 ? (
                filteredNacionalidades.map((nacionalidad, index) => (
                  <div key={index} onClick={() => handleSelectChange(nacionalidad)} className="cursor-pointer p-2 hover:bg-gray-200">
                    {nacionalidad}
                  </div>
                ))
              ) : (
                <div className="p-2">No se encontraron coincidencias</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerForm;

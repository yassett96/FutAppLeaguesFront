import React from 'react';

interface SelectTeamProps {
  label: string;
  icon: React.ReactNode;
  options: { id_equipo_categoria: number; nombre: string }[];
  onChange: (value: { id_equipo_categoria: number; nombre: string }) => void;
}

const SelectTeam: React.FC<SelectTeamProps> = ({ label, icon, options, onChange }) => {
  return (
    <div className="select-box flex flex-col items-center justify-center mt-10 w-[80%] sm590:w-[80%]">
      <label className="select-box-label flex items-center mb-2 opacity-70 text-xl sm750:text-2xl text-center">
        {icon} {label}
      </label>
      <select
        onChange={(e) => {
          const selectedOption = options.find(option => option.id_equipo_categoria === Number(e.target.value));

          if (selectedOption) {
            onChange(selectedOption);
          }
        }}
        className="select-box-select text-sm sm750:text-2xl p-2 rounded w-[100%] shadow-lg font-bold"
      >
        <option value="">Selecciona un torneo</option>
        {options.map((option, key) => (
          <option key={option.id_equipo_categoria} value={option.id_equipo_categoria}>
            {option.nombre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectTeam;
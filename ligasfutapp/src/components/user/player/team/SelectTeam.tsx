import React from 'react';

interface SelectTeamProps {
  label: string;
  icon: React.ReactNode;
  options: { id: number; nombre: string }[];
  onChange: (value: number) => void;
}

const SelectTeam: React.FC<SelectTeamProps> = ({ label, icon, options, onChange }) => {  
  return (
    <div className="select-box flex flex-col items-center justify-center mt-10 text-4xl w-[80%] sm590:w-[80%]">
      <label className="select-box-label flex items-center mb-2 opacity-70">
        {icon} {label}
      </label>
      <select
        onChange={(e) => onChange(Number(e.target.value))}
        className="select-box-select text-sm sm750:text-2xl p-2 rounded w-[100%] shadow-lg font-bold"
      >
        <option value="">Selecciona el equipo que quieres ver</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nombre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectTeam;
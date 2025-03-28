import React from 'react';

interface SelectLeagueProps {
  label: string;
  icon: React.ReactNode;
  options: { id: number; nombre: string }[];
  onChange: (value: number) => void;
}

const SelectLeague: React.FC<SelectLeagueProps> = ({ label, icon, options, onChange }) => {
  console.log("options: ", options);
  return (
    <div className="text-xl xs340:text-3xl sm500:text-4xl select-box flex flex-col items-center justify-center mt-10 w-[80%] sm590:w-[80%]">
      <label className="select-box-label flex items-center mb-2 opacity-70">
        {icon} {label}
      </label>
      <select
        onChange={(e) => onChange(Number(e.target.value))}
        className="text-sm sm750:text-2xl select-box-select text-xl p-2 rounded w-[100%] shadow-lg font-bold"
      >
        <option value="">Selecciona la liga que quieres gestionar</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nombre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectLeague;
import React from 'react';

interface TournamentOption {
  id: number;
  nombre: string;
  tipo_torneo: any;
}

interface SelectTournamentProps {
  label: string;
  icon: React.ReactNode;
  options: { id: number; nombre: string }[];
  onChange: (value: any) => void;
}

const SelectTournament: React.FC<SelectTournamentProps> = ({ label, icon, options, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    // Si está vacío, enviamos null
    if (!value) {
      onChange(null);
      return;
    }
    // Parseamos el objeto completo
    const selectedOption: TournamentOption = JSON.parse(value);
    onChange(selectedOption);
  };
  
  return (
    <div className="select-box flex flex-col items-center justify-center mt-10 text-4xl w-[80%] sm590:w-[80%]">
      <label className="select-box-label flex items-center mb-2 text-center text-xl sm590:text-2xl">
        {icon} {label}
      </label>
      <select
        onChange={handleChange}
        className="select-box-select p-2 rounded w-[100%] shadow-lg font-bold text-sm sm750:text-2xl"
      >
        <option value="">Selecciona un torneo</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nombre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectTournament;
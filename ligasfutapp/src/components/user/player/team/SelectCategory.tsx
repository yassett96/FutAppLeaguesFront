import React from 'react';

interface Categoria {
  id: number;
  nombre: string;
}

interface SelectCategoryProps {
  label: string;
  icon: React.ReactNode;
  options: Categoria[];
  onChange: (value: number) => void;
  isVisible: boolean;
}

const SelectCategory: React.FC<SelectCategoryProps> = ({ label, icon, options, onChange, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="select-box flex flex-col items-center justify-center mt-10 text-4xl w-[80%] sm590:w-[80%]">
      <label className="select-box-label flex items-center mb-2 opacity-50 text-center">
        {icon} {label}
      </label>
      <select onChange={(e) => onChange(Number(e.target.value))} className="select-box-select text-xl p-2 rounded w-[100%] shadow-lg font-bold">
        <option value="">Selecciona una categoría</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nombre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCategory;
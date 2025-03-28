import React from 'react';

const SelectionButtons = ({ selectedButton, onButtonClick }) => {
  return (
    <div className="flex flex-col xxxs:flex-row justify-center space-y-4 xxxs:space-y-0 xxxs:space-x-0 my-4 max-w-1xl mx-auto">
      {['Árbitro', 'Capitán Equipo local', 'Capitán Equipo visitante'].map(button => (
        <button
          key={button}
          className={`flex-grow max-w-sm px-4 py-2 border-[1px] border-black shadow-xl text-2xl ${selectedButton === button ? 'bg-white text-blue-500' : 'bg-blue-500 text-white'}`}
          onClick={() => onButtonClick(button)}
        >
          {button}
        </button>
      ))}
    </div>
  );
};

export default SelectionButtons;
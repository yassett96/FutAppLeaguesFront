import React from 'react';

const TermsAndConditions = ({ onTermsChange }) => {
  const handleCheckboxChange = (e) => {
    onTermsChange(e.target.checked);
  };

  return (
    <div className="text-center mb-0 sm750:mb-6 text-black w-full">
      <h3 className="text-xl sm590:text-2xl font-bold text-black opacity-50 mb-2">Términos y condiciones</h3>
      <div className="bg-white p-4 border border-gray-300 rounded w-[95%] mx-auto">
        <p className="text-[10px] xxs:text-xl sm590:text-2xl text-left mb-2">
          Al proporcionar tu DNI, aceptas que utilizaremos esta información únicamente para la firma de jugadores antes de iniciar cada partido.
        </p>
        <p className="text-[10px] xxs:text-xl sm590:text-2xl text-left mb-2">
          Garantizamos que tus datos personales serán tratados con total confidencialidad y seguridad, y no serán compartidos con terceros sin tu consentimiento explícito.
        </p>
        <p className="text-[10px] xxs:text-xl sm590:text-2xl text-left mb-2">
          Al hacer clic en &lsquo;GUARDAR&lsquo;, confirmas que has leído y aceptas estos términos y condiciones.
        </p>
        <div className="flex items-center">
          <input type="checkbox" id="terms" className="mr-2" onChange={handleCheckboxChange} />
          <br />
          <br />
          <label htmlFor="terms" className="text-[10px] xxs:text-xl sm590:text-2xl">He leído y acepto los términos y servicios.</label>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
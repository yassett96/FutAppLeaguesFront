import React from 'react';

const FieldSection = () => {
  return (
    <section className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/pages/football-field.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex items-center justify-center h-full text-center text-white p-4">
        <h2 className="text-2xl md:text-4xl lg:text-5xl leading-relaxed md:leading-loose lg:leading-loose max-w-lg md:max-w-2xl lg:max-w-4xl">
          Lleva tus ligas y torneos a otro nivel con Futapp Leagues. Automatiza y facilita la gestión de los distintos roles, entregando a los jugadores una mejor experiencia.
        </h2>
      </div>
    </section>
  );
};

export default FieldSection;
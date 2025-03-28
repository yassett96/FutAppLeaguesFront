"use client"
import React from 'react';
import Image from 'next/image';

const customLoader = ({ src }) => {
  return src;
};

const ActivityTimelineInicio = () => {
  return (
    <section className="text-black p-4 rounded shadow-md mt-8 w-full max-w-6xl mx-auto move-to-up-280px height-200px">
      <Image loader={customLoader} unoptimized src="/images/pages/demo-app.png" className='' alt="Icono Demo App" width={1000} height={1000} />
    </section>
  );
};

export default ActivityTimelineInicio;
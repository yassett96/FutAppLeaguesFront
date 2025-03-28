import React from 'react';
import Image from 'next/image';

const Comments = ({ title, comments, icon }) => {
  return (
    <div className="p-4 text-shadow-lg text-center">
      <div className='flex justify-center'>
        <Image width={100} height={100} alt='Icono Comentario' src='/images/logos/Icono_Comentario_Blanco.png' className='h-10 w-10'/>
        <Image width={100} height={100} alt='Imagen Icono' src={icon} className='h-10 w-10'/>
      </div>
      <div className='flex justify-center'>
        <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
      </div>
      <textarea
        className="w-[100%] lg:w-3/5 h-48 p-2 border border-gray-300 rounded mx-auto block text-black shadow-lg"
        value={comments}
        readOnly
      ></textarea>
    </div>
  );
};

export default Comments;
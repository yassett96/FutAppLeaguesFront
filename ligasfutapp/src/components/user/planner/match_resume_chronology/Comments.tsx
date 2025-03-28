import React from 'react';
import Image from 'next/image';

const Comments = ({ title, comments, icon }) => {
  return (
    <div className="p-4 text-shadow-lg w-full mr-[0%] sm670:mr-[10%] -translate-x-[5%] sm670:-translate-x-[-5%]">
      <div className='flex justify-center'>
        <Image width={100} height={100} alt='' src='/images/logos/Icono_Comment.png' className='h-6 sm590:h-10 w-6 sm590:w-10' />
        <Image width={100} height={100} alt='' src={icon} className='h-6 sm590:h-10 w-6 sm590:w-10' />
      </div>
      <div className='flex justify-center'>
        <h3 className="text-sm sm590:text-xl font-bold mb-4 text-black opacity-60 text-center">{title}</h3>
      </div>
      <textarea
        className="text-sm sm590:text-xl w-[100%] xs360:w-[80%] translate-x-[5%] sm670:translate-x-[0%] sm670:w-3/5 h-48 p-2 border border-gray-300 rounded mx-auto block text-black shadow-lg"
        value={comments}
        readOnly
      ></textarea>
    </div>
  );
};

export default Comments;
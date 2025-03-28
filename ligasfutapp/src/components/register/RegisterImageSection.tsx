import React from 'react';
import Image from 'next/image';

const RegisterImageSection = () => {
  return (
    <div className="hidden md:flex items-center justify-center bg-white w-full md:w-2/3 border-color-white sm:hidden">
        <Image src="/images/logos/app-logo-primary-square.png" alt="Futapp Logo" className="absolute -top-10 left-10 ml-3" width={200} height={200} />
      <div className='border-radius-30px bg-gray-100 height-850px width-93perc'>
        <Image src="/images/pages/register-img.png" alt="Login Image" className="move-to-down-100px custom-1534:left-5perc" width={870} height={870} />
      </div>
    </div>
  );
};

export default RegisterImageSection;
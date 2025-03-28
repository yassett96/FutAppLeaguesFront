import React from 'react';
import Image from 'next/image';

const Header = ({pathImageLogo, titlePopUp}) => {
  return (
    <div className="flex items-center p-0 xs360:p-4 text-shadow-lg">
      <Image src={pathImageLogo} alt="Nuevo Evento" className="w-10 h-10 mr-0 xs360:mr-2" width={100} height={100} />
      <h2 className="text-4xl font-bold text-white text-center">{titlePopUp}</h2>
    </div>
  );
};

export default Header;
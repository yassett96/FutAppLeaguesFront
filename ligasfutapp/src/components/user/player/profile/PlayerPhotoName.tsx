import React from 'react';
import Image from 'next/image';

const PlayerPhotoName = ({ name, photo }) => {
  return (
    <div className="flex flex-col items-center -translate-x-[1.5%]">
      <h2 className="text-xl sm750:text-2xl font-semibold mb-4 text-black">{name}</h2>
      <div className="w-60 h-35 flex items-center justify-center p-3 rounded-3xl border shadow-xl">
        {photo ? <Image width={100} height={100} src={photo} alt="Player photo" className="w-full h-full object-cover mt-4 max-h-[170px]" /> : <div>Photo</div>}
      </div>
    </div>
  );
};

export default PlayerPhotoName;
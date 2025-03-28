import React, { useRef, useState } from 'react';
import Image from 'next/image';

const PhotoUpload = ({ onImageChange }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        onImageChange(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="text-center mb-6">
      <div className="flex justify-center items-center mb-2">
        <Image width={100} height={100} src="/images/logos/Icono_Foto.png" alt="Photo Icon" className="w-8 sm750:w-11 h-7 sm750:h-10 mr-2 mt-2 opacity-50" />
        <h3 className="text-xl sm590:text-2xl font-bold text-black opacity-50">Foto</h3>
      </div>
      <div className="border border-gray-300 rounded w-[80%] xxs:w-[50%] lg:w-1/6 h-50 mx-auto flex justify-center items-center p-8" onClick={handleImageClick}>
        {selectedImage ? (
          <Image width={100} height={100} src={selectedImage} alt="Selected" className="w-40 h-40 object-cover rounded" />
        ) : (
          <Image width={100} height={100} src="/images/logos/Icono_Agregar_Foto.png" alt="Upload Icon" className="w-20 sm750:w-40 h-20 sm750:h-40 opacity-50 cursor-pointer" />
        )}
        <input
          type="file"
          accept="image/jpeg"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default PhotoUpload;
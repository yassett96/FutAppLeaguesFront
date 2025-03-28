import React from 'react';
import Image from 'next/image';

interface TitleWithImagesProps {
    leftImageSrc: string;
    rightImageSrc: string;
    titleText: string;
    leftImageOpacity?: number;
    rightImageOpacity?: number;
    titleOpacity?: number;
}

const TitleWithImages: React.FC<TitleWithImagesProps> = ({
    leftImageSrc,
    rightImageSrc,
    titleText,
    leftImageOpacity = 1,
    rightImageOpacity = 1,
    titleOpacity = 1
}) => {
    return (
        <div className="flex justify-center items-center mb-4 w-1/2 w-full">
            <Image
                width={100}
                height={100}
                src={leftImageSrc}
                alt="Left Icon"
                className="w-14 sm500:w-20 h-14 sm500:h-20 mr-0 sm:w-25 sm:h-25"
                style={{ opacity: leftImageOpacity }}
            />
            <h2 className="text-xl sm500:text-2xl sm750:text-3xl font-bold text-gray-900 text-center" style={{ opacity: titleOpacity }}>
                {titleText}
            </h2>
            <Image
                width={100}
                height={100}
                src={rightImageSrc}
                alt="Right Icon"
                className="w-14 sm500:w-20 h-14 sm500:h-20 mb-0 h-30 ml-0"
                style={{ opacity: rightImageOpacity }}
            />
        </div>
    );
};

export default TitleWithImages;
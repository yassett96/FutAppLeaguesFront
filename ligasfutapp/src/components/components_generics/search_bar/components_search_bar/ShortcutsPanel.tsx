import React from 'react';
import { IoGrid } from 'react-icons/io5';

const ShortcutsPanel: React.FC = () => {
    return (
        <div className='rounded-full w-10 h-10 items-center flex justify-center hover:bg-gray-300 hover:cursor-pointer'>
            <IoGrid className="w-6 xxs:w-8 h-6 xxs:h-8 text-gray-500 cursor-pointer" size={24} />
        </div>
    );
};

export default ShortcutsPanel;
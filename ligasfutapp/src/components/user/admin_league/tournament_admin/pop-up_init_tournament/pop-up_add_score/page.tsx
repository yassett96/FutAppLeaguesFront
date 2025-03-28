"use client";
import React from 'react';
import Header from './Header';
import ScoreForm from './ScoreForm';
import ActionButtons from './ActionButtons';

interface PageProps {
  onInit?: () => void;
  onClose?: () => void;
}

const PopUpAddCategory: React.FC<PageProps> = ({ onInit, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white rounded-lg overflow-y-auto max-h-screen w-full max-w-3xl">
        <Header />
        <br />
        <ScoreForm />
        <br />
        <ActionButtons onClose={onClose} />
      </div>
    </div>
  );
};

export default PopUpAddCategory;
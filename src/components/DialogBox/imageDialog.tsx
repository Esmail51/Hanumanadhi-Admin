import React, { useState } from 'react';
import Modal from 'react-modal';

interface Image {
  uri: string;
}

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: Image[];
  initialIndex: number;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, images, initialIndex }) => {
    console.log('images:', images);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  if (!isOpen) return null;

  const goToPrevious = () => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  const goToNext = () => setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative w-3/4 max-w-5xl p-4 bg-white rounded shadow-lg">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600">Close</button>
        
        <div className="flex items-center justify-between">
          <img src={images[currentIndex].uri} alt={`Slide ${currentIndex + 1}`} className="max-h-[38rem] w-full object-contain" />
        </div>
      </div>
    </Modal>
  );
};

export default ImageModal;

// src/components/ImageCard.tsx
import React from 'react';
import Image from 'next/image';

interface ImageCardProps {
  title: string | null;
  imageUrl: string;
  onClick: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ title, imageUrl, onClick }) => {
  return (
    <div
      className="shadow-lg transition-transform duration-300 hover:scale-105 overflow-hidden rounded-lg cursor-pointer"
      onClick={onClick}
    >
      <div className="relative w-full h-60">
        <Image
          src={imageUrl}
          alt={title || 'Image'}
          layout="fill"
          objectFit="contain"
          className="rounded-lg"
        />
      </div>
      <h3 className="mt-2 text-lg font-semibold text-center">{title}</h3>
    </div>
  );
};

export default ImageCard;

'use client';

import React, { useState } from 'react';
import { StaticImageData } from 'next/image';
import '../styles/gallery.css';

interface GalleryImage {
  src: string | StaticImageData;
  alt: string;
  caption?: string;
}

interface GalleryProps {
  images: GalleryImage[];
  title?: string;
}

export default function Gallery({ images, title }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const openModal = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="gallery-container">
      {title && (
        <h2 style={{ 
          fontFamily: 'Times New Roman, Times, serif',
          textAlign: 'center',
          marginBottom: '2rem',
          color: '#333'
        }}>
          {title}
        </h2>
      )}
      
      <div className="masonry-gallery">
        {images.map((image, index) => (
          <div 
            key={index}
            className="masonry-item"
            onClick={() => openModal(image)}
          >
            <img 
              src={typeof image.src === 'string' ? image.src : image.src.src}
              alt={image.alt}
            />
            {image.caption && (
              <p className="masonry-item-caption">{image.caption}</p>
            )}
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={typeof selectedImage.src === 'string' ? selectedImage.src : selectedImage.src.src}
              alt={selectedImage.alt}
              style={{ 
                maxWidth: '100%', 
                maxHeight: '100%',
                objectFit: 'contain'
              }}
            />
            {selectedImage.caption && (
              <div className="modal-caption">{selectedImage.caption}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

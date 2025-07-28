"use client";

import { useState, useEffect } from "react";
import Header from "../../../../components/Header";
import "../../../../styles/travels.css";

// Sample gallery data - in real app this would come from Firebase/database
const newYorkImages = [
  { src: "/images/travel/cam1.png", alt: "Central Park morning", caption: "Central Park morning" },
  { src: "/images/travel/cam2.png", alt: "Brooklyn Bridge", caption: "Brooklyn Bridge" },
  { src: "/images/travel/cam3.png", alt: "Times Square", caption: "Times Square" },
  { src: "/images/travel/cam4.png", alt: "Manhattan skyline", caption: "Manhattan skyline" },
  { src: "/images/travel/cam5.png", alt: "High Line", caption: "High Line" },
  { src: "/images/travel/cam6.png", alt: "Staten Island Ferry", caption: "Staten Island Ferry" },
  { src: "/images/travel/cam7.png", alt: "Empire State Building", caption: "Empire State Building" },
  { src: "/images/travel/cam8.png", alt: "Central Station", caption: "Central Station" },
  { src: "/images/travel/london2.png", alt: "Street art", caption: "Street art" },
  { src: "/images/travel/bridge1.png", alt: "Night lights", caption: "Night lights" },
];

export default function NewYorkPage() {
  const [selectedImage, setSelectedImage] = useState<typeof newYorkImages[0] | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check admin status (you can implement proper authentication)
  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminStatus);
  }, []);

  const openModal = (image: typeof newYorkImages[0]) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <Header currentPage="travels" />
      
      <main style={{ paddingTop: '120px', padding: '120px 1rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 
            style={{ 
              color: '#333',
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: '60px',
              marginBottom: '1rem'
            }}
          >
            New York
          </h1>
          
          {isAdmin && (
            <button
              onClick={() => window.location.href = '/admin/upload?city=newyork&country=usa'}
              style={{
                backgroundColor: '#333',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '5px',
                cursor: 'pointer',
                fontFamily: "'Times New Roman', Times, serif",
                marginBottom: '1rem'
              }}
            >
              Upload Photos
            </button>
          )}
        </div>

        {/* Pinterest-style masonry gallery */}
        <div 
          style={{
            columns: 'auto 300px',
            columnGap: '1rem',
            maxWidth: '1400px',
            margin: '0 auto'
          }}
        >
          {newYorkImages.map((image, index) => (
            <div 
              key={index}
              onClick={() => openModal(image)}
              style={{
                breakInside: 'avoid',
                marginBottom: '1rem',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '10px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.3s, box-shadow 0.3s',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block'
                }}
              />
              <div style={{ padding: '1rem' }}>
                <p style={{
                  margin: 0,
                  color: '#333',
                  fontFamily: "'Times New Roman', Times, serif",
                  fontSize: '14px'
                }}>
                  {image.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for enlarged image */}
        {selectedImage && (
          <div 
            onClick={closeModal}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              cursor: 'pointer'
            }}
          >
            <div style={{ maxWidth: '90vw', maxHeight: '90vh', position: 'relative' }}>
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: '1rem',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'rgba(0,0,0,0.7)',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '5px',
                fontFamily: "'Times New Roman', Times, serif"
              }}>
                {selectedImage.caption}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

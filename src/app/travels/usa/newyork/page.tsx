"use client";

import { useState, useEffect } from "react";
import Header from "../../../../components/Header";

// Sample gallery data
const sampleImages = [
  { src: "/images/travel/cam1.png", alt: "Central Park morning", caption: "Central Park morning" },
  { src: "/images/travel/cam2.png", alt: "Brooklyn Bridge", caption: "Brooklyn Bridge" },
  { src: "/images/travel/cam3.png", alt: "Times Square", caption: "Times Square" },
  { src: "/images/travel/cam4.png", alt: "Manhattan skyline", caption: "Manhattan skyline" },
  { src: "/images/travel/cam5.png", alt: "High Line", caption: "High Line" },
  { src: "/images/travel/cam6.png", alt: "Staten Island Ferry", caption: "Staten Island Ferry" },
];

interface ImageData {
  src: string;
  alt: string;
  caption: string;
  isCollection?: boolean;
  images?: CollectionImage[];
  imageCount?: number;
}

interface CollectionImage {
  path: string;
  caption: string;
}

interface UploadedItem {
  type: string;
  title?: string;
  coverImage?: string;
  images?: CollectionImage[];
  imageCount?: number;
  path?: string;
  caption?: string;
}

export default function NewYorkPage() {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [allImages, setAllImages] = useState<ImageData[]>(sampleImages);

  // Load uploaded images
  useEffect(() => {
    const loadUploadedImages = async () => {
      try {
        const response = await fetch('/uploads/usa/newyork/metadata.json');
        if (response.ok) {
          const uploadedMetadata = await response.json();
          const uploadedImages = uploadedMetadata.map((item: UploadedItem) => {
            if (item.type === 'collection') {
              // Handle collection
              return {
                src: item.coverImage,
                alt: item.title,
                caption: item.title,
                isCollection: true,
                images: item.images,
                imageCount: item.imageCount
              };
            } else {
              // Handle single image
              return {
                src: item.path,
                alt: item.caption,
                caption: item.caption,
                isCollection: false
              };
            }
          });
          setAllImages([...sampleImages, ...uploadedImages]);
        }
      } catch (err) {
        console.log('No uploaded images found, using sample images only', err);
      }
    };

    loadUploadedImages();
  }, []);

  // Check admin status
  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminStatus);
  }, []);

  const openModal = (image: ImageData) => {
    setSelectedImage(image);
    setCurrentSlideIndex(0); // Reset to first slide when opening modal
  };

  const closeModal = () => {
    setSelectedImage(null);
    setCurrentSlideIndex(0);
  };

  const nextSlide = () => {
    if (selectedImage?.images) {
      setCurrentSlideIndex((prev) => 
        prev >= selectedImage.images!.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevSlide = () => {
    if (selectedImage?.images) {
      setCurrentSlideIndex((prev) => 
        prev <= 0 ? selectedImage.images!.length - 1 : prev - 1
      );
    }
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
          {allImages.map((image, index) => (
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
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                position: 'relative'
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
              
              {/* Collection indicator */}
              {image.isCollection && (
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  padding: '5px 10px',
                  borderRadius: '15px',
                  fontSize: '12px',
                  fontFamily: "'Times New Roman', Times, serif"
                }}>
                  📁 {image.imageCount} photos
                </div>
              )}
              
              <div style={{ padding: '15px' }}>
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
      </main>

      {/* Modal for full-size image view */}
      {selectedImage && (
        <div 
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
            cursor: 'pointer',
            padding: '20px'
          }}
          onClick={closeModal}
        >
          <div style={{ 
            maxWidth: '90vw', 
            maxHeight: '90vh', 
            position: 'relative',
            cursor: 'default'
          }} onClick={(e) => e.stopPropagation()}>
            
            {selectedImage.isCollection ? (
              // Collection view - Free-form Horizontal Slider
              <div style={{
                width: '95vw',
                height: '90vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                {/* Main slide container */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {/* Current slide */}
                  {selectedImage.images && selectedImage.images[currentSlideIndex] && (
                    <img
                      src={selectedImage.images[currentSlideIndex].path}
                      alt={selectedImage.images[currentSlideIndex].caption}
                      style={{
                        maxWidth: '90%',
                        maxHeight: '85%',
                        objectFit: 'contain',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                      }}
                    />
                  )}

                  {/* Navigation arrows */}
                  {selectedImage.images && selectedImage.images.length > 1 && (
                    <>
                      <button
                        onClick={prevSlide}
                        style={{
                          position: 'absolute',
                          left: '30px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          backgroundColor: 'rgba(0,0,0,0.6)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '60px',
                          height: '60px',
                          cursor: 'pointer',
                          fontSize: '28px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.3s',
                          zIndex: 10,
                          boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.8)';
                          e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.6)';
                          e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                        }}
                      >
                        ←
                      </button>
                      
                      <button
                        onClick={nextSlide}
                        style={{
                          position: 'absolute',
                          right: '30px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          backgroundColor: 'rgba(0,0,0,0.6)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '60px',
                          height: '60px',
                          cursor: 'pointer',
                          fontSize: '28px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.3s',
                          zIndex: 10,
                          boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.8)';
                          e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.6)';
                          e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                        }}
                      >
                        →
                      </button>
                    </>
                  )}

                  {/* Slide counter */}
                  <div style={{
                    position: 'absolute',
                    top: '30px',
                    right: '30px',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    padding: '10px 15px',
                    borderRadius: '25px',
                    fontSize: '16px',
                    fontFamily: "'Times New Roman', Times, serif",
                    fontWeight: 'bold',
                    zIndex: 10,
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                  }}>
                    {currentSlideIndex + 1} / {selectedImage.images?.length || 0}
                  </div>

                  {/* Current image caption */}
                  <div style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '20px',
                    fontSize: '16px',
                    fontFamily: "'Times New Roman', Times, serif",
                    textAlign: 'center',
                    maxWidth: '80%',
                    zIndex: 10,
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                  }}>
                    {selectedImage.images && selectedImage.images[currentSlideIndex]?.caption}
                  </div>
                </div>
              </div>
            ) : (
              // Single image view
              <>
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
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

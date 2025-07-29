"use client";

import { useState, useEffect } from "react";
import Header from "../../../../components/Header";

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
  const [isAdmin, setIsAdmin] = useState(false);
  const [allImages, setAllImages] = useState<ImageData[]>([]);

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
          setAllImages([...uploadedImages]);
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

  const openModal = (image: ImageData, index: number) => {
    // If it's a collection, redirect to collection page instead of opening modal
    if (image.isCollection) {
      window.location.href = `/travels/usa/newyork/collection/${index}`;
      return;
    }
    
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleDeleteImage = async (imageIndex: number) => {
    if (!isAdmin) return;
    
    const confirmed = window.confirm('Are you sure you want to delete this image/collection?');
    if (!confirmed) return;

    try {
      // Call the delete API
      const response = await fetch(`/api/delete?city=newyork&country=usa&itemIndex=${imageIndex}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        // Remove from the allImages state immediately
        const updatedImages = allImages.filter((_, index) => index !== imageIndex);
        setAllImages(updatedImages);
        
        console.log('Image deleted successfully from server and metadata');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete image');
      }
      
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Failed to delete image. Please try again.');
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
              onClick={() => openModal(image, index)}
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
                // Show delete button on hover if admin
                const deleteBtn = e.currentTarget.querySelector('.admin-delete-btn') as HTMLElement;
                if (deleteBtn) deleteBtn.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                // Hide delete button when not hovering
                const deleteBtn = e.currentTarget.querySelector('.admin-delete-btn') as HTMLElement;
                if (deleteBtn) deleteBtn.style.opacity = '0';
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

              {/* Admin delete button - only show for uploaded images (not sample images) */}
              {isAdmin && (
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent opening modal
                    handleDeleteImage(index);
                  }}
                  className="admin-delete-btn"
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    backgroundColor: 'rgba(255, 0, 0, 0.8)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: '0',
                    transition: 'opacity 0.3s, background-color 0.3s',
                    zIndex: 10
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 0, 0, 1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 0, 0, 0.8)';
                  }}
                >
                  ×
                </button>
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

      {/* Modal for full-size image view - Only for single images */}
      {selectedImage && !selectedImage.isCollection && (
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
            
            {/* Single image view */}
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
    </div>
  );
}

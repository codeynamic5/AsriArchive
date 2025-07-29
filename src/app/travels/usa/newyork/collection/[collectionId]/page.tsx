"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "../../../../../../components/Header";

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

export default function CollectionPage() {
  const params = useParams();
  const router = useRouter();
  const collectionId = params.collectionId as string;
  const [collection, setCollection] = useState<UploadedItem | null>(null);
  const [selectedImage, setSelectedImage] = useState<CollectionImage | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Load collection data
  useEffect(() => {
    const loadCollection = async () => {
      try {
        const response = await fetch('/uploads/usa/newyork/metadata.json');
        if (response.ok) {
          const uploadedMetadata = await response.json();
          const collectionIndex = parseInt(collectionId);
          
          if (collectionIndex >= 0 && collectionIndex < uploadedMetadata.length) {
            const collectionData = uploadedMetadata[collectionIndex];
            if (collectionData.type === 'collection') {
              setCollection(collectionData);
            } else {
              // Redirect back if not a collection
              router.push('/travels/usa/newyork');
            }
          } else {
            // Collection not found, redirect back
            router.push('/travels/usa/newyork');
          }
        }
      } catch (err) {
        console.error('Error loading collection:', err);
        router.push('/travels/usa/newyork');
      }
    };

    loadCollection();
  }, [collectionId, router]);

  // Check admin status
  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminStatus);
  }, []);

  const openModal = (image: CollectionImage) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleDeleteCollection = async () => {
    if (!isAdmin) return;
    
    const confirmed = window.confirm('Are you sure you want to delete this entire collection?');
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/delete?city=newyork&country=usa&itemIndex=${collectionId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        alert('Collection deleted successfully');
        router.push('/travels/usa/newyork');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete collection');
      }
      
    } catch (error) {
      console.error('Error deleting collection:', error);
      alert('Failed to delete collection. Please try again.');
    }
  };

  if (!collection) {
    return (
      <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
        <Header currentPage="travels" />
        <main style={{ paddingTop: '120px', padding: '120px 1rem 2rem', textAlign: 'center' }}>
          <p>Loading collection...</p>
        </main>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <Header currentPage="travels" />
      
      <main style={{ paddingTop: '120px', padding: '120px 1rem 2rem' }}>
        {/* Back button and title */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <button
            onClick={() => router.push('/travels/usa/newyork')}
            style={{
              backgroundColor: '#5b7894',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '5px',
              cursor: 'pointer',
              fontFamily: "'Times New Roman', Times, serif",
              marginBottom: '1rem',
              fontSize: '14px'
            }}
          >
            ← Back to New York
          </button>
          
          <h1 
            style={{ 
              color: '#333',
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: '60px',
              marginBottom: '0.5rem'
            }}
          >
            {collection.title}
          </h1>
          
          <p style={{
            color: '#666',
            fontFamily: "'Times New Roman', Times, serif",
            fontSize: '18px',
            marginBottom: '1rem'
          }}>
            {collection.imageCount} photos
          </p>

          {isAdmin && (
            <button
              onClick={handleDeleteCollection}
              style={{
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '5px',
                cursor: 'pointer',
                fontFamily: "'Times New Roman', Times, serif",
                fontSize: '14px'
              }}
            >
              Delete Collection
            </button>
          )}
        </div>

        {/* Collection images in collage style (similar to cities page) */}
        <div 
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '30px',
            maxWidth: '95%',
            margin: '0 auto'
          }}
        >
          {collection.images?.map((image, index) => (
            <img
              key={index}
              src={image.path}
              alt={image.caption}
              onClick={() => openModal(image)}
              style={{
                flex: '0 1 auto',
                maxWidth: 'none',
                width: 'auto',
                height: 'auto',
                maxHeight: '80vh',
                margin: index % 3 === 0 ? '30px 20px 10px 25px' : 
                        index % 2 === 0 ? '15px 30px 20px 10px' : '20px',
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                borderRadius: '10px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.opacity = '0.9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.opacity = '1';
              }}
            />
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
            <img
              src={selectedImage.path}
              alt={selectedImage.caption}
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

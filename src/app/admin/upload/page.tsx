"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Header from "../../../components/Header";

function UploadContent() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [imageCaptions, setImageCaptions] = useState<string[]>([]);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const city = searchParams.get('city') || 'unknown';
  const country = searchParams.get('country') || 'unknown';

  useEffect(() => {
    const checkAdminStatus = () => {
      const adminStatus = localStorage.getItem('isAdmin') === 'true';
      const loginTime = localStorage.getItem('adminLoginTime');
      
      // Session expires after 24 hours
      if (loginTime && Date.now() - parseInt(loginTime) > 24 * 60 * 60 * 1000) {
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('adminLoginTime');
        router.push('/admin');
        return;
      }
      
      if (!adminStatus) {
        router.push('/admin');
        return;
      }
      
      setIsAdmin(true);
      setLoading(false);
    };

    checkAdminStatus();
  }, [router]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setSelectedFiles(files);
    
    if (files) {
      const previews: string[] = [];
      const captions: string[] = [];
      
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            previews.push(e.target.result as string);
            captions.push(`Photo in ${city}`); // Default caption
            
            // Update state when all files are processed
            if (previews.length === files.length) {
              setPreviewImages([...previews]);
              setImageCaptions([...captions]);
            }
          }
        };
        reader.readAsDataURL(file);
      });
    } else {
      setPreviewImages([]);
      setImageCaptions([]);
    }
  };

  const handleCaptionChange = (index: number, caption: string) => {
    const newCaptions = [...imageCaptions];
    newCaptions[index] = caption;
    setImageCaptions(newCaptions);
  };

  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      setUploadStatus("Please select files to upload");
      return;
    }

    setUploading(true);
    setUploadStatus("Uploading...");

    try {
      const formData = new FormData();
      
      // Add files to FormData
      Array.from(selectedFiles).forEach(file => {
        formData.append('files', file);
      });
      
      // Add captions for each file
      imageCaptions.forEach((caption, index) => {
        formData.append(`caption_${index}`, caption);
      });
      
      // Add metadata
      formData.append('city', city || 'unknown');
      formData.append('country', country || 'unknown');

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setUploadStatus(`Successfully uploaded ${selectedFiles.length} images to ${city}, ${country}`);
        setSelectedFiles(null);
        setPreviewImages([]);
        setImageCaptions([]);
        
        // Reset file input
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        setUploadStatus(`Upload failed: ${result.error}`);
      }
      
    } catch (err) {
      console.error('Upload error:', err);
      setUploadStatus("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // Router will redirect
  }

  return (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <Header />
      
      <main style={{ paddingTop: '120px', padding: '120px 2rem 2rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 
            style={{ 
              color: '#333',
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: '40px',
              textAlign: 'center',
              marginBottom: '1rem'
            }}
          >
            Upload Photos
          </h1>
          
          <p style={{ 
            textAlign: 'center', 
            color: '#666', 
            marginBottom: '2rem',
            fontSize: '18px',
            fontFamily: "'Times New Roman', Times, serif"
          }}>
            Uploading to: <strong>{city.charAt(0).toUpperCase() + city.slice(1)}, {country.toUpperCase()}</strong>
          </p>

          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '2rem',
            borderRadius: '15px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            marginBottom: '2rem'
          }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label 
                htmlFor="fileInput"
                style={{
                  display: 'block',
                  marginBottom: '1rem',
                  color: '#333',
                  fontFamily: "'Times New Roman', Times, serif",
                  fontSize: '16px'
                }}
              >
                Select Images:
              </label>
              
              <input
                id="fileInput"
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                style={{
                  width: '100%',
                  padding: '1rem',
                  border: '2px dashed #333',
                  borderRadius: '5px',
                  fontFamily: "'Times New Roman', Times, serif",
                  backgroundColor: 'rgba(255, 255, 255, 0.5)'
                }}
              />
            </div>

            {previewImages.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ 
                  color: '#333',
                  fontFamily: "'Times New Roman', Times, serif",
                  marginBottom: '1rem'
                }}>
                  Preview & Add Titles ({previewImages.length} images):
                </h3>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                  gap: '1rem',
                  maxHeight: '400px',
                  overflowY: 'auto'
                }}>
                  {previewImages.map((src, index) => (
                    <div key={index} style={{
                      position: 'relative',
                      borderRadius: '5px',
                      overflow: 'hidden',
                      backgroundColor: 'white',
                      padding: '10px',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                    }}>
                      <Image
                        src={src}
                        alt={`Preview ${index + 1}`}
                        width={150}
                        height={150}
                        style={{
                          width: '100%',
                          height: '150px',
                          objectFit: 'cover',
                          borderRadius: '5px',
                          marginBottom: '10px'
                        }}
                      />
                      <input
                        type="text"
                        value={imageCaptions[index] || ''}
                        onChange={(e) => handleCaptionChange(index, e.target.value)}
                        placeholder="Enter photo title..."
                        style={{
                          width: '100%',
                          padding: '8px',
                          border: '1px solid #ddd',
                          borderRadius: '3px',
                          fontSize: '12px',
                          fontFamily: "'Times New Roman', Times, serif"
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={!selectedFiles || uploading}
              style={{
                width: '100%',
                backgroundColor: uploading ? '#999' : '#333',
                color: 'white',
                border: 'none',
                padding: '1rem',
                borderRadius: '5px',
                cursor: uploading ? 'not-allowed' : 'pointer',
                fontFamily: "'Times New Roman', Times, serif",
                fontSize: '16px'
              }}
            >
              {uploading ? 'Uploading...' : `Upload ${selectedFiles?.length || 0} Images`}
            </button>

            {uploadStatus && (
              <p style={{
                marginTop: '1rem',
                textAlign: 'center',
                color: uploadStatus.includes('Successfully') ? 'green' : uploadStatus.includes('failed') ? 'red' : '#666',
                fontFamily: "'Times New Roman', Times, serif"
              }}>
                {uploadStatus}
              </p>
            )}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => router.push('/admin/dashboard')}
              style={{
                backgroundColor: '#666',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '5px',
                cursor: 'pointer',
                fontFamily: "'Times New Roman', Times, serif",
                marginRight: '1rem'
              }}
            >
              Back to Dashboard
            </button>
            
            <button
              onClick={() => router.push(`/travels/${country}/${city}`)}
              style={{
                backgroundColor: '#333',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '5px',
                cursor: 'pointer',
                fontFamily: "'Times New Roman', Times, serif"
              }}
            >
              View Gallery
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function AdminUploadPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UploadContent />
    </Suspense>
  );
}

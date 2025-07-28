"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "../../components/Header";

export default function ExposuresPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Sample images - you would populate this from your actual image data
  const exposureImages = [
    "/images/travel/cam1.png",
    "/images/travel/cam2.png", 
    "/images/travel/cam3.png",
    "/images/travel/cam4.png",
    "/images/travel/cam5.png",
    "/images/travel/cam6.png",
    "/images/travel/cam7.png",
    "/images/travel/cam8.png",
    "/images/travel/cam9.png",
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % exposureImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + exposureImages.length) % exposureImages.length);
  };

  // Auto-advance slides (optional)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % exposureImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [exposureImages.length]);

  return (
    <div className="exposures-page">
      <Header currentPage="exposures" />
      
      <h1>Exposures</h1>
      
      <div className="slider-container">
        <div 
          className="slide-wrapper"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {exposureImages.map((image, index) => (
            <div key={index} className="slide">
              <Image 
                src={image} 
                alt={`Exposure ${index + 1}`}
                width={800}
                height={600}
                style={{
                  maxWidth: '90%',
                  maxHeight: '70vh',
                  objectFit: 'contain',
                  borderRadius: '10px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="slider-controls">
        <button className="slider-btn" onClick={prevSlide}>
          Previous
        </button>
        <span className="slider-info">
          {currentSlide + 1} / {exposureImages.length}
        </span>
        <button className="slider-btn" onClick={nextSlide}>
          Next
        </button>
      </div>
    </div>
  );
}

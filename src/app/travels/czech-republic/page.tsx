"use client";

import Header from "../../../components/Header";

export default function CzechRepublicPage() {
  return (
    <div className="travel-page">
      <Header currentPage="travels" />
      
      <div style={{ paddingTop: '120px', padding: '120px 2rem 2rem' }}>
        <h1 style={{ 
          color: '#333',
          fontFamily: "'Times New Roman', Times, serif",
          fontSize: '60px',
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          Czech Republic
        </h1>
        
        <div style={{ textAlign: 'center' }}>
          <p>Prague and other Czech destinations coming soon...</p>
        </div>
      </div>
    </div>
  );
}

"use client";

import Header from "../../../components/Header";

export default function AustriaPage() {
  return (
    <div className="travel-page">
      <Header currentPage="travels" />
      
      <div style={{ paddingTop: '120px', textAlign: 'center' }}>
        <h1 style={{ 
          color: '#333',
          fontFamily: "'Times New Roman', Times, serif",
          fontSize: '60px'
        }}>
          Austria
        </h1>
        <p>Austria travel collection coming soon...</p>
      </div>
    </div>
  );
}

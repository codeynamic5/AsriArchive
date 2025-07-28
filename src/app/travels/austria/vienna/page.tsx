"use client";

import Header from "../../../../components/Header";

export default function ViennaPage() {
  return (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <Header currentPage="travels" />
      
      <main style={{ paddingTop: '120px', padding: '120px 2rem 2rem' }}>
        <h1 
          style={{ 
            color: '#333',
            fontFamily: "'Times New Roman', Times, serif",
            fontSize: '60px',
            textAlign: 'center',
            marginBottom: '2rem'
          }}
        >
          Vienna
        </h1>
        
        <div style={{ textAlign: 'center' }}>
          <p>Vienna collection coming soon...</p>
        </div>
      </main>
    </div>
  );
}

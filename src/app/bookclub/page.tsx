"use client";

import Image from "next/image";
import Header from "../../components/Header";

export default function BookClubPage() {
  // Sample book data - you would populate this from your data source
  const currentBook = {
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    cover: "/images/travel/cam1.png", // Using a travel image as placeholder
    description: "A reclusive Hollywood icon finally tells her story to a young journalist, revealing the truth about her glamorous and scandalous life.",
    status: "Currently Reading"
  };

  return (
    <div className="bookclub-page">
      <Header currentPage="bookclub" />
      
      <h1>Book Club</h1>
      
      <div className="bookclub-content">
        <div className="book-display">
          <Image 
            src={currentBook.cover} 
            alt={currentBook.title}
            width={200}
            height={300}
            className="book-cover"
            style={{ borderRadius: '5px', marginBottom: '1rem' }}
          />
          <div className="book-info">
            <h2>{currentBook.title}</h2>
            <p><strong>Author:</strong> {currentBook.author}</p>
            <p><strong>Status:</strong> {currentBook.status}</p>
            <p>{currentBook.description}</p>
          </div>
        </div>
        
        <div className="book-discussion">
          <h3>Discussion</h3>
          <p>Share your thoughts about the current book...</p>
          {/* You could add a comment system or discussion forum here */}
        </div>
      </div>
    </div>
  );
}

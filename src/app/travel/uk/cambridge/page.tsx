"use client";

import { useState } from "react";
import Image from "next/image";
import Nav from "@/components/Nav";

const images = [
  { src: "/images/travel/maincam.png", alt: "Cambridge main" },
  { src: "/images/travel/cam1.png", alt: "Cambridge 1" },
  { src: "/images/travel/cam2.png", alt: "Cambridge 2" },
  { src: "/images/travel/cam3.png", alt: "Cambridge 3" },
  { src: "/images/travel/cam4.png", alt: "Cambridge 4" },
  { src: "/images/travel/cam5.png", alt: "Cambridge 5" },
  { src: "/images/travel/cam6.png", alt: "Cambridge 6" },
  { src: "/images/travel/cam7.png", alt: "Cambridge 7" },
  { src: "/images/travel/cam8.png", alt: "Cambridge 8" },
  { src: "/images/travel/cam9.png", alt: "Cambridge 9" },
  { src: "/images/travel/bridge1.png", alt: "Bridge 1" },
  { src: "/images/travel/bridge2.png", alt: "Bridge 2" },
];

export default function CambridgePage() {
  const [modal, setModal] = useState<string | null>(null);

  return (
    <div style={{ margin: 0, padding: 0 }}>
      <Nav />

      <div style={{ position: "sticky", top: "60px", padding: "40px 0 20px 40px", textAlign: "left", zIndex: 10 }}>
        <h1 style={{ fontSize: "4rem", color: "#000", margin: 0, fontWeight: "bold" }}>CAMBRIDGE</h1>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "30px",
          maxWidth: "95%",
          margin: "0 auto",
          paddingBottom: "40px",
        }}
      >
        {images.map((img, i) => (
          <div
            key={i}
            style={{ position: "relative", cursor: "pointer", display: "inline-block" }}
            onClick={() => setModal(img.src)}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={600}
              height={400}
              style={{ maxHeight: "80vh", width: "auto", height: "auto", transition: "transform 0.3s ease, opacity 0.3s ease" }}
              onMouseOver={(e) => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.opacity = "0.9"; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.opacity = "1"; }}
            />
          </div>
        ))}
      </div>

      {modal && (
        <div
          onClick={() => setModal(null)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.9)",
            zIndex: 1000,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image src={modal} alt="Full size" width={1200} height={800} style={{ maxWidth: "90%", maxHeight: "90vh", objectFit: "contain" }} />
        </div>
      )}
    </div>
  );
}

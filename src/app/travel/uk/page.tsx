"use client";

import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";

const cities = [
  { label: "LONDON", href: "/travel/uk/london", img: "/images/travel/tate.png", alt: "London - Tate Modern" },
  { label: "CAMBRIDGE", href: "/travel/uk/cambridge", img: "/images/travel/maincam.png", alt: "Cambridge University" },
  { label: "MANCHESTER", href: "/travel/uk/manchester", img: "/images/travel/mainman.png", alt: "Manchester City Center" },
];

export default function UKPage() {
  return (
    <div style={{ margin: 0, padding: 0, backgroundColor: "#f0f0f0", minHeight: "100vh" }}>
      <Nav />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "40px",
          justifyContent: "center",
          padding: "40px 20px",
          marginTop: "100px",
        }}
      >
        {cities.map((city) => (
          <Link
            key={city.href}
            href={city.href}
            style={{
              position: "relative",
              width: "350px",
              height: "250px",
              borderRadius: "15px",
              overflow: "hidden",
              boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
              transition: "all 0.3s ease",
              textDecoration: "none",
              color: "inherit",
              display: "block",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-10px) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.25)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
            }}
          >
            <Image
              src={city.img}
              alt={city.alt}
              fill
              style={{ objectFit: "cover", transition: "transform 0.3s ease" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.6))",
                color: "white",
                fontSize: "2rem",
                fontWeight: "bold",
                letterSpacing: "2px",
                textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
              }}
            >
              {city.label}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

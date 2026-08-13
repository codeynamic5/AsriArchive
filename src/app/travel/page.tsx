"use client";

import Link from "next/link";
import Nav from "@/components/Nav";

const countries = [
  "Budapest", "Bosnia", "Croatia", "Egypt", "Germany", "Greece",
  "Indonesia", "Italy", "Netherlands", "Prague", "Scotland", "Serbia",
  "Korea", "Spain", "Turkey", "UK", "USA", "Austria",
];

const navLinks = [
  { label: "Lobby", href: "/lobby" },
  { label: "Ayu's BookClub", href: "/bookclub" },
  { label: "Exposures", href: "/exposures" },
];

export default function TravelPage() {
  return (
    <div style={{ fontFamily: "'Times New Roman', Times, serif", margin: 0, padding: "20px", backgroundColor: "#f0f0f0" }}>
      <Nav links={navLinks} />

      <h1
        style={{
          textAlign: "center",
          color: "#333",
          marginTop: "80px",
          fontSize: "100px",
          fontFamily: "'Times New Roman', Times, serif",
        }}
      >
        Travel
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "50px",
          padding: "40px",
          maxWidth: "1400px",
          margin: "20px auto",
          textAlign: "center",
        }}
      >
        {countries.map((country) => (
          <Link
            key={country}
            href={`/travel/${country.toLowerCase()}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <h2
              style={{
                fontSize: "3em",
                color: "#333",
                transition: "transform 0.3s, color 0.3s",
                cursor: "pointer",
                padding: "20px 0",
                margin: "10px 0",
                display: "block",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = "#666";
                e.currentTarget.style.transform = "translateY(-5px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = "#333";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {country}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

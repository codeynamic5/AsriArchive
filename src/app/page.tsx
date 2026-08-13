"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        backgroundColor: "#c4d0d8",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", color: "white", marginBottom: "2rem" }}>
          Asri&apos;s Archive
        </h1>
        <Link
          href="/lobby"
          style={{
            display: "inline-block",
            padding: "0.5rem 2rem",
            marginTop: "50px",
            fontSize: "0.9rem",
            fontWeight: "bold",
            color: "black",
            border: "2px solid black",
            borderRadius: "999px",
            backgroundColor: "transparent",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#5b7894";
            e.currentTarget.style.color = "white";
            e.currentTarget.style.borderColor = "#5b7894";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "black";
            e.currentTarget.style.borderColor = "black";
          }}
        >
          Enter
        </Link>
      </div>
    </div>
  );
}

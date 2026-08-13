import Link from "next/link";

const sections = [
  { label: "Travels", href: "/travel" },
  { label: "Ayu's Bookclub", href: "/bookclub" },
  { label: "Exposures", href: "/exposures" },
  { label: "...", href: "#" },
];

export default function Lobby() {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#dbe9f3",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "40px",
          width: "100%",
          maxWidth: "1000px",
        }}
      >
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            style={{
              backgroundColor: "#d3c3c3",
              padding: "40px 20px",
              borderRadius: "20px",
              textAlign: "center",
              transition: "transform 0.3s ease",
              cursor: "pointer",
              minHeight: "280px",
              border: "2px solid #b98989",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              textDecoration: "none",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h2 style={{ fontSize: "1.8rem", fontWeight: "bold", color: "white", marginBottom: "30px" }}>
              {s.label}
            </h2>
            <div
              style={{
                width: "200px",
                height: "150px",
                backgroundColor: "#dcdcdc",
                borderRadius: "4px",
              }}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

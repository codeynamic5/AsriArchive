import Nav from "@/components/Nav";
import Link from "next/link";

export default async function CountryPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  const name = country.charAt(0).toUpperCase() + country.slice(1);

  return (
    <div style={{ fontFamily: "'Times New Roman', Times, serif", backgroundColor: "#f0f0f0", minHeight: "100vh" }}>
      <Nav />
      <h1
        style={{
          textAlign: "center",
          color: "#333",
          marginTop: "120px",
          fontSize: "80px",
        }}
      >
        {name}
      </h1>
      <p style={{ textAlign: "center", color: "#666", marginTop: "40px", fontSize: "1.2rem" }}>
        Coming soon.
      </p>
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <Link href="/travel" style={{ color: "#5b7894", fontWeight: "bold" }}>
          ← Back to Travel
        </Link>
      </div>
    </div>
  );
}

import Navbar from "@/components/shared/Navbar";

export default function ModulesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {/* pt-14 clears the fixed 56px navbar */}
      <main id="main-content" className="pt-14">
        {children}
      </main>
    </>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen w-full bg-lobby flex flex-col items-center justify-center text-center px-6">
      <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-ink/40 mb-6">
        404
      </p>
      <h1 className="font-display font-black text-ink leading-tight tracking-tight"
          style={{ fontSize: "clamp(32px, 6vw, 72px)" }}>
        Page not found.
      </h1>
      <p className="font-body text-muted text-sm mt-4 mb-10 max-w-xs leading-relaxed">
        This page doesn&apos;t exist — or it might have moved.
      </p>
      <Link
        href="/menu"
        className="
          px-10 py-4 font-body text-sm text-ink
          border border-ink/30 rounded-full
          hover:bg-ink/5 hover:border-ink/50
          transition-all duration-300
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-ink/60 focus-visible:ring-offset-4
          focus-visible:ring-offset-lobby
        "
      >
        Back to menu
      </Link>
    </div>
  );
}

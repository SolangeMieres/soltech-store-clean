export default function Footer() {
  return (
    <footer className="mt-20 border-t border-neutral-800">
      <div className="container py-8 text-center text-neutral-400 text-sm">
        <p>© {new Date().getFullYear()} SOLtech — Innovación que impulsa tus ideas.</p>
        <p className="mt-2">Todo nuevo y con garantía. Argentina.</p>
      </div>
    </footer>
  );
}

import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useBranding } from "../../context/BrandingContext";

export default function MainLayout() {
  const { branding } = useBranding();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 overflow-hidden bg-[var(--color-background,#fff)] text-[var(--color-text,#111827)]">
        {/* Aquí se cargan las páginas internas */}
        <Outlet />
      </main>
    </div>
  );
}

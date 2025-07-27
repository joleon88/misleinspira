// src/components/Footer.tsx
import React from "react";
// Importa los iconos de Lucide React
import { Facebook, Instagram, Youtube, Share2 } from "lucide-react";

function Footer() {
  return (
    <footer className="[background-color:var(--color-gris-carbon)] [color:var(--color-blanco)] py-10 text-center text-sm md:text-base">
      <div className="container mx-auto flex flex-col items-center space-y-6 px-4">
        <p>© 2025 MisleInspira. Todos los derechos reservados.</p>
        <div className="social-icons flex space-x-6 md:space-x-8">
          {/* Icono de Facebook de Lucide React */}
          <a
            href="https://facebook.com/tumarca"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="[color:var(--color-blanco)] text-2xl md:text-3xl hover:[color:var(--color-rosa-pastel)] transform hover:-translate-y-1 transition-all duration-300"
          >
            <Facebook className="h-8 w-8" />
          </a>
          {/* Icono de Instagram de Lucide React */}
          <a
            href="https://instagram.com/tumarca"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="[color:var(--color-blanco)] text-2xl md:text-3xl hover:[color:var(--color-rosa-pastel)] transform hover:-translate-y-1 transition-all duration-300"
          >
            <Instagram className="h-8 w-8" />
          </a>
          {/* Icono de YouTube de Lucide React */}
          <a
            href="https://youtube.com/tumarca"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="[color:var(--color-blanco)] text-2xl md:text-3xl hover:[color:var(--color-rosa-pastel)] transform hover:-translate-y-1 transition-all duration-300"
          >
            <Youtube className="h-8 w-8" />
          </a>
          {/* Icono de TikTok (usando Share2 como alternativa elegante de Lucide React) */}
          <a
            href="https://tiktok.com/@tumarca"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="[color:var(--color-blanco)] text-2xl md:text-3xl hover:[color:var(--color-rosa-pastel)] transform hover:-translate-y-1 transition-all duration-300"
          >
            <Share2 className="h-8 w-8" />{" "}
            {/* O considera un icono personalizado si el de TikTok es crucial */}
          </a>
        </div>
        <p className="mt-5 text-base">
          Concebido con ❤️ y propósito en Estados Unidos.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

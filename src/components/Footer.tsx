// src/components/Footer.tsx

import { Link } from "react-router-dom";
import miIconoLeaf from "../assets/RamitaDobleIco-removebg.ico";
import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Mail,
  Phone,
} from "lucide-react"; // Importa iconos de Lucide React, usando Twitter como ejemplo para TikTok si no hay un icono específico

function Footer() {
  return (
    <footer className="[background-color:var(--color-gris-carbon)] [color:var(--color-blanco)] py-12 text-sm md:text-base">
      <div className="container mx-auto px-4 flex flex-col items-center space-y-10 md:space-y-0 md:flex-row md:justify-between md:items-start">
        {/* Sección 1: Información de la Marca */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left md:w-1/4">
          <div className="logo flex items-center [color:var(--color-beige-lino)] [font-family:var(--font-poppins)] font-bold text-2xl md:text-3xl">
            MisleInsp
            <img
              src={miIconoLeaf}
              alt="Icono Personal"
              className="h-10 w-9 relative top-[-9px] mx-[-7px] [fill:var(--color-verde-menta-suave)]"
            />
            ra
          </div>
          <p className="text-sm md:text-base max-w-xs">
            Impulsando tu visión con{" "}
            <span className="[color:var(--color-verde-menta-suave)]">
              estrategia{" "}
            </span>{" "}
            y <span className="[color:var(--color-rosa-pastel)]">corazón</span>.
          </p>
        </div>

        {/* Sección 2: Enlaces de Navegación */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left md:w-1/4">
          <h4 className="text-xl font-semibold mb-4 [color:var(--color-beige-lino)!important] [font-family:var(--font-poppins)]">
            Navegación
          </h4>
          <ul className="space-y-2">
            <li>
              <Link
                to="/inicio"
                className="hover:[color:var(--color-rosa-pastel)] transition-colors duration-300"
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                to="/mi-historia"
                className="hover:[color:var(--color-rosa-pastel)] transition-colors duration-300"
              >
                Mi historia
              </Link>
            </li>
            <li>
              <Link
                to="/reflexiones"
                className="hover:[color:var(--color-rosa-pastel)] transition-colors duration-300"
              >
                Reflexiones
              </Link>
            </li>
            <li>
              <Link
                to="/testimonios"
                className="hover:[color:var(--color-rosa-pastel)] transition-colors duration-300"
              >
                Testimonios
              </Link>
            </li>
            <li>
              <Link
                to="/productos"
                className="hover:[color:var(--color-rosa-pastel)] transition-colors duration-300"
              >
                Productos
              </Link>
            </li>
            <li>
              <Link
                to="/contacto"
                className="hover:[color:var(--color-rosa-pastel)] transition-colors duration-300"
              >
                Contacto
              </Link>
            </li>
          </ul>
        </div>

        {/* Sección 3: Contacto / Dirección */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left md:w-1/4">
          <h4 className="text-xl font-semibold mb-4 [color:var(--color-beige-lino)!important] [font-family:var(--font-poppins)]">
            Contacto
          </h4>
          <ul className="space-y-2">
            <li className="flex items-center justify-center md:justify-start">
              <Mail className="h-5 w-5 mr-2 [color:var(--color-blanco)] opacity-80" />
              <span>info@misleinspira.com</span>
            </li>
            <li className="flex items-center justify-center md:justify-start">
              <Phone className="h-5 w-5 mr-2 [color:var(--color-blanco)] opacity-80" />
              <span>+1 (123) 456-7890</span>
            </li>
            <li className="flex items-center justify-center md:justify-start">
              <span>Estados Unidos</span>
            </li>
          </ul>
        </div>

        {/* Sección 4: Redes Sociales */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left md:w-1/4">
          <h4 className="text-xl font-semibold mb-4 [color:var(--color-beige-lino)!important] [font-family:var(--font-poppins)]">
            Síguenos
          </h4>
          <div className="social-icons flex space-x-4">
            {/* Icono de Facebook */}
            <a
              href="https://facebook.com/tumarca"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="group relative flex items-center justify-center h-10 w-10 rounded-full border-2 [border-color:var(--color-verde-menta-suave)] hover:[border-color:var(--color-hover-rosa)] transition-all duration-300"
            >
              <Facebook className="h-6 w-6 [color:var(--color-rosa-pastel)] group-hover:[color:var(--color-hover-rosa)] transition-colors duration-300" />
            </a>
            {/* Icono de Instagram */}
            <a
              href="https://instagram.com/tumarca"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="group relative flex items-center justify-center h-10 w-10 rounded-full border-2 [border-color:var(--color-verde-menta-suave)] hover:[border-color:var(--color-hover-rosa)] transition-all duration-300"
            >
              <Instagram className="h-6 w-6 [color:var(--color-rosa-pastel)] group-hover:[color:var(--color-hover-rosa)] transition-colors duration-300" />
            </a>
            {/* Icono de YouTube */}
            <a
              href="https://youtube.com/tumarca"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="group relative flex items-center justify-center h-10 w-10 rounded-full border-2 [border-color:var(--color-verde-menta-suave)] hover:[border-color:var(--color-hover-rosa)] transition-all duration-300"
            >
              <Youtube className="h-6 w-6 [color:var(--color-rosa-pastel)] group-hover:[color:var(--color-hover-rosa)] transition-colors duration-300" />
            </a>
            {/* Icono de TikTok (usando Twitter como alternativa, Lucide no tiene TikTok directo) */}
            <a
              href="https://tiktok.com/@tumarca"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="group relative flex items-center justify-center h-10 w-10 rounded-full border-2 [border-color:var(--color-verde-menta-suave)] hover:[border-color:var(--color-hover-rosa)] transition-all duration-300"
            >
              <Twitter className="h-6 w-6 [color:var(--color-rosa-pastel)] group-hover:[color:var(--color-hover-rosa)] transition-colors duration-300" />{" "}
              {/* Puedes reemplazarlo con Share2 o un SVG personalizado si es crucial */}
            </a>
          </div>
        </div>
      </div>

      {/* Sección Inferior: Copyright y Mensaje Profesional */}
      <div className="mt-10 pt-6 border-t border-gray-700 text-center">
        <p className="text-sm [color:var(--color-blanco)] opacity-80">
          &copy; 2025 @MisleInspira. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

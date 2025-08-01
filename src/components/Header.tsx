// src/components/Header.tsx
import { useState } from "react";
import { Link } from "react-router-dom"; // Importa Link de react-router-dom
import miIconoLeaf from "../assets/RamitaDobleIco-removebg.ico";
import { Menu, X } from "lucide-react"; // Iconos de hoja, menú y cerrar de Lucide React

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Función para cerrar el menú móvil al hacer clic en un enlace
  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-[var(--color-beige-lino)] via-[var(--color-blanco)] to-[var(--color-verde-menta-suave)] py-4 shadow-[0_2px_16px_0_rgba(183,217,201,0.18)] sticky top-0 z-50 transition-shadow duration-300">
      <div className="container mx-auto flex justify-between items-center flex-wrap px-4">
        {/* Logo MisleInspira con icono de hoja */}
        <Link
          to="/inicio"
          onClick={handleNavLinkClick}
          className="logo flex items-center [color:var(--color-gris-carbon)] [font-family:var(--font-poppins)] font-bold text-2xl md:text-3xl transition-transform duration-200 hover:scale-105 group"
        >
          MisleInsp
          <img
            src={miIconoLeaf}
            alt="Icono Personal"
            className="h-10 w-9 relative top-[-9px] mx-[-7px] [fill:var(--color-verde-menta-suave)] transition-transform duration-300 group-hover:rotate-[-12deg] group-hover:scale-110"
          />
          ra
        </Link>

        {/* Botón de hamburguesa para móviles */}
        <button
          className="md:hidden [color:var(--color-gris-carbon)] text-3xl p-2 rounded-full bg-white/60 shadow hover:bg-[var(--color-verde-menta-suave)] hover:[color:var(--color-blanco)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-rosa-pastel)]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Abrir menú de navegación"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Menú de navegación para desktop */}
        <nav className="hidden md:block">
          <ul className="nav-links flex space-x-6 lg:space-x-10">
            <li>
              <Link
                to="/inicio"
                className="relative [font-family:var(--font-poppins)] font-semibold text-lg hover:[color:var(--color-rosa-pastel)] transition-colors duration-300 whitespace-nowrap after:content-[''] after:block after:h-[2px] after:bg-[var(--color-rosa-pastel)] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                to="/mi-historia"
                className="relative [font-family:var(--font-poppins)] font-semibold text-lg hover:[color:var(--color-rosa-pastel)] transition-colors duration-300 whitespace-nowrap after:content-[''] after:block after:h-[2px] after:bg-[var(--color-rosa-pastel)] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
              >
                Mi historia
              </Link>
            </li>
            <li>
              <Link
                to="/reflexiones"
                className="relative [font-family:var(--font-poppins)] font-semibold text-lg hover:[color:var(--color-rosa-pastel)] transition-colors duration-300 whitespace-nowrap after:content-[''] after:block after:h-[2px] after:bg-[var(--color-rosa-pastel)] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
              >
                Reflexiones
              </Link>
            </li>
            <li>
              <Link
                to="/testimonios"
                className="relative [font-family:var(--font-poppins)] font-semibold text-lg hover:[color:var(--color-rosa-pastel] transition-colors duration-300 whitespace-nowrap after:content-[''] after:block after:h-[2px] after:bg-[var(--color-rosa-pastel)] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
              >
                Testimonios
              </Link>
            </li>
            <li>
              <Link
                to="/productos"
                className="relative [font-family:var(--font-poppins)] font-semibold text-lg hover:[color:var(--color-rosa-pastel)] transition-colors duration-300 whitespace-nowrap after:content-[''] after:block after:h-[2px] after:bg-[var(--color-rosa-pastel)] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
              >
                Productos
              </Link>
            </li>
            <li>
              <Link
                to="/contacto"
                className="relative [font-family:var(--font-poppins)] font-semibold text-lg hover:[color:var(--color-rosa-pastel)] transition-colors duration-300 whitespace-nowrap after:content-[''] after:block after:h-[2px] after:bg-[var(--color-rosa-pastel)] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
              >
                Contacto
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Menú de navegación móvil (overlay y sidebar) */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay para cerrar el menú al hacer clic fuera */}
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>

          {/* Sidebar del menú móvil */}
          <div
            className={`fixed top-0 left-0 h-full w-4/5 max-w-xs bg-white/80 backdrop-blur-lg border-r-2 border-[var(--color-verde-menta-suave)] rounded-tr-3xl rounded-br-3xl shadow-lg flex flex-col items-center justify-center z-50 transform transition-transform duration-300 md:hidden
              ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            <button
              className="absolute top-6 right-6 [color:var(--color-verde-menta-suave)] text-4xl p-2 rounded-full bg-white/70 hover:bg-[var(--color-rosa-pastel)] hover:[color:var(--color-blanco)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-rosa-pastel)]"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Cerrar menú de navegación"
            >
              <X />
            </button>
            <nav className="w-full">
              <ul className="flex flex-col items-center space-y-7 text-2xl">
                <li>
                  <Link
                    to="/inicio"
                    onClick={handleNavLinkClick}
                    className="[color:var(--color-gris-carbon)] [font-family:var(--font-poppins)] font-semibold hover:[color:var(--color-rosa-pastel)] transition-colors duration-300 py-2 px-6 rounded-xl text-center w-full"
                  >
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    to="/mi-historia"
                    onClick={handleNavLinkClick}
                    className="[color:var(--color-gris-carbon)] [font-family:var(--font-poppins)] font-semibold hover:[color:var(--color-rosa-pastel)] transition-colors duration-300 py-2 px-6 rounded-xl text-center w-full"
                  >
                    Mi historia
                  </Link>
                </li>
                <li>
                  <Link
                    to="/reflexiones"
                    onClick={handleNavLinkClick}
                    className="[color:var(--color-gris-carbon)] [font-family:var(--font-poppins)] font-semibold hover:[color:var(--color-rosa-pastel)] transition-colors duration-300 py-2 px-6 rounded-xl text-center w-full"
                  >
                    Reflexiones
                  </Link>
                </li>
                <li>
                  <Link
                    to="/testimonios"
                    onClick={handleNavLinkClick}
                    className="[color:var(--color-gris-carbon)] [font-family:var(--font-poppins)] font-semibold hover:[color:var(--color-rosa-pastel)] transition-colors duration-300 py-2 px-6 rounded-xl text-center w-full"
                  >
                    Testimonios
                  </Link>
                </li>
                <li>
                  <Link
                    to="/productos"
                    onClick={handleNavLinkClick}
                    className="[color:var(--color-gris-carbon)] [font-family:var(--font-poppins)] font-semibold hover:[color:var(--color-rosa-pastel)] transition-colors duration-300 py-2 px-6 rounded-xl text-center w-full"
                  >
                    Productos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contacto"
                    onClick={handleNavLinkClick}
                    className="[color:var(--color-gris-carbon)] [font-family:var(--font-poppins)] font-semibold hover:[color:var(--color-rosa-pastel)] transition-colors duration-300 py-2 px-6 rounded-xl text-center w-full"
                  >
                    Contacto
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}

export default Header;

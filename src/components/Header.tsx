// src/components/Header.tsx
import { useState } from "react";
import { Link } from "react-router-dom"; // Importa Link de react-router-dom
import miIconoLeaf from "../assets/RamitaDobleIco-removebg.ico";
import {
  Menu,
  X,
  Home,
  User,
  BookOpen,
  MessageCircle,
  ShoppingBag,
  Mail,
} from "lucide-react"; // Iconos de hoja, menú y cerrar de Lucide React

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Función para cerrar el menú móvil al hacer clic en un enlace
  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="[background-color:var(--color-beige-lino)] py-4 shadow-[0_2px_16px_0_rgba(183,217,201,0.18)] sticky top-0 z-50 transition-shadow duration-300">
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
                className="relative [font-family:var(--font-poppins)] font-semibold text-lg transition-colors duration-300 whitespace-nowrap after:content-[''] after:block after:h-[2px] after:bg-[var(--color-verde-menta-suave)] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left
                  before:content-[''] before:absolute before:inset-[-6px_-14px] before:rounded-full before:bg-transparent before:border before:border-[2.5px] before:border-[var(--color-rosa-pastel)] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
                style={{ zIndex: 1, display: "inline-block" }}
              >
                <span className="relative z-10 px-2">Inicio</span>
              </Link>
            </li>
            <li>
              <Link
                to="/mi-historia"
                className="relative [font-family:var(--font-poppins)] font-semibold text-lg transition-colors duration-300 whitespace-nowrap after:content-[''] after:block after:h-[2px] after:bg-[var(--color-verde-menta-suave)] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left
                  before:content-[''] before:absolute before:inset-[-6px_-14px] before:rounded-full before:bg-transparent before:border before:border-[2.5px] before:border-[var(--color-rosa-pastel)] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
                style={{ zIndex: 1, display: "inline-block" }}
              >
                <span className="relative z-10 px-2">Mi historia</span>
              </Link>
            </li>
            <li>
              <Link
                to="/reflexiones"
                className="relative [font-family:var(--font-poppins)] font-semibold text-lg transition-colors duration-300 whitespace-nowrap after:content-[''] after:block after:h-[2px] after:bg-[var(--color-verde-menta-suave)] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left
                  before:content-[''] before:absolute before:inset-[-6px_-14px] before:rounded-full before:bg-transparent before:border before:border-[2.5px] before:border-[var(--color-rosa-pastel)] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
                style={{ zIndex: 1, display: "inline-block" }}
              >
                <span className="relative z-10 px-2">Reflexiones</span>
              </Link>
            </li>
            <li>
              <Link
                to="/testimonios"
                className="relative [font-family:var(--font-poppins)] font-semibold text-lg transition-colors duration-300 whitespace-nowrap after:content-[''] after:block after:h-[2px] after:bg-[var(--color-verde-menta-suave)] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left
                  before:content-[''] before:absolute before:inset-[-6px_-14px] before:rounded-full before:bg-transparent before:border before:border-[2.5px] before:border-[var(--color-rosa-pastel)] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
                style={{ zIndex: 1, display: "inline-block" }}
              >
                <span className="relative z-10 px-2">Testimonios</span>
              </Link>
            </li>
            <li>
              <Link
                to="/productos"
                className="relative [font-family:var(--font-poppins)] font-semibold text-lg transition-colors duration-300 whitespace-nowrap after:content-[''] after:block after:h-[2px] after:bg-[var(--color-verde-menta-suave)] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left
                  before:content-[''] before:absolute before:inset-[-6px_-14px] before:rounded-full before:bg-transparent before:border before:border-[2.5px] before:border-[var(--color-rosa-pastel)] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
                style={{ zIndex: 1, display: "inline-block" }}
              >
                <span className="relative z-10 px-2">Productos</span>
              </Link>
            </li>
            <li>
              <Link
                to="/contacto"
                className="relative [font-family:var(--font-poppins)] font-semibold text-lg transition-colors duration-300 whitespace-nowrap after:content-[''] after:block after:h-[2px] after:bg-[var(--color-verde-menta-suave)] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left
                  before:content-[''] before:absolute before:inset-[-6px_-14px] before:rounded-full before:bg-transparent before:border before:border-[2.5px] before:border-[var(--color-rosa-pastel)] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
                style={{ zIndex: 1, display: "inline-block" }}
              >
                <span className="relative z-10 px-2">Contacto</span>
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
            className={`fixed top-0 left-0 h-full w-4/5 max-w-xs bg-[var(--color-beige-lino)] border-r-2 border-[var(--color-verde-menta-suave)] rounded-tr-3xl rounded-br-3xl shadow-xl flex flex-col items-start z-50 transform transition-transform duration-300 md:hidden
              ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            {/* Encabezado visual del menú móvil */}
            <div className="flex items-center gap-3 mt-8 mb-8 self-center">
              <img
                src={miIconoLeaf}
                alt="Icono Menú"
                className="h-8 w-8"
                style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.10))" }}
              />
              <span
                className="[color:var(--color-gris-carbon)] [font-family:var(--font-poppins)] font-bold text-2xl tracking-wide"
                style={{
                  letterSpacing: "0.08em",
                  textShadow: "0 1px 8px var(--color-blanco)",
                }}
              >
                Menú
              </span>
            </div>
            <button
              className="absolute top-6 right-6 [color:var(--color-verde-menta-suave)] text-4xl p-2 rounded-full bg-white/70 focus:outline-none focus:ring-2 focus:ring-[var(--color-rosa-pastel)]"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Cerrar menú de navegación"
            >
              <X />
            </button>
            <nav className="w-full px-6">
              <ul className="flex flex-col items-start space-y-0 text-2xl w-full">
                <li className="w-full">
                  <Link
                    to="/inicio"
                    onClick={handleNavLinkClick}
                    className="flex items-center gap-3 py-3 px-4 w-full rounded-xl [font-family:var(--font-poppins)] font-semibold text-left"
                  >
                    <Home className="h-7 w-7 [color:var(--color-verde-menta-suave)]" />
                    <span className="bg-[var(--color-rosa-pastel)] px-3 py-1 rounded-lg text-[var(--color-gris-carbon)] w-full">
                      {"Inicio"}
                    </span>
                  </Link>
                  <hr className="border-t border-[var(--color-verde-menta-suave)] my-0" />
                </li>
                <li className="w-full">
                  <Link
                    to="/mi-historia"
                    onClick={handleNavLinkClick}
                    className="flex items-center gap-3 py-3 px-4 w-full rounded-xl [font-family:var(--font-poppins)] font-semibold text-left"
                  >
                    <User className="h-7 w-7 [color:var(--color-verde-menta-suave)]" />
                    <span className="bg-[var(--color-rosa-pastel)] px-3 py-1 rounded-lg text-[var(--color-gris-carbon)] w-full">
                      {"Mi historia"}
                    </span>
                  </Link>
                  <hr className="border-t border-[var(--color-verde-menta-suave)] my-0" />
                </li>
                <li className="w-full">
                  <Link
                    to="/reflexiones"
                    onClick={handleNavLinkClick}
                    className="flex items-center gap-3 py-3 px-4 w-full rounded-xl [font-family:var(--font-poppins)] font-semibold text-left"
                  >
                    <BookOpen className="h-7 w-7 [color:var(--color-verde-menta-suave)]" />
                    <span className="bg-[var(--color-rosa-pastel)] px-3 py-1 rounded-lg text-[var(--color-gris-carbon)] w-full">
                      {"Reflexiones"}
                    </span>
                  </Link>
                  <hr className="border-t border-[var(--color-verde-menta-suave)] my-0" />
                </li>
                <li className="w-full">
                  <Link
                    to="/testimonios"
                    onClick={handleNavLinkClick}
                    className="flex items-center gap-3 py-3 px-4 w-full rounded-xl [font-family:var(--font-poppins)] font-semibold text-left"
                  >
                    <MessageCircle className="h-7 w-7 [color:var(--color-verde-menta-suave)]" />
                    <span className="bg-[var(--color-rosa-pastel)] px-3 py-1 rounded-lg text-[var(--color-gris-carbon)] w-full">
                      {"Testimonios"}
                    </span>
                  </Link>
                  <hr className="border-t border-[var(--color-verde-menta-suave)] my-0" />
                </li>
                <li className="w-full">
                  <Link
                    to="/productos"
                    onClick={handleNavLinkClick}
                    className="flex items-center gap-3 py-3 px-4 w-full rounded-xl [font-family:var(--font-poppins)] font-semibold text-left"
                  >
                    <ShoppingBag className="h-7 w-7 [color:var(--color-verde-menta-suave)]" />
                    <span className="bg-[var(--color-rosa-pastel)] px-3 py-1 rounded-lg text-[var(--color-gris-carbon)] w-full">
                      {"Productos"}
                    </span>
                  </Link>
                  <hr className="border-t border-[var(--color-verde-menta-suave)] my-0" />
                </li>
                <li className="w-full">
                  <Link
                    to="/contacto"
                    onClick={handleNavLinkClick}
                    className="flex items-center gap-3 py-3 px-4 w-full rounded-xl [font-family:var(--font-poppins)] font-semibold text-left"
                  >
                    <Mail className="h-7 w-7 [color:var(--color-verde-menta-suave)]" />
                    <span className="bg-[var(--color-rosa-pastel)] px-3 py-1 rounded-lg text-[var(--color-gris-carbon)] w-full">
                      {"Contacto"}
                    </span>
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

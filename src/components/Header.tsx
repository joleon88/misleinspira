// src/components/Header.tsx
import { useState } from "react";
import { Link } from "react-router-dom"; // Importa Link de react-router-dom
import { Leaf, Menu, X } from "lucide-react"; // Iconos de hoja, menú y cerrar de Lucide React

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Función para cerrar el menú móvil al hacer clic en un enlace
  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="[background-color:var(--color-beige-lino)] py-5 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center flex-wrap px-4">
        {/* Logo MisleInspira con icono de hoja */}
        <Link
          to="/inicio" // Navega a la ruta /inicio
          onClick={handleNavLinkClick} // Cierra el menú si se hace clic en el logo desde el móvil
          className="logo flex items-center [color:var(--color-gris-carbon)] [font-family:var(--font-poppins)] font-bold text-2xl md:text-3xl"
        >
          MisleInsp
          <Leaf className="h-9 w-9 [fill:var(--color-verde-menta-suave)]" />
          ra
        </Link>

        {/* Botón de hamburguesa para móviles */}
        <button
          className="md:hidden [color:var(--color-gris-carbon)] text-3xl p-2 rounded-md hover:[background-color:var(--color-beige-lino)] focus:outline-none focus:ring-2 focus:ring-[var(--color-rosa-pastel)]"
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
                to="/inicio" // Ruta específica
                className="relative [font-family:var(--font-poppins)] font-semibold text-lg hover:[color:var(--color-rosa-pastel)] transition-colors duration-300 whitespace-nowrap"
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                to="/mi-historia" // Ruta específica
                className="relative [font-family:var(--font-poppins)] font-semibold text-lg hover:[color:var(--color-rosa-pastel)] transition-colors duration-300 whitespace-nowrap"
              >
                Mi historia
              </Link>
            </li>
            <li>
              <Link
                to="/reflexiones" // Ruta específica
                className="relative [font-family:var(--font-poppins)] font-semibold text-lg hover:[color:var(--color-rosa-pastel)] transition-colors duration-300 whitespace-nowrap"
              >
                Reflexiones
              </Link>
            </li>
            <li>
              <Link
                to="/testimonios" // Ruta específica
                className="relative [font-family:var(--font-poppins)] font-semibold text-lg hover:[color:var(--color-rosa-pastel)] transition-colors duration-300 whitespace-nowrap"
              >
                Testimonios
              </Link>
            </li>
            <li>
              <Link
                to="/productos" // Ruta específica
                className="relative [font-family:var(--font-poppins)] font-semibold text-lg hover:[color:var(--color-rosa-pastel)] transition-colors duration-300 whitespace-nowrap"
              >
                Productos
              </Link>
            </li>
            <li>
              <Link
                to="/contacto" // Ruta específica
                className="relative [font-family:var(--font-poppins)] font-semibold text-lg hover:[color:var(--color-rosa-pastel)] transition-colors duration-300 whitespace-nowrap"
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
          {/* Overlay para cerrar el menú al hacer clic fuera (ahora transparente) */}
          <div
            className="fixed inset-0 bg-transparent z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>

          {/* Sidebar del menú móvil */}
          <div
            className={`fixed top-0 left-0 h-full w-3/4 max-w-xs [background-color:rgba(183,217,201,0.8)] flex flex-col items-center justify-center z-50 transform transition-transform duration-300 md:hidden
              ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            <button
              className="absolute top-6 right-6 [color:var(--color-blanco)] text-4xl p-2 rounded-md hover:[background-color:rgba(255,255,255,0.1)] focus:outline-none focus:ring-2 focus:ring-[var(--color-rosa-pastel)]"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Cerrar menú de navegación"
            >
              <X />
            </button>
            <nav className="w-full">
              <ul className="flex flex-col items-center space-y-6 text-2xl">
                {" "}
                {/* Reducido a text-2xl y space-y-6 */}
                <li>
                  <Link
                    to="/inicio"
                    onClick={handleNavLinkClick}
                    className="[color:var(--color-gris-carbon)] [font-family:var(--font-poppins)] font-semibold hover:[color:var(--color-rosa-pastel)] transition-colors duration-300 py-2 px-4 rounded-md" // Cambiado color de texto y hover
                  >
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    to="/mi-historia"
                    onClick={handleNavLinkClick}
                    className="[color:var(--color-gris-carbon)] [font-family:var(--font-poppins)] font-semibold hover:[color:var(--color-rosa-pastel)] transition-colors duration-300 py-2 px-4 rounded-md" // Cambiado color de texto y hover
                  >
                    Mi historia
                  </Link>
                </li>
                <li>
                  <Link
                    to="/reflexiones"
                    onClick={handleNavLinkClick}
                    className="[color:var(--color-gris-carbon)] [font-family:var(--font-poppins)] font-semibold hover:[color:var(--color-rosa-pastel)] transition-colors duration-300 py-2 px-4 rounded-md" // Cambiado color de texto y hover
                  >
                    Reflexiones
                  </Link>
                </li>
                <li>
                  <Link
                    to="/testimonios"
                    onClick={handleNavLinkClick}
                    className="[color:var(--color-gris-carbon)] [font-family:var(--font-poppins)] font-semibold hover:[color:var(--color-rosa-pastel)] transition-colors duration-300 py-2 px-4 rounded-md" // Cambiado color de texto y hover
                  >
                    Testimonios
                  </Link>
                </li>
                <li>
                  <Link
                    to="/productos"
                    onClick={handleNavLinkClick}
                    className="[color:var(--color-gris-carbon)] [font-family:var(--font-poppins)] font-semibold hover:[color:var(--color-rosa-pastel)] transition-colors duration-300 py-2 px-4 rounded-md" // Cambiado color de texto y hover
                  >
                    Productos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contacto"
                    onClick={handleNavLinkClick}
                    className="[color:var(--color-gris-carbon)] [font-family:var(--font-poppins)] font-semibold hover:[color:var(--color-rosa-pastel)] transition-colors duration-300 py-2 px-4 rounded-md" // Cambiado color de texto y hover
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

// src/components/Header.tsx

import { Link } from "react-router-dom"; // Importa Link de react-router-dom
import { Leaf } from "lucide-react"; // Icono de hoja de Lucide React

// Header ya no necesita onNavigate como prop, Link maneja la navegación
function Header() {
  return (
    <header className="[background-color:var(--color-beige-lino)] py-5 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center flex-wrap px-4">
        {/* Usar Link para el logo que va a la raíz y luego se desplaza a #inicio */}
        <Link
          to="/#inicio" // Navega a la ruta raíz y especifica el hash
          className="logo flex items-center [color:var(--color-gris-carbon)] [font-family:var(--font-poppins)] font-bold text-2xl md:text-3xl mb-4 md:mb-0"
        >
          <Leaf className="h-9 w-9 mr-2 [fill:var(--color-verde-menta-suave)]" />{" "}
          {/* Icono de hoja */}
          MisleInspira
        </Link>
        <nav>
          <ul className="nav-links flex flex-row flex-nowrap justify-end items-center space-x-6 md:space-x-8 lg:space-x-10">
            <li>
              {/* Los enlaces a secciones internas de la página de inicio usan Link con hash */}
              <Link
                to="/#inicio"
                className="relative [font-family:var(--font-poppins)] font-semibold text-lg hover:[color:var(--color-rosa-pastel)] transition-colors duration-300 whitespace-nowrap"
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                to="/mi-historia"
                className="relative [font-family:var(--font-poppins)] font-semibold text-lg hover:[color:var(--color-rosa-pastel)] transition-colors duration-300 whitespace-nowrap"
              >
                Mi historia
              </Link>
            </li>
            <li>
              <Link
                to="/reflexiones"
                className="relative [font-family:var(--font-poppins)] font-semibold text-lg hover:[color:var(--color-rosa-pastel)] transition-colors duration-300 whitespace-nowrap"
              >
                Reflexiones
              </Link>
            </li>
            <li>
              <Link
                to="/testimonios"
                className="relative [font-family:var(--font-poppins)] font-semibold text-lg hover:[color:var(--color-rosa-pastel)] transition-colors duration-300 whitespace-nowrap"
              >
                Testimonios
              </Link>
            </li>
            <li>
              <Link
                to="/productos"
                className="relative [font-family:var(--font-poppins)] font-semibold text-lg hover:[color:var(--color-rosa-pastel)] transition-colors duration-300 whitespace-nowrap"
              >
                Productos
              </Link>
            </li>
            <li>
              {/* El enlace a Contacto va a una ruta diferente */}
              <Link
                to="/contacto"
                className="relative [font-family:var(--font-poppins)] font-semibold text-lg hover:[color:var(--color-rosa-pastel)] transition-colors duration-300 whitespace-nowrap"
              >
                Contacto
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;

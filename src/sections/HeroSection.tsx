// src/sections/HeroSection.jsx

import OutlinedButton from "../components/OutLinedButton"; // Asegúrate de que la ruta sea correcta
import { CheckCircle } from "lucide-react"; // Importa el icono de palomita
import misleRemoveBg from "../assets/Misle-removebg.png";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section
      id="inicio"
      className="flex items-center justify-center min-h-[90vh] [background-color:var(--color-beige-lino)] p-0 text-left"
    >
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center flex-wrap px-4">
        {/* Contenedor de texto - centrado en móvil */}
        <div className="inicio-text flex-1 min-w-[400px] max-w-[600px] animate-fadeInSlideUp text-center lg:text-left">
          {" "}
          {/* Eliminado 'md:' de text-center para que aplique en móviles por defecto */}
          <h1 className="[color:var(--color-gris-carbon)] text-5xl md:text-6xl lg:text-7xl mb-1 leading-tight">
            Despierta tu{" "}
            <span className="[color:var(--color-rosa-pastel)]">Potencial</span>.
            Vive con{" "}
            <span className="[color:var(--color-rosa-pastel)]">Propósito</span>.
          </h1>
          {/* Lista de ideas con palomitas */}
          <ul className="text-lg text-left md:text-xl lg:text-2xl mb-8 space-y-3 [color:var(--color-gris-texto-suave)]">
            <li className="flex lg:justify-start">
              {" "}
              {/* Centrado en móvil, izquierda en desktop */}
              <CheckCircle className="h-6 w-6 [color:var(--color-verde-menta-suave)] mr-3 flex-shrink-0" />
              <span>
                Descubre tu <span className="font-bold">fuerza</span> interior.
              </span>
            </li>
            <li className="flex lg:justify-start">
              {" "}
              {/* Centrado en móvil, izquierda en desktop */}
              <CheckCircle className="h-6 w-6 [color:var(--color-verde-menta-suave)] mr-3 flex-shrink-0" />
              <span>
                Transforma tu <span className="font-bold">vida</span> con{" "}
                <span className="font-bold">marketing digital</span> consciente.
              </span>
            </li>
            <li className="flex lg:justify-start">
              {" "}
              {/* Centrado en móvil, izquierda en desktop */}
              <CheckCircle className="h-6 w-6 [color:var(--color-verde-menta-suave)] mr-3 flex-shrink-0" />
              <span>
                Fomenta tu <span className="font-bold">bienestar</span>{" "}
                personal.
              </span>
            </li>
            <li className="flex lg:justify-start">
              {" "}
              {/* Centrado en móvil, izquierda en desktop */}
              <CheckCircle className="h-6 w-6 [color:var(--color-verde-menta-suave)] mr-3 flex-shrink-0" />
              <span>
                Encuentra ideas para{" "}
                <span className="font-bold">emprender</span> y recursos para
                avanzar.
              </span>
            </li>
          </ul>
          <div className="flex justify-center w-full">
            <Link to="/productos">
              <OutlinedButton className="mt-2">
                Comienza tu Transformación
              </OutlinedButton>
            </Link>
          </div>
        </div>
        {/* Contenedor de imagen - centrado en móvil */}
        <div className="inicio-image flex-1 min-w-[400px] flex justify-center items-center">
          <img
            src={misleRemoveBg}
            alt="MisleInspira - Mujer sonriendo, mostrando confianza y serenidad."
            className="md:mt-4 max-w-full h-auto object-cover max-h-[600px]"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

// src/sections/HeroSection.jsx

function HeroSection() {
  return (
    <section
      className="flex items-center justify-center min-h-[90vh] [background-color:var(--color-beige-lino)] p-0 text-left"
    >
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center flex-wrap px-4">
        {/* Contenedor de texto - centrado en móvil */}
        <div className="inicio-text flex-1 min-w-[400px] max-w-[600px] animate-fadeInSlideUp text-center lg:text-left"> {/* Añadido text-center para móviles */}
          <h1 className="[color:var(--color-gris-carbon)] text-5xl md:text-6xl lg:text-7xl mb-1 leading-tight">
            Despierta tu{" "}
            <span className="[color:var(--color-rosa-pastel)]">Potencial</span>.
            Vive con <span className="[color:var(--color-rosa-pastel)]">Propósito</span>.
          </h1>
          <p className="[color:var(--color-gris-texto-suave)] text-lg md:text-xl lg:text-2xl mb-8">
            "En <span className="font-bold">MisleInspira</span>, te acompaño a
            descubrir tu fuerza interior y a transformar tu vida con
            herramientas de{" "}
            <span className="font-bold">marketing digital consciente</span> y{" "}
            <span className="font-bold">bienestar personal</span>. Si estás
            buscando <span className="font-bold">inspiración</span>, ideas para{" "}
            <span className="font-bold">emprender</span> o recursos que te
            ayuden a avanzar, estás en el lugar correcto."
          </p>
          <a
            href="#productos"
            className="inline-block px-8 py-4 [background-color:var(--color-rosa-pastel)] [color:var(--color-blanco)] [font-family:var(--font-poppins)] font-bold text-lg rounded-lg shadow-lg hover:[background-color:var(--color-hover-rosa)] transform hover:-translate-y-1 transition-all duration-300"
          >
            Comienza tu Transformación
          </a>
        </div>
        {/* Contenedor de imagen - centrado en móvil */}
        <div className="inicio-image flex-1 min-w-[400px] flex justify-center items-center">
          <img
            src="IMG-20250726-WA0179.jpg"
            alt="MisleInspira - Mujer sonriendo, mostrando confianza y serenidad."
            className="max-w-full h-auto object-cover max-h-[600px]"
            
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

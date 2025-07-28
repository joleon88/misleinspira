// src/sections/ProductsSection.jsx

import guiaMarketingImg from "../assets/guiaMarketingImg .png";
import tallerBienestarImg from "../assets/tallerBienestarImg .png";
import plantillasEstrategiaImg from "../assets/plantillasEstrategiaImg.png";

function ProductsSection() {
  return (
    <section id="productos" className="container mx-auto py-24 px-4">
      <div className="text-center mb-16">
        <h2 className="[color:var(--color-gris-carbon)] text-4xl md:text-5xl mb-4">
          Nuestras{" "}
          <span className="[color:var(--color-rosa-pastel)]">Soluciones</span>{" "}
          para Ti
        </h2>
        <p className="max-w-3xl mx-auto text-lg md:text-xl">
          Herramientas y recursos diseñados para potenciar tu marca personal y
          tu bienestar.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
        {/* Producto 1: Guía Esencial de Marketing Consciente */}
        <div className="product-card [background-color:var(--color-blanco)] rounded-xl shadow-md overflow-hidden text-center transform hover:-translate-y-2 transition-all duration-300">
          <img
            src={guiaMarketingImg}
            alt="Guía Esencial de Marketing Consciente"
            className="w-full h-56 object-cover border-b [border-color:var(--color-beige-lino)]"
          />
          <div className="p-6">
            <h3 className="[color:var(--color-gris-carbon)] text-2xl mb-3">
              Guía Esencial de Marketing Consciente
            </h3>
            <p className="[color:var(--color-gris-texto-suave)] text-base mb-4">
              Aprende a conectar con tu audiencia de manera auténtica y ética,
              construyendo una marca con propósito y valores.
            </p>
            <p className="[color:var(--color-rosa-pastel)] font-bold text-xl mb-6">
              ¡Gratuita!
            </p>
            <a
              href="#" // Enlace de descarga para el lead magnet
              className="inline-block px-8 py-4 [background-color:var(--color-rosa-pastel)] [color:var(--color-blanco)] [font-family:var(--font-poppins)] font-bold text-lg rounded-lg shadow-lg hover:[background-color:var(--color-hover-rosa)] transform hover:-translate-y-1 transition-all duration-300"
            >
              Descargar Ahora
            </a>
          </div>
        </div>

        {/* Producto 2: Taller Práctico: Bienestar Digital Integral */}
        <div className="product-card [background-color:var(--color-blanco)] rounded-xl shadow-md overflow-hidden text-center transform hover:-translate-y-2 transition-all duration-300">
          <img
            src={tallerBienestarImg}
            alt="Taller de Bienestar Digital"
            className="w-full h-56 object-cover border-b [border-color:var(--color-beige-lino)]"
          />
          <div className="p-6">
            <h3 className="[color:var(--color-gris-carbon)] text-2xl mb-3">
              Taller Práctico: Bienestar Digital Integral
            </h3>
            <p className="[color:var(--color-gris-texto-suave)] text-base mb-4">
              Descubre cómo mantener un equilibrio saludable en la era digital,
              optimizando tu tiempo y sin sacrificar tu productividad.
            </p>
            <p className="[color:var(--color-rosa-pastel)] font-bold text-xl mb-6">
              $49.99 USD
            </p>
            <a
              href="#" // Enlace de compra o inscripción
              className="inline-block px-8 py-4 [background-color:var(--color-rosa-pastel)] [color:var(--color-blanco)] [font-family:var(--font-poppins)] font-bold text-lg rounded-lg shadow-lg hover:[background-color:var(--color-hover-rosa)] transform hover:-translate-y-1 transition-all duration-300"
            >
              Inscríbete Aquí
            </a>
          </div>
        </div>

        {/* Producto 3: Pack de Plantillas: Estrategia Digital Pro */}
        <div className="product-card [background-color:var(--color-blanco)] rounded-xl shadow-md overflow-hidden text-center transform hover:-translate-y-2 transition-all duration-300">
          <img
            src={plantillasEstrategiaImg}
            alt="Plantillas de Estrategia"
            className="w-full h-56 object-cover border-b [border-color:var(--color-beige-lino)]"
          />
          <div className="p-6">
            <h3 className="[color:var(--color-gris-carbon)] text-2xl mb-3">
              Pack de Plantillas: Estrategia Digital Pro
            </h3>
            <p className="[color:var(--color-gris-texto-suave)] text-base mb-4">
              Recursos descargables para planificar tu contenido, redes sociales
              y campañas de forma efectiva y profesional.
            </p>
            <p className="[color:var(--color-rosa-pastel)] font-bold text-xl mb-6">
              $29.99 USD
            </p>
            <a
              href="#" // Enlace de compra o descarga
              className="inline-block px-8 py-4 [background-color:var(--color-rosa-pastel)] [color:var(--color-blanco)] [font-family:var(--font-poppins)] font-bold text-lg rounded-lg shadow-lg hover:[background-color:var(--color-hover-rosa)] transform hover:-translate-y-1 transition-all duration-300"
            >
              Comprar Pack
            </a>
          </div>
        </div>
      </div>
      <div className="text-center mt-16">
        <a
          href="#"
          className="inline-block px-8 py-4 [background-color:var(--color-rosa-pastel)] [color:var(--color-blanco)] [font-family:var(--font-poppins)] font-bold text-lg rounded-lg shadow-lg hover:[background-color:var(--color-hover-rosa)] transform hover:-translate-y-1 transition-all duration-300"
        >
          Ver Todos los Productos
        </a>
      </div>
    </section>
  );
}

export default ProductsSection;

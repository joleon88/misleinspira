// src/sections/ProductsSection.jsx

function ProductsSection() {
  return (
    <section id="productos" className="container mx-auto py-24 px-4">
      <div className="text-center mb-16">
        <h2 className="text-gris-carbon text-4xl md:text-5xl mb-4">
          Nuestras <span className="text-rosa-pastel">Soluciones</span> para Ti
        </h2>
        <p className="max-w-3xl mx-auto text-lg md:text-xl">
          Herramientas y recursos diseñados para potenciar tu marca personal y
          tu bienestar.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
        {/* Producto 1 */}
        <div className="product-card bg-white rounded-xl shadow-md overflow-hidden text-center transform hover:-translate-y-2 transition-all duration-300">
          <img
            src="https://placehold.co/400x220/b7d9c9/4a4a4a?text=Guía+Marketing+Consciente"
            alt="Guía de Marketing Consciente"
            className="w-full h-56 object-cover border-b border-beige-lino"
          />
          <div className="p-6">
            <h3 className="text-gris-carbon text-2xl mb-3">
              Guía de Marketing Consciente
            </h3>
            <p className="text-gray-600 text-base mb-6">
              Aprende a conectar con tu audiencia de manera auténtica y ética,
              construyendo una marca con propósito.
            </p>
            <a
              href="#"
              className="inline-block mt-4 px-8 py-4 [background-color:var(--color-rosa-pastel)] [color:var(--color-blanco)] [font-family:var(--font-poppins)] font-bold text-lg rounded-lg shadow-lg hover:[background-color:var(--color-hover-rosa)] transform hover:-translate-y-1 transition-all duration-300"
            >
              Saber Más
            </a>
          </div>
        </div>
        {/* Producto 2 */}
        <div className="product-card bg-white rounded-xl shadow-md overflow-hidden text-center transform hover:-translate-y-2 transition-all duration-300">
          <img
            src="https://placehold.co/400x220/f8c8dc/4a4a4a?text=Taller+Bienestar+Digital"
            alt="Taller de Bienestar Digital"
            className="w-full h-56 object-cover border-b border-beige-lino"
          />
          <div className="p-6">
            <h3 className="text-gris-carbon text-2xl mb-3">
              Taller: Bienestar Digital
            </h3>
            <p className="text-gray-600 text-base mb-6">
              Descubre cómo mantener un equilibrio saludable en la era digital,
              sin sacrificar tu productividad.
            </p>
            <a
              href="#"
              className="inline-block mt-4 px-8 py-4 [background-color:var(--color-rosa-pastel)] [color:var(--color-blanco)] [font-family:var(--font-poppins)] font-bold text-lg rounded-lg shadow-lg hover:[background-color:var(--color-hover-rosa)] transform hover:-translate-y-1 transition-all duration-300"
            >
              Inscríbete
            </a>
          </div>
        </div>
        {/* Producto 3 */}
        <div className="product-card bg-white rounded-xl shadow-md overflow-hidden text-center transform hover:-translate-y-2 transition-all duration-300">
          <img
            src="https://placehold.co/400x220/f5efe6/4a4a4a?text=Plantillas+Estrategia"
            alt="Plantillas de Estrategia"
            className="w-full h-56 object-cover border-b border-beige-lino"
          />
          <div className="p-6">
            <h3 className="text-gris-carbon text-2xl mb-3">
              Plantillas de Estrategia Digital
            </h3>
            <p className="text-gray-600 text-base mb-6">
              Recursos descargables para planificar tu contenido, redes sociales
              y campañas de forma efectiva.
            </p>
            <a
              href="#"
              className="inline-block mt-4 px-8 py-4 [background-color:var(--color-rosa-pastel)] [color:var(--color-blanco)] [font-family:var(--font-poppins)] font-bold text-lg rounded-lg shadow-lg hover:[background-color:var(--color-hover-rosa)] transform hover:-translate-y-1 transition-all duration-300"
            >
              Descargar
            </a>
          </div>
        </div>
      </div>
      <div className="text-center mt-16">
        <a
          href="#"
          className="inline-block mt-4 px-8 py-4 [background-color:var(--color-rosa-pastel)] [color:var(--color-blanco)] [font-family:var(--font-poppins)] font-bold text-lg rounded-lg shadow-lg hover:[background-color:var(--color-hover-rosa)] transform hover:-translate-y-1 transition-all duration-300"
        >
          Ver Todos los Productos
        </a>
      </div>
    </section>
  );
}

export default ProductsSection;

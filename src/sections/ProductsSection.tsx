import { CategoriaProductos } from "../components/CategoriaProductos";
import { CardProducto } from "../components/ProductsCard";
import guiaMarketing from "../assets/guiaMarketingImg.png";
import plantillaEstrategial from "../assets/plantillasEstrategiaImg.png";
import tallerBienestarImg from "../assets/tallerBienestarImg .png";
import bienestarLaboral from "../assets/bienestarLaboral.jpg";

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
          Herramientas y recursos diseñadas para potenciar tu marca personal y
          tu bienestar.
        </p>
      </div>

      {/* Bloque de productos destacados iniciales */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-10 place-items-center">
        {/* Producto 1 */}
        <CardProducto
          titulo="Guía Esencial de Marketing Consciente"
          descripcion="Conecta con tu audiencia de manera auténtica y ética."
          precio="¡Gratuita!"
          imagen={guiaMarketing}
          boton="Descargar Ahora"
          enlace={""}
        />
        {/* Producto 2 */}
        <CardProducto
          titulo="Taller Práctico: Bienestar Digital"
          descripcion="Mantén un equilibrio saludable en la era digital."
          precio="$49.99 USD"
          imagen={tallerBienestarImg}
          boton="Inscríbete Aquí"
          enlace={""}
        />
        {/* Producto 3 */}
        <CardProducto
          titulo="Pack de Plantillas: Estrategia Pro"
          descripcion="Recursos para planificar tu contenido y campañas."
          precio="$29.99 USD"
          imagen={plantillaEstrategial}
          boton="Comprar Pack"
          enlace={""}
        />
      </div>

      {/* NUEVA SECCIÓN */}
      <div className="mt-24">
        {/* Gratuitos */}
        <CategoriaProductos
          titulo="Gratuitos para Empezar"
          productos={[
            {
              titulo: "Guía Rápida de Nicho",
              descripcion: "Descubre tu audiencia ideal.",
              precio: "¡Gratis!",
              imagen:
                "https://images.unsplash.com/photo-1543286386-713bdd59944f?ixlib=rb-4.0.3&auto=format&fit=crop&w=250&h=125&q=80",
              boton: "Descargar",
              enlace: "",
            },
            {
              titulo: "Checklist de Contenido",
              descripcion: "Planifica tu estrategia de contenido.",
              precio: "¡Gratis!",
              imagen:
                "https://images.unsplash.com/photo-1520607148719-57305943171e?ixlib=rb-4.0.3&auto=format&fit=crop&w=250&h=125&q=80",
              boton: "Descargar",
              enlace: "",
            },
          ]}
        />

        {/* Premium */}
        <CategoriaProductos
          titulo="Premium para Impulsar"
          productos={[
            {
              titulo: "Ebook 50 Prompts",
              descripcion:
                "Los 50 prompts que te llevarán hacer más productivo en menor tiempo.",
              precio: "$19.99",
              imagen:
                "https://images.unsplash.com/photo-1521405924368-64c5b84bec60?ixlib=rb-4.0.3&auto=format&fit=crop&w=250&h=125&q=80",
              boton: "Comprar",
              enlace: "",
            },
            {
              titulo: "Guía SEO Avanzada",
              descripcion:
                "Tu sitio web estará en los primeros lugares de las búsquedas en Google.",
              precio: "$34.99",
              imagen:
                "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=250&h=125&q=80",
              boton: "Comprar",
              enlace: "",
            },
            {
              titulo: "Taller Bienestar",
              descripcion:
                "Siente el preceso como en casa. Haz que tu vida sea mas cómoda y duradera.",
              precio: "$49.99",
              imagen: bienestarLaboral, // en este caos no se pasa como un objeto
              boton: "Comprar",
              enlace: "",
            },
          ]}
        />

        {/* Academia */}
        <div className="text-center mb-24">
          <h3 className="[color:var(--color-gris-carbon)] text-3xl md:text-4xl mb-8">
            <span className="[color:var(--color-verde-menta-suave)]">
              Academia
            </span>{" "}
            Digital DWA
          </h3>
          <div className="flex justify-center">
            <CardProducto
              titulo="Cursos y Mentorías Online"
              descripcion="Domina el marketing digital y escala tu negocio. Lo tienes todo aquí, aprovechalo."
              precio=""
              imagen="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=250&h=125&q=80"
              boton="Más Información"
              enlace={""}
            />
          </div>
        </div>

        {/* Ofertas */}
        <CategoriaProductos
          titulo="Ofertas Especiales"
          productos={[
            {
              titulo: "Combo Ebook + Taller",
              descripcion: "Paga uno y lleva dos. Uno el complemento del otro.",
              precio: "$59.99 USD",
              imagen:
                "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=250&h=125&q=80",
              boton: "Comprar Combo",
              enlace: "",
            },
          ]}
        />
      </div>

      {/* Botón final */}
      <div className="text-center mt-16">
        <a
          href="#"
          className="inline-block px-8 py-4 [background-color:var(--color-rosa-pastel)] [color:var(--color-blanco)] [font-family:var(--font-poppins)] font-bold text-lg rounded-lg shadow-lg hover:[background-color:var(--color-hover-rosa)] transform hover:-translate-y-1 transition-all duration-300"
        >
          Explorar Más Productos
        </a>
      </div>
    </section>
  );
}

export default ProductsSection;

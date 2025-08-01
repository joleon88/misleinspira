import { CategoriaProductos } from "../components/CategoriaProductos";
import { CardProducto } from "../components/ProductsCard";
//import guiaMarketing from "../assets/guiaMarketingImg.png";
import plantillaEstrategial from "../assets/plantillasEstrategiaImg.png";
import tallerBienestarImg from "../assets/tallerBienestarImg .png";
import bienestarLaboral from "../assets/bienestarLaboral.jpg";
import checklistContenido from "../assets/checklistContenido.png";
import guiadeNicho from "../assets/guiadeNicho.png";
import guia2025img from "../assets/Guia-2025.jpg";

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
          titulo="Guía Rápida 2025"
          descripcion="3 Herraminetas clave para crear contenido impactante. Domina Canva, ChatGPT y CapCut."
          precio="¡Gratuita!"
          imagen={guia2025img}
          boton="Descargar Ahora"
          enlace={
            "https://nzrisfjbrzlwltqfisib.supabase.co/storage/v1/object/public/content-files/Guia-rapida-2025.pdf"
          }
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
              imagen: guiadeNicho,
              boton: "Descargar",
              enlace: "",
            },
            {
              titulo: "Checklist de Contenido",
              descripcion: "Planifica tu estrategia de contenido.",
              precio: "¡Gratis!",
              imagen: checklistContenido,
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
        <CategoriaProductos
          titulo="Academia Digital"
          productos={[
            {
              titulo: "Academia Digital DWA",
              descripcion:
                "Cursos y Mentorías Online. Domina el marketing digital y escala tu negocio. Lo tienes todo aquí, aprovechalo.",
              precio: "$83.99 USD",
              imagen:
                "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=250&h=125&q=80",
              boton: "Más Información",
              enlace: "",
            },
          ]}
        />
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
    </section>
  );
}

export default ProductsSection;

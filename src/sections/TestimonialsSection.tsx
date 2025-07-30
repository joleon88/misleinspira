// src/sections/TestimonialsSection.tsx

import TestimonialCard from "../components/TestimonialCard"; // Importa el componente TestimonialCard
import andrea from "../assets/Andrea.png"; // Asegúrate de que estas rutas sean correctas
import carlos from "../assets/Carlos.png"; // Asegúrate de que estas rutas sean correctas
import laura from "../assets/Laura.png"; // Asegúrate de que estas rutas sean correctas
import TestimoniosImage from "../assets/Testimonios.jpg"; // Importa la imagen para el título de la sección

function TestimonialsSection() {
  return (
    <section
      id="testimonios"
      className="container mx-auto py-24 px-4 [background-color:var(--color-crema-claro)] text-center" // Nuevo color de fondo
    >
      <div className="text-center mb-16">
        <h2 className="[color:var(--color-gris-carbon)] text-4xl md:text-5xl mb-4">
          Testimonios que Inspiran{" "}
          <span className="[color:var(--color-rosa-pastel)]">Crecimiento</span>
        </h2>
        <p className="max-w-3xl mx-auto text-lg md:text-xl">
          Cada experiencia compartida siembra una nueva semilla de confianza y
          transformación. Descubre lo que dicen quienes ya vivieron esta
          experiencia.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-20">
        <div className="section-image-circle flex-none w-[350px] h-[350px] rounded-full overflow-hidden flex justify-center items-center shadow-xl [background-color:var(--color-beige-lino)] transition-transform duration-300 hover:scale-105">
          <img
            src={TestimoniosImage}
            alt="MisleInspira - Imagen que simboliza la introspección y el pensamiento."
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="section-text flex-1 min-w-[300px] max-w-[600px] text-center lg:text-left">
          <h3 className="[color:var(--color-gris-carbon)] text-3xl md:text-4xl mb-4">
            Historias Reales, Transformación Auténtica
          </h3>
          <p className="mb-8 [color:var(--color-gris-texto-suave)]">
            Explora las voces de quienes han{" "}
            <span className="font-bold">transformado sus vidas</span> y
            proyectos con MisleInspira. Sus testimonios reflejan el impacto de
            nuestro enfoque consciente, demostrando que el{" "}
            <span className="font-bold">crecimiento personal y digital</span>{" "}
            van de la mano.
          </p>
        </div>
      </div>
      <div className="w-full mt-20 [background-color:var(--color-verde-menta-suave)]">
        <div className="container mx-auto px-4 p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Llamada a TestimonialCard para el primer testimonio */}
            <TestimonialCard
              quote="MisleInspira no solo me ayudó a organizar mis estrategias de marketing, sino que también me impulsó a creer más en mi proyecto. Su enfoque integral es único."
              author="Andrea P."
              rating={4}
              imageUrl={andrea}
            />
            {/* Llamada a TestimonialCard para el segundo testimonio */}
            <TestimonialCard
              quote="La calma y claridad que Misle transmite son contagiosas. Gracias a sus consejos, he logrado un equilibrio entre mi vida personal y mi emprendimiento digital."
              author="Carlos G."
              rating={5}
              imageUrl={carlos}
            />
            {/* Llamada a TestimonialCard para el tercer testimonio */}
            <TestimonialCard
              quote="Cada sesión es un regalo. MisleInspira me ha dado las herramientas para ver los desafíos como oportunidades y celebrar cada pequeño avance."
              author="Laura S."
              rating={5}
              imageUrl={laura}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;

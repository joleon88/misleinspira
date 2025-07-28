// src/sections/TestimonialsSection.tsx

import TestimonialCard from "../components/TestimonialCard"; // Importa el nuevo componente TestimonialCard
import andrea from "../assets/Andrea.png";
import carlos from "../assets/Carlos.png";
import laura from "../assets/Laura.png";

function TestimonialsSection() {
  return (
    <section
      id="testimonios"
      className="[background-color:var(--color-verde-menta-suave)] [color:var(--color-blanco)] py-20 text-center"
    >
      <div className="container mx-auto px-4">
        <h2 className="[color:var(--color-blanco)] text-4xl md:text-5xl mb-12">
          Voces que{" "}
          <span className="[color:var(--color-rosa-pastel)]">Inspiran</span>
        </h2>
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
    </section>
  );
}

export default TestimonialsSection;

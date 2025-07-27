// src/sections/TestimonialsSection.tsx
import React from "react";

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
          <div className="testimonial-card [background-color:rgba(255,255,255,0.98)] [color:var(--color-gris-carbon)] p-10 rounded-xl shadow-xl text-left relative pt-16 transform hover:-translate-y-1 transition-transform duration-300">
            <p className="italic mb-4 text-lg">
              "MisleInspira no solo me ayudó a organizar mis estrategias de
              marketing, sino que también me impulsó a creer más en mi proyecto.
              Su enfoque integral es único."
            </p>
            <div className="author font-bold [color:var(--color-rosa-pastel)] text-lg text-right">
              {" "}
              {/* Usando la sintaxis correcta */}- Andrea P.
            </div>
            <span className="absolute top-2 left-6 [color:var(--color-rosa-pastel)] text-8xl opacity-80 [font-family:var(--font-poppins)] leading-none">
              {" "}
              {/* Usando la sintaxis correcta */}“
            </span>
          </div>
          <div className="testimonial-card [background-color:rgba(255,255,255,0.98)] [color:var(--color-gris-carbon)] p-10 rounded-xl shadow-xl text-left relative pt-16 transform hover:-translate-y-1 transition-transform duration-300">
            <p className="italic mb-4 text-lg">
              "La calma y claridad que Misle transmite son contagiosas. Gracias
              a sus consejos, he logrado un equilibrio entre mi vida personal y
              mi emprendimiento digital."
            </p>
            <div className="author font-bold [color:var(--color-rosa-pastel)] text-lg text-right">
              {" "}
              {/* Usando la sintaxis correcta */}- Carlos G.
            </div>
            <span className="absolute top-2 left-6 [color:var(--color-rosa-pastel)] text-8xl opacity-80 [font-family:var(--font-poppins)] leading-none">
              {" "}
              {/* Usando la sintaxis correcta */}“
            </span>
          </div>
          <div className="testimonial-card [background-color:rgba(255,255,255,0.98)] [color:var(--color-gris-carbon)] p-10 rounded-xl shadow-xl text-left relative pt-16 transform hover:-translate-y-1 transition-transform duration-300">
            <p className="italic mb-4 text-lg">
              "Cada sesión es un regalo. MisleInspira me ha dado las
              herramientas para ver los desafíos como oportunidades y celebrar
              cada pequeño avance."
            </p>
            <div className="author font-bold [color:var(--color-rosa-pastel)] text-lg text-right">
              {" "}
              {/* Usando la sintaxis correcta */}- Laura S.
            </div>
            <span className="absolute top-2 left-6 [color:var(--color-rosa-pastel)] text-8xl opacity-80 [font-family:var(--font-poppins)] leading-none">
              {" "}
              {/* Usando la sintaxis correcta */}“
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;

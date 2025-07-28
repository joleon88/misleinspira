// src/components/TestimonialCard.tsx
import React from "react";
import { Star } from "lucide-react"; // Importa el icono de estrella

// Define las props para el componente TestimonialCard
interface TestimonialCardProps {
  quote: string; // El texto del testimonio
  author: string; // El nombre del autor del testimonio
  rating: number; // La calificación en estrellas (ej. 1 a 5)
  imageUrl: string; // URL de la imagen del autor
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  rating,
  imageUrl,
}) => {
  return (
    <div className="testimonial-card [background-color:rgba(255,255,255,0.98)] [color:var(--color-gris-carbon)] p-8 rounded-xl shadow-xl text-left relative pt-16 pb-8 transform hover:-translate-y-1 transition-transform duration-300">
      {/* Estrellas de valoración */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              i < rating
                ? "[fill:#FFD700] [color:#FFD700]"
                : "[color:var(--color-borde-claro)]" // Estrellas amarillas
            }`}
          />
        ))}
      </div>

      {/* Símbolo de comillas grandes */}
      <span className="absolute top-2 left-6 [color:var(--color-rosa-pastel)] text-8xl opacity-80 [font-family:var(--font-poppins)] leading-none">
        “
      </span>

      <p className="italic mb-4 text-lg">"{quote}"</p>

      {/* Círculo con la cara del autor y nombre - ahora inline y al final del contenido */}
      <div className="flex items-center justify-between mt-6">
        {" "}
        {/* Contenedor flex para alinear imagen y nombre */}
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 [border-color:var(--color-verde-menta-suave)] shadow-md flex-shrink-0">
          <img
            src={imageUrl}
            alt={`Foto de ${author}`}
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/64x64/cccccc/000000?text=User"; // Imagen de fallback si falla la carga
            }}
          />
        </div>
        <div className="author font-bold [color:var(--color-rosa-pastel)] text-lg text-right ml-4">
          {" "}
          {/* Margen izquierdo para separar de la imagen */}- {author}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;

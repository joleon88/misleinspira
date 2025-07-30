// src/components/OutlinedButton.tsx
import React from "react";

// Define las props para el componente OutlinedButton
interface OutlinedButtonProps {
  children: React.ReactNode; // Contenido del botón (texto, iconos, etc.)
  onClick?: () => void; // Función a ejecutar al hacer clic
  href?: string; // URL opcional si el botón actúa como enlace
  className?: string; // Clases adicionales de Tailwind CSS
  disabled?: boolean; // Deshabilita el
  type?: "button" | "submit" | "reset"; // Tipo de botón para formularios
}

const OutlinedButton: React.FC<OutlinedButtonProps> = ({
  children,
  onClick,
  href,
  className = "",
  disabled = false,
  type = "button", // Default to "button" if not specified
}) => {
  const baseClasses = `
    inline-block // Ensures the button only takes up necessary width
    px-6 py-3
    border-2 [border-color:var(--color-verde-menta-suave)]
    [color:var(--color-gris-carbon)] // Default text color
    [background-color:var(--color-rosa-pastel)]
    [font-family:var(--font-poppins)]
    font-bold text-lg
    rounded-full
    shadow-md
    relative // Needed for pseudo-element positioning
    overflow-hidden // Hides the overflowing pseudo-element initially
    transform hover:-translate-y-1
    transition-all duration-300
    disabled:opacity-50 disabled:cursor-not-allowed
    group // Enable group-hover utility
  `;

  const pseudoElementClasses = `
    absolute
    inset-0
    [background-color:var(--color-hover-rosa)]
    transform
    scale-x-0 // Start with 0 width
    origin-left // Scale from left
    transition-transform duration-300 ease-out
    group-hover:scale-x-100 // Expand to full width on hover
    -z-10 // Place behind text
  `;

  const textClasses = `
    relative z-10 // Ensure text is above the pseudo-element
    transition-colors duration-300 ease-out
    group-hover:[color:var(--color-blanco)] // Change text color on hover
  `;

  if (href) {
    return (
      <a
        href={href}
        className={`${baseClasses} ${className}`}
        onClick={onClick}
        aria-disabled={disabled} // For accessibility if used as a disabled link
        type={type} // Pass the type prop to the native button
      >
        <span className={pseudoElementClasses}></span>
        <span className={textClasses}>{children}</span>
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${className}`}
      disabled={disabled}
    >
      <span className={pseudoElementClasses}></span>
      <span className={textClasses}>{children}</span>
    </button>
  );
};

export default OutlinedButton;

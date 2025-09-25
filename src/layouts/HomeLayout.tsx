// src/layouts/HomeLayout.tsx
import { useEffect } from "react";
import HeroSection from "../sections/HeroSection.tsx";
import AboutSection from "../sections/AboutSection.tsx";
import ReflectionsSection from "../sections/ReflectionsSection.tsx";
import TestimonialsSection from "../sections/TestimonialsSection.tsx";
import ProductsSection from "../sections/ProductsSection.tsx";

function HomeLayout() {
  useEffect(() => {
    // Esta función se encarga de hacer scroll a la sección si hay un hash en la URL
    const handleScrollToHash = () => {
      const hash = window.location.hash;
      if (hash) {
        // Usa un pequeño timeout para asegurar que el DOM se ha renderizado antes de intentar hacer scroll
        setTimeout(() => {
          const element = document.getElementById(hash.substring(1));
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 0);
      }
    };

    // Escucha los cambios de hash (ej. al hacer clic en enlaces internos del menú)
    window.addEventListener("hashchange", handleScrollToHash);

    // Llama a la función una vez al montar el componente, por si la URL ya tiene un hash
    handleScrollToHash();

    // Función de limpieza para remover el event listener al desmontar el componente
    return () => {
      window.removeEventListener("hashchange", handleScrollToHash);
    };
  }, []); // El array de dependencias vacío significa que este efecto se ejecuta una vez al montar y se limpia al desmontar

  return (
    <>
      <HeroSection />
      <ProductsSection />
      <AboutSection />
      <ReflectionsSection />
      <TestimonialsSection />
    </>
  );
}

export default HomeLayout;

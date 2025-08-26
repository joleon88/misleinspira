// useAnimateOnScroll.tsx
import { useEffect, useRef } from "react";
import { animate } from "animejs";
import type { AnimationParams } from "animejs";

const useAnimateOnScroll = <T extends Element>(
  animationProps: AnimationParams
) => {
  const elementRef = useRef<T>(null);
  const animation = useRef<any>(null); // Mantenemos una referencia a la animación

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Revisa si la animación ya existe y la re-inicializa si es necesario
            if (animation.current) {
              animation.current.seek(0); // Vuelve al inicio de la animación
              animation.current.play(); // Reproduce la animación
            } else {
              // Crea la animación si no existe
              animation.current = animate(entry.target, {
                ...animationProps,
              });
            }
          } else {
            // Pausa la animación cuando el elemento sale del viewport
            if (animation.current) {
              animation.current.pause();
            }
          }
        });
      },
      {
        rootMargin: "0px",
        threshold: 0,
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [animationProps]);

  return elementRef;
};

export default useAnimateOnScroll;

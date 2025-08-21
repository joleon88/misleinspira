import React from "react";
import misleRemoveBg from "../assets/Misle-removebg.png";

/**
 * Los colores de tu paleta CSS
 */
const colors = {
  beigeLino: "#f5efe6",
  rosaPastel: "#f8c8dc",
  verdeMentaSuave: "#b7d9c9",
  grisCarbon: "#4a4a4a",
  grisTextoSuave: "#5a5a5a",
};

/**
 * Componente HeroImage para mostrar la imagen de perfil con un diseño moderno.
 */
const HeroImage: React.FC = () => {
  return (
    <div className="inicio-image flex-1 min-w-[260px] flex justify-center items-center mt-15 lg:mt-0">
      {/* Contenedor principal */}
      <div className="relative w-full max-w-[220px] sm:max-w-[400px] aspect-square rounded-full">
        {/* Imagen circular */}
        <div className="relative w-full h-full rounded-full z-10 overflow-hidden">
          <img
            src={misleRemoveBg}
            alt="MisleInspira - Mujer sonriendo, mostrando confianza y serenidad."
            className="w-full h-full object-cover rounded-lg"
            style={{
              background: `linear-gradient(to left, #d8efe4, ${colors.verdeMentaSuave})`,
            }}
          />
        </div>

        {/* Rectángulo curvo arriba derecha */}
        <div
          className="absolute w-[80px] h-[20px] sm:w-[150px] sm:h-[35px] rounded-full transform -rotate-45 z-20"
          style={{
            top: "5%",
            right: "15%",
            backgroundColor: colors.rosaPastel,
          }}
        ></div>

        {/* Rectángulo arriba derecha mas pequeño */}
        <div
          className="absolute w-[40px] h-[10px] sm:w-[70px] sm:h-[20px] rounded-full transform -rotate-45 z-20"
          style={{
            top: "20%",
            right: "-2%",
            backgroundColor: colors.grisCarbon,
          }}
        ></div>

        {/* Rectángulos forma de X izquirda arriba */}
        <div
          className="absolute w-[17px] h-[5px] sm:w-[30px] sm:h-[7px] rounded-full transform -rotate-45 z-20"
          style={{
            top: "5%",
            right: "90%",
            backgroundColor: colors.grisCarbon,
          }}
        ></div>
        <div
          className="absolute w-[17px] h-[5px] sm:w-[30px] sm:h-[7px] rounded-full transform -rotate-125 z-20"
          style={{
            top: "5%",
            right: "90%",
            backgroundColor: colors.grisCarbon,
          }}
        ></div>

        {/* Rectángulos forma de X derecha */}
        <div
          className="absolute w-[17px] h-[5px] sm:w-[30px] sm:h-[7px] rounded-full transform -rotate-45 z-20"
          style={{
            top: "50%",
            right: "-10%",
            backgroundColor: colors.rosaPastel,
          }}
        ></div>
        <div
          className="absolute w-[17px] h-[5px] sm:w-[30px] sm:h-[7px] rounded-full transform -rotate-125 z-20"
          style={{
            top: "50%",
            right: "-10%",
            backgroundColor: colors.rosaPastel,
          }}
        ></div>

        {/* Rectángulo curvo abajo izquierda */}
        <div
          className="absolute w-[80px] h-[20px] sm:w-[150px] sm:h-[35px] rounded-full transform rotate-[130deg] z-20"
          style={{
            bottom: "2%",
            left: "-2%",
            backgroundColor: colors.grisCarbon,
          }}
        ></div>

        {/* SVG curvo pegado a la parte inferior derecha */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 400 100"
          className="absolute bottom-[-20px] right-[-70px] sm:bottom-[-40px] sm:right-[-150px] rotate-[325deg] z-20 w-[200px] h-[100px] sm:w-[400px] sm:h-[200px]"
        >
          <path
            d="M20 30 Q150 120 280 40"
            stroke={colors.rosaPastel}
            strokeWidth="25"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        {/* Elemento rayado (ahora bola verde) */}
        <div
          className="absolute w-[60px] h-[60px] sm:w-[120px] sm:h-[120px] transform rotate-[88deg] overflow-hidden rounded-full z-20"
          style={{
            bottom: "40%",
            right: "90%",

            borderStyle: "solid",
            borderColor: colors.verdeMentaSuave,
            background: `repeating-linear-gradient(
              -200deg,
              ${colors.verdeMentaSuave},
              ${colors.verdeMentaSuave} 3px,
              transparent 3px,
              transparent 8px
            )`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default HeroImage;

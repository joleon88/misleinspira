// src/sections/AboutSection.tsx

import OutlinedButton from "../components/OutLinedButton";

function AboutSection() {
  return (
    <section id="mi-historia" className="container mx-auto py-24 px-4">
      <div className="text-center mb-16">
        <h2 className="[color:var(--color-gris-carbon)] text-4xl md:text-5xl mb-4">
          Mi <span className="[color:var(--color-rosa-pastel)]">Viaje</span>, Mi{" "}
          <span className="[color:var(--color-rosa-pastel)]">Esencia</span>
        </h2>
        <p className="max-w-3xl mx-auto text-lg md:text-xl">
          Descubre el camino que me llevó a crear MisleInspira y mi compromiso
          con tu crecimiento personal y profesional.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-20">
        <div className="section-image-circle flex-none w-[350px] h-[350px] rounded-full overflow-hidden flex justify-center items-center shadow-xl border-verde-menta-suave bg-beige-lino transition-transform duration-300 hover:scale-105">
          <img
            src="IMG-20250726-WA0181.jpg"
            alt="MisleInspira - Imagen que representa el viaje personal y el crecimiento."
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="section-text flex-1 min-w-[300px] max-w-[600px]">
          <h3 className="text-gris-carbon text-3xl md:text-4xl mb-4">
            Conoce a Misle: Pasión por Inspirar
          </h3>
          <p className="mb-4">
            Soy <span className="font-bold">Misle</span>, una mujer cubana,
            emprendedora, creativa y curiosa. Mi mayor alegría es compartir lo
            que voy aprendiendo para{" "}
            <span className="font-bold">
              inspirar a otras personas a creer en sí mismas
            </span>{" "}
            y generar ingresos desde casa, construyendo la vida que sueñan.
          </p>
          <p className="mb-4">
            Mi historia es un reflejo de la búsqueda constante de equilibrio y
            significado. Tras años en el mundo corporativo, sentí un llamado
            profundo a fusionar mi experiencia en marketing con mi pasión por el
            desarrollo humano. Así nació MisleInspira: un espacio donde la{" "}
            <span className="font-bold">estrategia digital</span> se encuentra
            con la <span className="font-bold">sabiduría interior</span>.
          </p>
          <p className="mb-8">
            Creo firmemente que el éxito verdadero se construye desde adentro
            hacia afuera. Mi misión es ofrecerte las herramientas y la guía para
            que no solo alcances tus metas externas, sino que también cultives
            una vida llena de{" "}
            <span className="font-bold">paz, propósito y autenticidad</span>.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <OutlinedButton href="/contacto" className="mt-2">
          Conóceme Más
        </OutlinedButton>
      </div>
    </section>
  );
}

export default AboutSection;

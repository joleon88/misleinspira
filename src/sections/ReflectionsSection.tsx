// src/sections/ReflectionsSection.tsx
import { useState } from "react";
import OutlinedButton from "../components/OutLinedButton";

function ReflectionsSection() {
  const [generatedReflection, setGeneratedReflection] = useState<string>(
    "Haz clic en el botón para recibir un pensamiento inspirador."
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Función para generar una reflexión usando la API de Gemini
  const generateReflection = async () => {
    setGeneratedReflection("Generando tu reflexión... ✨");
    setIsLoading(true);

    try {
      type ChatMessage = { role: string; parts: { text: string }[] };
      let chatHistory: ChatMessage[] = [];
      const prompt =
        "Genera una reflexión corta e inspiradora sobre crecimiento personal, bienestar, mindfulness o marketing digital consciente. Debe ser concisa (máximo 2-3 frases) y motivadora.";
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });

      const payload = { contents: chatHistory };
      // ATENCIÓN: Reemplaza "TU_API_KEY_AQUI" con tu clave real de la API de Gemini
      // Es más seguro almacenar esto en variables de entorno para producción.
      const apiKey: string = "TU_API_KEY_AQUI";
      const apiUrl: string = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (
        result.candidates &&
        result.candidates.length > 0 &&
        result.candidates[0].content &&
        result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0
      ) {
        const text = result.candidates[0].content.parts[0].text;
        setGeneratedReflection(text);
      } else {
        setGeneratedReflection(
          "No se pudo generar la reflexión. Inténtalo de nuevo."
        );
        console.error("Estructura de respuesta inesperada:", result);
      }
    } catch (error) {
      console.error("Error al llamar a la API de Gemini:", error);
      setGeneratedReflection(
        "Ocurrió un error al generar la reflexión. Por favor, inténtalo más tarde."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="reflexiones" className="container mx-auto py-24 px-4">
      <div className="text-center mb-16">
        <h2 className="[color:var(--color-gris-carbon)] text-4xl md:text-5xl mb-4">
          Semillas de{" "}
          <span
            className="[color:var(--color-rosa-pastel)]"
            style={{ textShadow: "2px 2px 4px black" }}
          >
            Reflexión
          </span>
        </h2>
        <p className="max-w-3xl mx-auto text-lg md:text-xl">
          Un espacio para nutrir tu mente y espíritu con pensamientos, artículos
          y herramientas para una vida más consciente.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-20">
        <div className="section-image-circle flex-none w-[350px] h-[350px] rounded-full overflow-hidden flex justify-center items-center shadow-xl [background-color:var(--color-beige-lino)] transition-transform duration-300 hover:scale-105">
          <img
            src="IMG-20250726-WA0177.jpg"
            alt="MisleInspira - Imagen que simboliza la introspección y el pensamiento."
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="section-text flex-1 min-w-[300px] max-w-[600px]">
          <h3 className="[color:var(--color-gris-carbon)] text-3xl md:text-4xl mb-4">
            Inspírate, Aprende, Crece
          </h3>
          <p className="mb-8">
            En esta sección, encontrarás una curada selección de{" "}
            <span className="font-bold">
              artículos, meditaciones guiadas y ejercicios prácticos
            </span>{" "}
            diseñados para fomentar tu bienestar integral. Desde la gestión del
            tiempo y la productividad consciente, hasta la construcción de
            hábitos saludables y la conexión con tu propósito.
          </p>
          <p className="mb-8">
            Cada pieza está creada con la intención de ofrecerte una pausa, una
            nueva perspectiva o una herramienta útil que te acompañe en tu
            camino hacia una vida más plena y alineada con tus valores.
          </p>
        </div>
      </div>

      {/* Nueva sección para el generador de reflexiones con LLM */}
      <div className="reflection-generator mt-20 p-8 [border-color:var(--color-verde-menta-suave)] rounded-xl shadow-md text-center max-w-2xl mx-auto">
        <h3 className="[color:var(--color-gris-carbon)] text-2xl md:text-3xl mb-6">
          Genera tu ✨ Reflexión del Día ✨
        </h3>
        <div
          id="generatedReflection"
          className={`min-h-[80px] p-4 border [border-color:var(--color-verde-menta-suave)] rounded-lg [background-color:var(--color-beige-lino)] italic [color:var(--color-gris-carbon)] flex items-center justify-center text-center text-lg transition-all duration-300 ${
            isLoading ? "loading" : ""
          }`}
        >
          {generatedReflection}
        </div>
        <div className="flex justify-center w-full">
          <OutlinedButton
            onClick={generateReflection}
            disabled={isLoading}
            className="mt-3"
          >
            {isLoading ? "Generando..." : "Generar Reflexión"}
          </OutlinedButton>
        </div>
      </div>
    </section>
  );
}

export default ReflectionsSection;

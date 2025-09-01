// src/sections/ContactPage.jsx

import OutlinedButton from "../components/OutLinedButton";

function ContactPage() {
  return (
    <section
      id="contacto"
      className="[background-color:var(--color-beige-lino)] py-24 text-center min-h-[calc(100vh-160px)] flex items-center justify-center"
    >
      <div className="container mx-auto px-4">
        <h2 className="[color:var(--color-gris-carbon)] text-4xl md:text-5xl mb-4">
          Hablemos. Crea tu{" "}
          <span className="[color:var(--color-rosa-pastel)]">Historia</span>.
        </h2>
        <p className="max-w-3xl mx-auto text-lg md:text-xl mb-16">
          Estoy aquí para escucharte y ayudarte a dar el siguiente paso en tu
          camino.
        </p>
        <div className="contact-form-container max-w-2xl mx-auto [background-color:var(--color-blanco)] p-12 rounded-xl shadow-xl text-left">
          <form action="#" method="POST">
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block [color:var(--color-gris-carbon)] font-semibold text-lg mb-2"
              >
                Nombre Completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Tu nombre y apellido"
                required
                className="w-full p-3 border [border-color:var(--color-borde-claro)] rounded-md [font-family:var(--font-montserrat)] text-lg focus:[border-color:var(--color-rosa-pastel)] focus:ring-2 focus:ring-[var(--color-rosa-pastel)] focus:ring-opacity-50 outline-none transition-all duration-300"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block [color:var(--color-gris-carbon)] font-semibold text-lg mb-2"
              >
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="tu.email@ejemplo.com"
                required
                className="w-full p-3 border [border-color:var(--color-borde-claro)] rounded-md [font-family:var(--font-montserrat)] text-lg focus:[border-color:var(--color-rosa-pastel)] focus:ring-2 focus:ring-[var(--color-rosa-pastel)] focus:ring-opacity-50 outline-none transition-all duration-300"
              />
            </div>
            <div className="mb-8">
              <label
                htmlFor="message"
                className="block [color:var(--color-gris-carbon)] font-semibold text-lg mb-2"
              >
                Tu Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Cuéntame sobre tus inquietudes o lo que buscas..."
                required
                className="w-full p-3 border [border-color:var(--color-borde-claro)] rounded-md [font-family:var(--font-montserrat)] text-lg min-h-[150px] resize-y focus:[border-color:var(--color-rosa-pastel)] focus:ring-2 focus:ring-[var(--color-rosa-pastel)] focus:ring-opacity-50 outline-none transition-all duration-300"
              ></textarea>
            </div>
            <div className="flex items-center justify-center">
              <OutlinedButton className="w-full mt-2 py-1" type="submit">
                Enviar Mensaje
              </OutlinedButton>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;

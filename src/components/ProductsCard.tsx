import { useState } from "react";
import OutlinedButton from "./OutLinedButton";
import SubscriberModal from "./SuscriptorModal";
import { type Session } from "@supabase/supabase-js";

// Configuración de Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Verifica que las variables de entorno existan
if (!supabaseUrl || !supabaseKey) {
  console.error(
    "Supabase URL o Key no están configuradas en las variables de entorno."
  );
}

// Define las props para el componente CardProducto
interface CardProductoProps {
  imagen: string;
  titulo: string;
  descripcion: string;
  precio: string;
  urlDescarga: string; // urlDescarga ahora es el nombre del archivo en Supabase Storage
  boton: string;
}

const ProductsCard = ({
  imagen,
  titulo,
  descripcion,
  precio,
  urlDescarga, // Esta variable ahora se usará como el nombre del archivo
  boton,
}: CardProductoProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setDownloadError(null);
  };

  // Función que se llama después de una suscripción exitosa
  const handleDownload = async (session: Session) => {
    setIsDownloading(true);
    setDownloadError(null);

    try {
      // LLAMADA A LA EDGE FUNCTION: El paso crucial de seguridad.
      // -----------------------------------------------------------
      // Aquí nos conectamos directamente a tu función desplegada en Supabase.
      // Asegúrate de que "create-signed-url" es el nombre de tu Edge Function.
      const response = await fetch(
        `${supabaseUrl}/functions/v1/create-signed-url`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Incluimos el access_token para autenticar la llamada.
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ filePath: urlDescarga }), // Le pasamos el nombre del archivo.
        }
      );

      if (!response.ok) {
        // Manejamos cualquier error que la función pueda devolver.
        const errorData = await response.json();
        throw new Error(errorData.error || `Error: ${response.status}`);
      }

      // Obtenemos la URL firmada de la respuesta de la Edge Function.
      const { signedUrl } = await response.json();

      if (!signedUrl) {
        throw new Error("La función no devolvió una URL firmada.");
      }

      // INICIAMOS LA DESCARGA CON LA URL FIRMADA
      // ----------------------------------------
      const link = document.createElement("a");
      link.href = signedUrl;
      link.download = urlDescarga.replace(/ /g, "_") + ".pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error: any) {
      console.error("Error al generar la URL firmada:", error.message);
      setDownloadError(
        "Hubo un error al preparar la descarga. Por favor, inténtalo de nuevo."
      );
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-[320px] w-full max-w-[300px] [background-color:var(--color-blanco)] rounded-2xl shadow-md hover:shadow-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300">
      <img
        src={imagen}
        alt={titulo}
        className="w-full h-32 object-cover border-b [border-color:var(--color-beige-lino)]"
      />
      <div className="p-5">
        <h4 className="[color:var(--color-gris-carbon)] text-lg font-bold mb-2">
          {titulo}
        </h4>
        <p className="[color:var(--color-gris-texto-suave)] !text-sm mb-3">
          {descripcion}
        </p>
        <p className="[color:var(--color-verde-menta-suave)] font-bold text-base mb-4">
          {precio}
        </p>
        <OutlinedButton
          className="mt-2 w-full"
          onClick={handleOpenModal}
          disabled={isDownloading}
        >
          {isDownloading ? "Preparando..." : boton}
        </OutlinedButton>
      </div>
      {isModalOpen && (
        <SubscriberModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubscriptionSuccess={handleDownload}
        />
      )}
      {downloadError && (
        <div className="text-red-500 text-center mt-2 px-4">
          {downloadError}
        </div>
      )}
    </div>
  );
};

export default ProductsCard;

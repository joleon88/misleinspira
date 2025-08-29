import { useState, useEffect } from "react";
import OutlinedButton from "./OutLinedButton";
import SubscriberModal from "./SuscriptorModal";
import { type Session } from "@supabase/supabase-js";

interface CardProductoProps {
  imagen: string;
  titulo: string;
  descripcion: string;
  precio: string;
  urlDescarga: string;
  productoId: number;
  esGratis: boolean;
  boton: string;
}

const ProductsCard = ({
  imagen,
  titulo,
  descripcion,
  precio,
  urlDescarga,
  productoId,
  esGratis,
  boton,
}: CardProductoProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setDownloadError(null);
  };

  // 🔹 Listener para descarga automática tras magic link
  useEffect(() => {
    const listener = (event: CustomEvent) => {
      const { filePath, session } = event.detail;
      if (filePath === urlDescarga && session) {
        handleDownload(session);
      }
    };
    window.addEventListener("trigger-download", listener as EventListener);

    return () =>
      window.removeEventListener("trigger-download", listener as EventListener);
  }, [urlDescarga]);

  const handleDownload = async (session: Session) => {
    setIsDownloading(true);
    setDownloadError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-signed-url`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ filePath: urlDescarga, productoId, esGratis }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error: ${response.status}`);
      }

      const { signedUrl } = await response.json();
      if (!signedUrl) throw new Error("No se generó URL firmada");

      const link = document.createElement("a");
      link.href = signedUrl;
      link.download = urlDescarga.replace(/ /g, "_") + ".pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error: any) {
      console.error("Error al descargar:", error.message);
      setDownloadError("No se pudo descargar el archivo. Intenta de nuevo.");
    } finally {
      setIsDownloading(false);
      handleCloseModal();
    }
  };

  return (
    <div className="min-h-[320px] w-full max-w-[300px] bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300">
      <img
        src={imagen}
        alt={titulo}
        className="w-full h-32 object-cover border-b border-beige-lino"
      />
      <div className="p-5">
        <h4 className="text-lg font-bold mb-2">{titulo}</h4>
        <p className="text-sm mb-3">{descripcion}</p>
        <p className="font-bold text-base mb-4">{precio}</p>
        <OutlinedButton
          className="w-full"
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

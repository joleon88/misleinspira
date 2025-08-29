import { useEffect, useState } from "react";
import OutlinedButton from "./OutLinedButton";
import SubscriberModal from "./SuscriptorModal";
import { type Session } from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

interface CardProductoProps {
  imagen: string;
  titulo: string;
  descripcion: string;
  precio: string;
  urlDescarga: string;
  boton: string;
}

const ProductsCard = ({
  imagen,
  titulo,
  descripcion,
  precio,
  urlDescarga,
  boton,
}: CardProductoProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  useEffect(() => {
    const listener = (e: any) => {
      handleDownload(e.detail.session, e.detail.filePath);
    };
    window.addEventListener("trigger-download", listener);
    return () => window.removeEventListener("trigger-download", listener);
  }, []);

  const handleOpenModal = async () => {
    const { data } = await supabase.auth.getSession();
    if (data?.session) {
      // Usuario ya autenticado → descarga directa
      handleDownload(data.session, urlDescarga);
    } else {
      // Guardar archivo pendiente y abrir modal
      localStorage.setItem("pendingDownload", urlDescarga);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setDownloadError(null);
  };

  const handleDownload = async (session: Session, filePath = urlDescarga) => {
    setIsDownloading(true);
    setDownloadError(null);
    try {
      const response = await fetch(
        `${supabaseUrl}/functions/v1/create-signed-url`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ filePath }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error: ${response.status}`);
      }

      const { signedUrl } = await response.json();
      if (!signedUrl)
        throw new Error("La función no devolvió una URL firmada.");

      const link = document.createElement("a");
      link.href = signedUrl;
      link.download = filePath.replace(/ /g, "_") + ".pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error: any) {
      setDownloadError(
        "Hubo un error al preparar la descarga. Inténtalo de nuevo."
      );
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-[320px] w-full max-w-[300px] bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300">
      <img
        src={imagen}
        alt={titulo}
        className="w-full h-32 object-cover border-b"
      />
      <div className="p-5">
        <h4 className="text-lg font-bold mb-2">{titulo}</h4>
        <p className="text-sm mb-3">{descripcion}</p>
        <p className="font-bold text-base mb-4">{precio}</p>
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
          onSubscriptionSuccess={(session) => handleDownload(session)}
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

import { useState } from "react";

import SubscriberModal from "./SuscriptorModal";
import { type Session } from "@supabase/supabase-js";
import OutlinedButton from "./OutLinedButton";
import { downloadFile } from "../util/DownloadUtility";

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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setDownloadError(null);
  };

  /**
   * Maneja el flujo de descarga después de una suscripción o inicio de sesión exitosos.
   * Llama a la función de utilidad para manejar la lógica de la Edge Function.
   */
  const handleDownload = async (session: Session) => {
    setIsDownloading(true);
    setDownloadError(null);

    try {
      // Llama a la función de utilidad para gestionar la descarga
      await downloadFile(urlDescarga, session, productoId, esGratis);
    } catch (error: any) {
      setDownloadError(error.message);
    } finally {
      setIsDownloading(false);
      handleCloseModal();
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
      {downloadError && (
        <div className="text-red-500 text-center mt-2 px-4">
          {downloadError}
        </div>
      )}
      {isModalOpen && (
        <SubscriberModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubscriptionSuccess={handleDownload}
          productId={productoId}
        />
      )}
    </div>
  );
};

export default ProductsCard;

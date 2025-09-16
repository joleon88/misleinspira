import { useState } from "react";

import SubscriberModal from "./SuscriptorModal";

import OutlinedButton from "./OutLinedButton";

import PayCheckOut from "./PayCheckOut";

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
  productoId,
  esGratis,
  boton,
}: CardProductoProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPayOpen, setIsPayOpen] = useState(false);

  console.log("Renderizando ProductsCard - isModalOpen:", isModalOpen);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleOpenPay = () => {
    setIsPayOpen(true);
  };

  const handleCloseModal = (fromForm: boolean) => {
    if (fromForm) setIsModalOpen(false);
  };

  const handleClosePay = () => {
    setIsPayOpen(false);
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
          {precio.toLocaleUpperCase().includes("GRATIS")
            ? precio
            : `$${precio} USD`}
        </p>
        <OutlinedButton
          className="mt-2 w-full"
          onClick={esGratis ? handleOpenModal : handleOpenPay}
          disabled={isModalOpen || isPayOpen}
        >
          {isModalOpen || isPayOpen ? "Preparando..." : boton}
        </OutlinedButton>
      </div>

      {isModalOpen && (
        <SubscriberModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          productId={productoId}
        />
      )}
      {isPayOpen && (
        <PayCheckOut
          onClose={handleClosePay}
          precio={precio}
          productId={productoId}
        />
      )}
    </div>
  );
};

export default ProductsCard;

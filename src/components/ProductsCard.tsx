import { useState } from "react";
import OutlinedButton from "./OutLinedButton";
import SubscriberModal from "./SuscriptorModal";

// Define las props para el componente CardProducto
interface CardProductoProps {
  imagen: string;
  titulo: string;
  descripcion: string;
  precio: string;
  urlDescarga: string; // Cambiamos el nombre de `enlace` a `urlDescarga` para mayor claridad
  boton: string;
}

export const CardProducto = ({
  imagen,
  titulo,
  descripcion,
  precio,
  urlDescarga,
  boton,
}: CardProductoProps) => {
  // Estado para controlar si el modal está abierto o cerrado
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para abrir el modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Función que se llama después de una suscripción exitosa
  // Aquí va la lógica para iniciar la descarga del archivo
  const handleDownload = () => {
    // Aquí puedes usar la URL de descarga para iniciar el proceso
    const link = document.createElement("a");
    link.href = urlDescarga;
    link.download = titulo.replace(/ /g, "_") + ".pdf"; // Nombre de archivo sugerido
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    handleCloseModal(); // Cerramos el modal después de iniciar la descarga
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
        <p className="[color:var(--color-gris-texto-suave)] text-sm mb-3">
          {descripcion}
        </p>
        <p className="[color:var(--color-verde-menta-suave)] font-bold text-base mb-4">
          {precio}
        </p>

        {/* El botón ahora abre el modal en lugar de descargar directamente */}
        <OutlinedButton className="mt-2 w-full" onClick={handleOpenModal}>
          {boton}
        </OutlinedButton>
      </div>

      {/* El modal se renderiza condicionalmente si isModalOpen es true */}
      {isModalOpen && (
        <SubscriberModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubscriptionSuccess={handleDownload} // Pasamos la función de descarga como callback
        />
      )}
    </div>
  );
};

export default CardProducto;

import OutlinedButton from "./OutLinedButton";

interface CardProductoProps {
  imagen: string;
  titulo: string;
  descripcion: string;
  precio: string;
  enlace: string;
  boton: string;
}

export const CardProducto = ({
  imagen,
  titulo,
  descripcion,
  precio,
  enlace,
  boton,
}: CardProductoProps) => {
  const generateURL = (enlace: string) => {
    console.log(enlace);
  };
  return (
    <div className="min-h-[320px] w-full max-w-[300px] [background-color:var(--color-blanco)] rounded-2xl shadow-md hover:shadow-xl overflow-hidden text-center transform hover:-translate-y-2 transition-all duration-300">
      <img
        src={imagen}
        alt={titulo}
        className="w-full h-32 object-cover border-b [border-color:var(--color-beige-lino)]"
      />
      <div className="p-5">
        <h4 className="[color:var(--color-gris-carbon)] text-lg font-bold text-center mb-2">
          {titulo}
        </h4>
        <p className="[color:var(--color-gris-texto-suave)] text-sm mb-3">
          {descripcion}
        </p>
        <p className="[color:var(--color-verde-menta-suave)] font-bold text-base mb-4">
          {precio}
        </p>
        <OutlinedButton
          className="mt-2 py-1"
          onClick={() => generateURL(enlace)}
        >
          {boton}
        </OutlinedButton>
      </div>
    </div>
  );
};

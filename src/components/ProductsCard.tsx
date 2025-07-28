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
  return (
    <div className="min-h-[320px] w-full max-w-[280px] [background-color:var(--color-blanco)] rounded-2xl shadow-md hover:shadow-xl overflow-hidden text-center transform hover:-translate-y-2 transition-all duration-300">
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
        <button className="inline-block mt-3 px-8 py-1 [background-color:var(--color-rosa-pastel)] [color:var(--color-blanco)] [font-family:var(--font-poppins)] font-bold text-lg rounded-lg shadow-lg hover:[background-color:var(--color-hover-rosa)] transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
          onClick: {enlace}
          {boton}
        </button>
      </div>
    </div>
  );
};

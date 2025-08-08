import { CardProducto } from "./ProductsCard";

interface Producto {
  imagen: string;
  titulo: string;
  descripcion: string;
  precio: string;
  urlDescarga: string;
  boton: string;
}

interface CategoriaProductosProps {
  titulo: string;
  productos: Producto[];
}

export const CategoriaProductos = ({
  titulo,
  productos,
}: CategoriaProductosProps) => {
  return (
    <section className="w-full px-5 mb-24">
      <h3 className="text-center text-xl sm:text-2xl md:text-3xl [color:var(--color-gris-carbon)] font-bold mb-10">
        {titulo}
      </h3>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-10 place-items-center">
        {productos.map((producto, index) => (
          <CardProducto key={index} {...producto} />
        ))}
      </div>
    </section>
  );
};

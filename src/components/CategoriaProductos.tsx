import ProductsCard from "./ProductsCard";

interface Producto {
  es_gratis: boolean;
  id: number;
  titulo: string;
  descripcion: string;
  precio: string;
  boton_texto_tipo: string;
  url_descarga_file: string;
  categoria?: string;
  imagen_url: string;
  creado_en?: string;
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
        {productos.map((producto) => (
          <ProductsCard
            key={producto.id}
            imagen={producto.imagen_url}
            titulo={producto.titulo}
            descripcion={producto.descripcion}
            precio={producto.precio}
            urlDescarga={producto.url_descarga_file}
            productoId={producto.id}
            esGratis={producto.es_gratis}
            boton={producto.boton_texto_tipo}
          />
        ))}
      </div>
    </section>
  );
};

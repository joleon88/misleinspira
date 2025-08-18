import { CategoriaProductos } from "../components/CategoriaProductos";
import { CardProducto } from "../components/ProductsCard"; // Asegúrate de que el import sea correcto

import bienestarLaboral from "../assets/bienestarLaboral.jpg";
import checklistContenido from "../assets/checklistContenido.png";
import guiadeNicho from "../assets/guiadeNicho.png";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// === CONFIGURACIÓN DE SUPABASE ===
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Produts {
  id: number;
  titulo: string;
  descripcion: string;
  precio: string;
  boton_texto_tipo: string;
  url_descarga_file: string;
  categoria: string;
  imagen_url: string;
}

function ProductsSection() {
  const [productos, setProductos] = useState<Produts[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Llama a la tabla 'misleinspira_products'
        const { data, error } = await supabase
          .from("misleinspira_products")
          .select("*")
          .order("creado_en", { ascending: false });

        if (error) {
          throw error;
        }

        if (data) {
          console.log("Productos cargados:", data);
          setProductos(data as Produts[]);
        }
      } catch (err: any) {
        console.error("Error fetching products:", err.message);
        setError(
          "No se pudieron cargar los productos. Por favor, inténtalo de nuevo."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section id="productos" className="container mx-auto py-24 px-4">
      <div className="text-center mb-16">
        <h2 className="[color:var(--color-gris-carbon)] text-4xl md:text-5xl mb-4">
          Nuestras{" "}
          <span className="[color:var(--color-rosa-pastel)]">Soluciones</span>{" "}
          para Ti
        </h2>
        <p className="max-w-3xl mx-auto text-lg md:text-xl">
          Herramientas y recursos diseñadas para potenciar tu marca personal y
          tu bienestar.
        </p>
      </div>

      {error && <div className="text-red-500 text-center">{error}</div>}
      {loading && (
        <div className="flex items-center justify-center p-8 text-center bg-gray-50 rounded-2xl">
          <p className="text-lg font-semibold">Cargando productos...</p>
        </div>
      )}

      {/* Bloque de productos destacados iniciales */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-10 place-items-center">
        {/* Aquí puedes mapear los productos si tienes datos */}

        {productos
          .filter((p) => p.categoria === "principal")
          .map((producto) => (
            <CardProducto
              key={producto.id}
              titulo={producto.titulo}
              descripcion={producto.descripcion}
              precio={
                producto.precio.toLocaleUpperCase().includes("GRATIS")
                  ? producto.precio
                  : `$${producto.precio} USD`
              }
              imagen={producto.imagen_url}
              boton={producto.boton_texto_tipo}
              urlDescarga={producto.url_descarga_file}
            />
          ))}
      </div>

      {/* NUEVA SECCIÓN */}
      <div className="mt-24">
        {/* Gratuitos */}
        <CategoriaProductos
          titulo="Gratuitos para Empezar"
          productos={[
            {
              titulo: "Guía Rápida de Nicho",
              descripcion: "Descubre tu audiencia ideal.",
              precio: "¡Gratis!",
              imagen: guiadeNicho,
              boton: "Descargar",
              urlDescarga: "URL_DE_DESCARGA_PARA_GUIA_NICHO", // Aquí va el enlace
            },
            {
              titulo: "Checklist de Contenido",
              descripcion: "Planifica tu estrategia de contenido.",
              precio: "¡Gratis!",
              imagen: checklistContenido,
              boton: "Descargar",
              urlDescarga: "URL_DE_DESCARGA_PARA_CHECKLIST", // Aquí va el enlace
            },
          ]}
        />

        {/* Premium */}
        <CategoriaProductos
          titulo="Premium para Impulsar"
          productos={[
            {
              titulo: "Ebook 50 Prompts",
              descripcion:
                "Los 50 prompts que te llevarán hacer más productivo en menor tiempo.",
              precio: "$19.99",
              imagen:
                "https://images.unsplash.com/photo-1521405924368-64c5b84bec60?ixlib=rb-4.0.3&auto=format&fit=crop&w=250&h=125&q=80",
              boton: "Comprar",
              urlDescarga: "",
            },
            {
              titulo: "Guía SEO Avanzada",
              descripcion:
                "Tu sitio web estará en los primeros lugares de las búsquedas en Google.",
              precio: "$34.99",
              imagen:
                "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=250&h=125&q=80",
              boton: "Comprar",
              urlDescarga: "",
            },
            {
              titulo: "Taller Bienestar",
              descripcion:
                "Siente el preceso como en casa. Haz que tu vida sea mas cómoda y duradera.",
              precio: "$49.99",
              imagen: bienestarLaboral, // en este caos no se pasa como un objeto
              boton: "Comprar",
              urlDescarga: "",
            },
          ]}
        />
        {/* Academia */}
        <CategoriaProductos
          titulo="Academia Digital"
          productos={[
            {
              titulo: "Academia Digital DWA",
              descripcion:
                "Cursos y Mentorías Online. Domina el marketing digital y escala tu negocio. Lo tienes todo aquí, aprovechalo.",
              precio: "$83.99 USD",
              imagen:
                "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=250&h=125&q=80",
              boton: "Más Información",
              urlDescarga: "",
            },
          ]}
        />
        {/* Ofertas */}
        <CategoriaProductos
          titulo="Ofertas Especiales"
          productos={[
            {
              titulo: "Combo Ebook + Taller",
              descripcion: "Paga uno y lleva dos. Uno el complemento del otro.",
              precio: "$59.99 USD",
              imagen:
                "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=250&h=125&q=80",
              boton: "Comprar Combo",
              urlDescarga: "",
            },
          ]}
        />
      </div>
    </section>
  );
}

export default ProductsSection;

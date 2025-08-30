import { CategoriaProductos } from "../components/CategoriaProductos";
import ProductsCard from "../components/ProductsCard";
import bienestarLaboral from "../assets/bienestarLaboral.jpg";
import checklistContenido from "../assets/checklistContenido.png";
import guiadeNicho from "../assets/guiadeNicho.png";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useLocation } from "react-router-dom";
import { downloadFile } from "../util/DownloadUtility";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Produts {
  esGratis: boolean;
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
  const location = useLocation();

  const findProductById = (id: number) => {
    return productos.find((p) => p.id === id);
  };

  // 👉 Detectar redirección y manejar la descarga con reintentos
  useEffect(() => {
    const handleRedirectAndDownload = async () => {
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();
      if (sessionError) {
        console.error("Error recuperando sesión:", sessionError.message);
        return;
      }
      const session = sessionData?.session;

      const searchParams = new URLSearchParams(location.search);
      const productIdStr = searchParams.get("product_id");

      if (session && productIdStr) {
        const productId = parseInt(productIdStr, 10);
        if (isNaN(productId)) return;

        console.log(
          "Usuario verificado tras redirección, buscando producto ID:",
          productId
        );

        if (productos.length > 0) {
          const product = findProductById(productId);
          if (product) {
            const maxRetries = 3;
            for (let i = 0; i < maxRetries; i++) {
              try {
                await downloadFile(
                  product.url_descarga_file,
                  session,
                  product.id,
                  product.esGratis
                );
                // Si la descarga es exitosa, salimos del bucle y limpiamos la URL
                history.replaceState(null, "", location.pathname);
                break;
              } catch (err: any) {
                console.error(`Intento de descarga ${i + 1} fallido:`, err);
                // 💡 CAMBIO: Ahora buscamos el mensaje específico de tu función de utilidad
                if (
                  err.message.includes("Hubo un error al descargar el archivo")
                ) {
                  if (i < maxRetries - 1) {
                    console.log("Esperando para reintentar...");
                    await new Promise((resolve) => setTimeout(resolve, 2000)); // Esperar 2 segundos
                  } else {
                    console.error("Máximo de reintentos alcanzado.");
                    break;
                  }
                } else {
                  // Si no es un error de permisos, no reintentamos y salimos
                  console.error("Error inesperado, cancelando reintentos.");
                  break;
                }
              }
            }
          } else {
            console.error("Producto no encontrado para el ID:", productId);
          }
        }
      }
    };

    handleRedirectAndDownload();
  }, [location.search, productos]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("misleinspira_products")
          .select("*")
          .order("creado_en", { ascending: false });

        if (error) {
          throw error;
        }

        if (data) {
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

      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-10 place-items-center">
        {productos
          .filter((p) => p.categoria === "principal")
          .map((producto) => (
            <ProductsCard
              key={producto.id}
              productoId={producto.id}
              esGratis={producto.esGratis}
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

      {/* Secciones adicionales */}
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
              urlDescarga: "URL_DE_DESCARGA_PARA_GUIA_NICHO",
              esGratis: true,
              productoId: 11111515,
            },
            {
              titulo: "Checklist de Contenido",
              descripcion: "Planifica tu estrategia de contenido.",
              precio: "¡Gratis!",
              imagen: checklistContenido,
              boton: "Descargar",
              urlDescarga: "URL_DE_DESCARGA_PARA_CHECKLIST",
              esGratis: true,
              productoId: 11111133331515,
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
              esGratis: false,
              productoId: 111111515151515,
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
              esGratis: false,
              productoId: 11122222151515,
            },
            {
              titulo: "Taller Bienestar",
              descripcion:
                "Siente el proceso como en casa. Haz que tu vida sea más cómoda y duradera.",
              precio: "$49.99",
              imagen: bienestarLaboral,
              boton: "Comprar",
              urlDescarga: "",
              esGratis: false,
              productoId: 1111115515,
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
                "Cursos y Mentorías Online. Domina el marketing digital y escala tu negocio. Lo tienes todo aquí, aprovéchalo.",
              precio: "$83.99 USD",
              imagen:
                "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=250&h=125&q=80",
              boton: "Más Información",
              urlDescarga: "",
              esGratis: false,
              productoId: 111116651515,
            },
          ]}
        />

        {/* Ofertas */}
        <CategoriaProductos
          titulo="Ofertas Especiales"
          productos={[
            {
              titulo: "Combo Ebook + Taller",
              descripcion: "Paga uno y lleva dos. Uno es complemento del otro.",
              precio: "$59.99 USD",
              imagen:
                "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=250&h=125&q=80",
              boton: "Comprar Combo",
              urlDescarga: "",
              esGratis: false,
              productoId: 111117751515,
            },
          ]}
        />
      </div>
    </section>
  );
}

export default ProductsSection;

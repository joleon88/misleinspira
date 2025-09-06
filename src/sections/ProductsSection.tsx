import { CategoriaProductos } from "../components/CategoriaProductos";
import ProductsCard from "../components/ProductsCard";
import bienestarLaboral from "../assets/bienestarLaboral.jpg";
import checklistContenido from "../assets/checklistContenido.png";
import guiadeNicho from "../assets/guiadeNicho.png";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useLocation, useNavigate } from "react-router-dom";
import { downloadFile } from "../util/DownloadUtility";
import toast, { Toaster } from "react-hot-toast";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Product {
  es_gratis: boolean;
  id: number;
  titulo: string;
  descripcion: string;
  precio: string;
  boton_texto_tipo: string;
  url_descarga_file: string;
  categoria: string;
  imagen_url: string;
  creado_en?: string; // Asegúrate del nombre real de tu columna de fecha
}

function ProductsSection() {
  const [productos, setProductos] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthReady, setIsAuthReady] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // 1) Esperar a que Supabase inicialice la sesión (una sola vez)
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (
        event === "SIGNED_IN" ||
        event === "SIGNED_OUT" ||
        event === "INITIAL_SESSION"
      ) {
        setIsAuthReady(true);
      }
    });
    return () => {
      sub.subscription?.unsubscribe();
    };
  }, []);

  // Utilidad para cargar productos
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("misleinspira_products")
        .select("*")
        // OJO: cambia "creado_en" por tu columna real (p. ej. "created_at")
        .order("creado_en", { ascending: false });

      if (error) throw error;
      setProductos((data ?? []) as Product[]);
    } catch (err) {
      console.error("Error fetching products:", err);
      toast.error(
        "No se pudieron cargar los productos. Por favor, inténtalo de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  // 2) Manejo de descarga por query param + carga de productos
  useEffect(() => {
    if (!isAuthReady) return;

    const run = async () => {
      const searchParams = new URLSearchParams(location.search);
      const productIdStr = searchParams.get("product_id");

      // Si no hay product_id => solo cargar productos
      if (!productIdStr) {
        await fetchProducts();
        return;
      }

      const productId = parseInt(productIdStr, 10);
      if (Number.isNaN(productId)) {
        // Limpia URL y carga productos de todas formas
        navigate(location.pathname, { replace: true });
        await fetchProducts();
        return;
      }

      // Guard anti-doble descarga (sobrevive a remontajes de StrictMode)
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const guardKey = `downloaded_${productId}_${session?.user?.id ?? "anon"}`;
      if (sessionStorage.getItem(guardKey)) {
        // Ya descargado en este ciclo -> limpiar URL y cargar productos
        navigate(location.pathname, { replace: true });
        await fetchProducts();
        return;
      }

      setLoading(true);
      try {
        if (!session) {
          // Si por alguna razón no hay sesión aquí, no intentes descargar
          throw new Error("No hay sesión activa para realizar la descarga.");
        }

        // Actualizar estado del usuario
        const resp = await fetch(
          `${
            import.meta.env.VITE_SUPABASE_URL
          }/functions/v1/update-user-suscrito`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.access_token}`,
            },
            body: JSON.stringify({ email: session.user.email }),
          }
        );
        if (!resp.ok) {
          throw new Error(
            "Error al actualizar estado de verificación del usuario."
          );
        }

        // Obtener el producto
        const { data: product, error: productError } = await supabase
          .from("misleinspira_products")
          .select("*")
          .eq("id", productId)
          .single();

        if (productError || !product) {
          throw new Error("Producto no encontrado.");
        }

        // Descargar
        await downloadFile(
          product.url_descarga_file,
          session,
          product.id,
          product.es_gratis
        );

        // Marca de una sola vez
        sessionStorage.setItem(guardKey, "1");

        toast.success("¡Tu descarga ha comenzado con éxito!");
      } catch (err) {
        console.error("Error en la descarga o actualización del usuario:", err);
        toast.error(
          "Hubo un error al descargar el archivo. Por favor, inténtalo de nuevo."
        );
      } finally {
        // Limpia el query param *avisando* a React Router y luego carga productos
        navigate(location.pathname, { replace: true });
        await fetchProducts();
      }
    };

    run();
    // Dependo de isAuthReady y de location.search (cambios reales vía navigate)
  }, [isAuthReady, location.pathname, location.search]); // incluimos pathname por seguridad

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

      {loading && (
        <div className="flex items-center justify-center p-8 text-center bg-gray-50 rounded-2xl">
          <p className="text-lg font-semibold">Cargando productos...</p>
        </div>
      )}

      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-10 place-items-center">
        {productos
          .filter((p) => p.categoria === "principal") // Verifica que en tu DB exista "principal"
          .map((producto) => (
            <ProductsCard
              key={producto.id}
              productoId={producto.id}
              esGratis={producto.es_gratis}
              titulo={producto.titulo}
              descripcion={producto.descripcion}
              precio={producto.precio}
              imagen={producto.imagen_url}
              boton={producto.boton_texto_tipo}
              urlDescarga={producto.url_descarga_file}
            />
          ))}
      </div>

      {/* Secciones adicionales (estáticas) */}
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

      <Toaster
        position="bottom-right"
        toastOptions={{
          removeDelay: 1000,
          style: { background: "#f5efe6", color: "#5a5a5a" },
          success: {
            duration: 3000,
            removeDelay: 1000,
            iconTheme: { primary: "green", secondary: "black" },
          },
        }}
      />
    </section>
  );
}

export default ProductsSection;

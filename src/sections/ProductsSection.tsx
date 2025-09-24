import { CategoriaProductos } from "../components/CategoriaProductos";
import ProductsCard from "../components/ProductsCard";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useLocation } from "react-router-dom";
import { type Session } from "@supabase/supabase-js";
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
  creado_en: string;
}

function ProductsSection() {
  const [session, setSession] = useState<Session | null>(null);
  const [productos, setProductos] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthReady, setIsAuthReady] = useState(false);

  const location = useLocation();
  //const navigate = useNavigate();

  // ---- Detectar sesión inicial de Supabase ----
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      if (
        event === "SIGNED_IN" ||
        event === "SIGNED_OUT" ||
        event === "INITIAL_SESSION"
      ) {
        setIsAuthReady(true);
        subscription.unsubscribe();
      }
      if (newSession) {
        setSession(newSession);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // ---- Efecto: Descarga automática ----
  useEffect(() => {
    if (!isAuthReady) return;

    const searchParams = new URLSearchParams(location.search);
    const productIdStr = searchParams.get("product_id");

    if (!productIdStr) return;

    const productId = parseInt(productIdStr, 10);
    if (isNaN(productId)) return;

    const doDownload = async () => {
      try {
        setLoading(true);
        if (!session) return;

        // Obtener producto
        const { data: product, error: productError } = await supabase
          .from("misleinspira_products")
          .select("*")
          .eq("id", productId)
          .single();

        if (productError || !product)
          throw new Error("Producto no encontrado.");

        // Actualizar estado del usuario
        const response = await fetch(
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

        if (!response.ok)
          throw new Error("Error al actualizar estado del usuario.");

        // Iniciar descarga
        await downloadFile(
          product.url_descarga_file,
          session,
          product.id,
          product.es_gratis
        );

        toast.success("¡Tu descarga ha comenzado con éxito!");
      } catch (err) {
        console.error("Error en la descarga automática:", err);
        toast.error("Hubo un error al descargar el archivo.");
      } finally {
        setLoading(false);
        //navigate(location.pathname, { replace: true }); // limpia la URL
      }
    };

    doDownload();
  }, [isAuthReady, session, location.pathname]);

  // ---- Efecto: Carga de productos ----
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("misleinspira_products")
          .select("*")
          .order("creado_en", { ascending: false });

        if (error) throw error;
        if (data) setProductos(data as Product[]);
      } catch (err) {
        console.error("Error fetching products:", err);
        toast.error("No se pudieron cargar los productos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const gratuitos = productos.filter((p) => p.categoria === "gratuitos");
  const premium = productos.filter((p) => p.categoria === "premium");
  const academia = productos.filter((p) => p.categoria === "academia");
  const ofertas = productos.filter((p) => p.categoria === "ofertas");

  return (
    <section id="productos" className="container mx-auto py-24 px-4">
      <div className="text-center mb-16">
        <h2 className="[color:var(--color-gris-carbon)] text-4xl md:text-5xl mb-4">
          Nuestras{" "}
          <span
            className="[color:var(--color-rosa-pastel)]"
            style={{ textShadow: "2px 2px 4px black" }}
          >
            Soluciones
          </span>{" "}
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
          .filter((p) => p.categoria === "principal")
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

      {/* Secciones adicionales */}
      <div className="mt-24">
        {/* Gratuitos */}
        {gratuitos.length > 0 && (
          <CategoriaProductos
            titulo="Gratuitos para Empezar"
            productos={gratuitos}
          />
        )}

        {/* Premium */}
        {premium.length > 0 && (
          <CategoriaProductos
            titulo="Premium para Impulsar"
            productos={premium}
          />
        )}

        {/* Academia */}
        {academia.length > 0 && (
          <CategoriaProductos titulo="Academia Digital" productos={academia} />
        )}

        {/* Ofertas */}
        {ofertas.length > 0 && (
          <CategoriaProductos titulo="Ofertas Especiales" productos={ofertas} />
        )}
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

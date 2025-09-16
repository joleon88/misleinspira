import { createClient, type Session } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function downloadFile(
  path: string,
  session: Session,
  productoId: number,
  esGratis?: boolean
) {
  try {
    if (!session?.access_token) {
      throw new Error("No estás autenticado. Por favor, inicia sesión.");
    }

    // Siempre pasamos por la Edge Function
    const { data, error } = await supabase.functions.invoke(
      "create-signed-url",
      {
        body: {
          filePath: path, // nombre o path del archivo en storage
          productoId, // id del producto
          esGratis, // true / false
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    );

    if (error || !data?.signedUrl) {
      throw new Error(
        error?.message || "No se pudo generar enlace de descarga."
      );
    }

    // Abrir descarga en otra pestaña
    window.open(data.signedUrl, "_blank");
  } catch (err) {
    console.error("Error al descargar:", err);
    throw new Error("Hubo un error al descargar el archivo.");
  }
}

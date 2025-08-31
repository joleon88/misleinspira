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
    // Verificación clave: Asegurarse de que la sesión sea válida
    if (!session || !session.access_token) {
      console.error("Error: No se encontró una sesión de usuario válida.");
      throw new Error(
        "No estás autenticado. Por favor, inicia sesión de nuevo."
      );
    }

    if (esGratis) {
      console.log(`Descargando archivo gratis: ${path}`);
      const { data, error } = await supabase.storage
        .from("content-files")
        .download(path);

      if (error) {
        throw new Error(`Error al descargar el archivo: ${error.message}`);
      }

      const url = URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = url;

      const fileName = path.split("/").pop();
      a.download = fileName ?? "download-file.zip";

      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } else {
      console.log(`Solicitando URL firmada para el producto ID: ${productoId}`);

      const {
        data: { signedUrl },
        error: signedUrlError,
      } = await supabase.functions.invoke("create-signed-url", {
        body: {
          filePath: path,
          productoId,
          esGratis,
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (signedUrlError) {
        throw new Error(
          `Error al obtener la URL firmada: ${signedUrlError.message}`
        );
      }

      console.log("URL firmada obtenida, iniciando descarga:", signedUrl);

      const link = document.createElement("a");
      link.href = signedUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  } catch (err) {
    console.error("Error al descargar:", err);
    throw new Error(
      "Hubo un error al descargar el archivo. Por favor, inténtalo de nuevo."
    );
  }
}

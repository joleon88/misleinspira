import { type Session } from "@supabase/supabase-js";

/**
 * Llama a la Edge Function para generar una URL de descarga firmada
 * y luego inicia la descarga del archivo.
 * @param urlDescarga - La ruta del archivo en el bucket de Supabase Storage.
 * @param session - El objeto de sesión de Supabase del usuario.
 * @param productoId - El ID del producto que se va a descargar.
 * @param esGratis - Un booleano que indica si el producto es gratis.
 * @returns true si la descarga fue exitosa, de lo contrario lanza un error.
 */
export const downloadFile = async (
  urlDescarga: string,
  session: Session,
  productoId: number,
  esGratis: boolean
): Promise<boolean> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-signed-url`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ filePath: urlDescarga, productoId, esGratis }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Error: ${response.status}`);
    }

    const { signedUrl } = await response.json();
    if (!signedUrl) {
      throw new Error("No se generó URL firmada.");
    }

    const link = document.createElement("a");
    link.href = signedUrl;
    // Extrae el nombre del archivo de la URL para la descarga
    link.download = urlDescarga.split("/").pop() || "producto";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log("¡Descarga iniciada exitosamente!");
    return true;
  } catch (error: any) {
    console.error("Error al descargar:", error.message);
    throw new Error(
      "Hubo un error al descargar el archivo. Por favor, inténtalo de nuevo."
    );
  }
};

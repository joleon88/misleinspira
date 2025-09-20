import React, { useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import toast, { Toaster } from "react-hot-toast";
import { Loader2, UploadCloud } from "lucide-react";

// === SUPABASE CONFIGURATION ===
// Make sure these keys are in your environment variables (.env)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Name of the storage bucket for product images
const BUCKET_NAME = "product-images";
const BUCKET_FILE_NAME = "content-files";

// Inferred colors from your website's CSS variables
const colorRosaPastel = "var(--color-rosa-pastel)";
const colorGrisCarbon = "var(--color-gris-carbon)";

/**
 * Component to add new products to the Supabase database.
 * Provides a form with an elegant, two-column layout.
 */
const AddProducts: React.FC = () => {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    precio: "¡Gratis!",
    boton_texto_tipo: "",
    url_descarga_file: "",
    categoria: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const filePdfInputRef = useRef<HTMLInputElement>(null);

  // Handles changes in form input fields
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handles image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  // Handles pdf file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0]);
    }
  };

  // Uploads the image to Supabase Storage
  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) {
      return null;
    }

    const fileName = `${Date.now()}-${imageFile.name.replace(/\s/g, "-")}`;
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, imageFile);

    if (error) {
      console.error("Error uploading image:", error);
      toast.error("Error al subir la imagen. Intenta de nuevo.");
      return null;
    }

    // Returns the public URL of the image
    const { publicUrl } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName).data;

    return publicUrl;
  };

  // Uploads the image to Supabase Storage
  const uploadPdf = async (): Promise<string | null> => {
    if (!pdfFile) {
      return null;
    }

    const fileName = `${pdfFile.name.replace(/\s/g, "-")}`;
    const { error } = await supabase.storage
      .from(BUCKET_FILE_NAME)
      .upload(fileName, pdfFile);

    if (error) {
      console.error("Error uploading producto:", error);
      toast.error("Error al subir el producto digital. Intenta de nuevo.");
      return null;
    }

    return fileName;
  };

  // Handles form submission, uploads image, and saves product data
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = null;
      if (imageFile) {
        imageUrl = await uploadImage();
        if (!imageUrl) {
          setLoading(false);
          return;
        }
      }

      let namePdfUrl = null;
      if (pdfFile) {
        namePdfUrl = await uploadPdf();
        if (!namePdfUrl) {
          setLoading(false);
          return;
        }
      }

      // Prepares data to be inserted into the database
      const productData = {
        ...formData,
        imagen_url: imageUrl,
        url_descarga_file: namePdfUrl,
      };

      const { error } = await supabase
        .from("misleinspira_products") // Make sure this is the correct table name
        .insert([productData]);

      if (error) {
        throw error;
      }

      toast.success("¡Producto agregado con éxito!");
      // Resets the form after a successful submission
      setFormData({
        titulo: "",
        descripcion: "",
        precio: "¡Gratis!",
        boton_texto_tipo: "",
        url_descarga_file: "",
        categoria: "",
      });
      setImageFile(null);
      // Resets the file input field
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setPdfFile(null);
      // Resets the file input field
      if (filePdfInputRef.current) {
        filePdfInputRef.current.value = "";
      }
    } catch (error: any) {
      console.error("Error adding product:", JSON.stringify(error, null, 2));

      toast.error("Error al agregar el producto: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-1">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Main form card */}
      <div className="bg-white p-5 rounded-2xl shadow-xl max-w-2xl w-full transition-all duration-300 transform hover:scale-[1.01]">
        {/* Card Header */}
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold" style={{ color: colorGrisCarbon }}>
            Agregar Nuevo Producto
          </h2>
          <p className="mt-2 text-gray-500">
            Completa los campos para añadir una nueva solución a tu catálogo.
          </p>
        </div>

        {/* Form with a two-column grid layout on medium screens and up */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Field Group 1: Title and Category */}
            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: colorGrisCarbon }}
              >
                Título del Producto
              </label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-rosa-pastel)]"
                style={{ borderColor: "#ddd" }}
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: colorGrisCarbon }}
              >
                Categoría
              </label>
              <select
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-rosa-pastel)]"
                style={{ borderColor: "#ddd" }}
              >
                <option value="" disabled>
                  Selecciona una categoría
                </option>
                <option value="principal">Principal</option>
                <option value="gratuitos">Gratuitos</option>
                <option value="premium">Premium</option>
                <option value="academia">Academia</option>
                <option value="ofertas">Ofertas</option>
              </select>
            </div>

            {/* Field Group 2: Price and Button Text */}
            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: colorGrisCarbon }}
              >
                Precio
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  name="precio"
                  value={formData.precio}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-rosa-pastel)]"
                  style={{ borderColor: "#ddd" }}
                />
                <label
                  className="block text-sm font-medium mb-1"
                  style={{ color: colorGrisCarbon }}
                >
                  Dolar(USD)
                </label>
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: colorGrisCarbon }}
              >
                Texto del Botón de Descarga
              </label>
              <input
                type="text"
                name="boton_texto_tipo"
                value={formData.boton_texto_tipo}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-rosa-pastel)]"
                style={{ borderColor: "#ddd" }}
              />
            </div>
          </div>

          {/* Full-width fields */}
          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: colorGrisCarbon }}
            >
              Descripción
            </label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-rosa-pastel)]"
              style={{ borderColor: "#ddd" }}
            />
          </div>

          {/* Custom styled image input */}
          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: colorGrisCarbon }}
            >
              Imagen del Producto
            </label>
            <label
              htmlFor="image-upload"
              className="w-full flex items-center justify-center p-4 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200"
              style={{
                borderColor: colorRosaPastel,
                backgroundColor: "rgba(255, 182, 193, 0.1)",
              }}
            >
              <input
                id="image-upload"
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                required
                className="hidden"
              />
              <div className="flex flex-col items-center">
                <UploadCloud size={32} style={{ color: colorRosaPastel }} />
                <span
                  className="mt-2 text-sm font-semibold"
                  style={{ color: colorRosaPastel }}
                >
                  {imageFile
                    ? imageFile.name
                    : "Haz clic o arrastra una imagen aquí"}
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  Tamaño máximo: 5MB
                </span>
              </div>
            </label>
          </div>

          {/* Custom styled file input */}
          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: colorGrisCarbon }}
            >
              Seleccione el Producto
            </label>
            <label
              htmlFor="file-upload"
              className="w-full flex items-center justify-center p-4 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200"
              style={{
                borderColor: colorRosaPastel,
                backgroundColor: "rgba(255, 182, 193, 0.1)",
              }}
            >
              <input
                id="file-upload"
                type="file"
                ref={filePdfInputRef}
                onChange={handleFileChange}
                accept="application/pdf"
                required
                className="hidden"
              />
              <div className="flex flex-col items-center">
                <UploadCloud size={32} style={{ color: colorRosaPastel }} />
                <span
                  className="mt-2 text-sm font-semibold"
                  style={{ color: colorRosaPastel }}
                >
                  {pdfFile
                    ? pdfFile.name
                    : "Haz clic o arrastra una archivo(pdf) aquí"}
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  Tamaño máximo: 5MB
                </span>
              </div>
            </label>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center py-3 px-4 rounded-full font-semibold border-2 [border-color:var(--color-verde-menta-suave)] [color:var(--color-gris-carbon)] [background-color:var(--color-rosa-pastel)] [font-family:var(--font-poppins)] font-bold text-lg transition-colors duration-200 shadow-lg transform hover:scale-105"
            style={{
              backgroundColor: colorRosaPastel,
            }}
          >
            {loading && <Loader2 className="animate-spin mr-2" />}
            <span>{loading ? "Guardando..." : "Agregar Producto"}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;

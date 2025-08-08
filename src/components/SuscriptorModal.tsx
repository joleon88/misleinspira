import React, { useState, useEffect } from "react";
import { Mail, User, Phone, CheckCircle, Loader2 } from "lucide-react";
// Importación de Supabase a través de CDN
import { createClient } from "@supabase/supabase-js";
// Importación de react-hot-toast a través de CDN
import toast, { Toaster } from "react-hot-toast";

// === CONFIGURACIÓN DE SUPABASE ===
// Reemplaza estas variables con tus claves reales de Supabase.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Define la interfaz de props para el componente
interface SubscriberModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEmail?: string;
  onSubscriptionSuccess: () => void;
}

// === COMPONENTE PRINCIPAL ===
const SubscriberModal: React.FC<SubscriberModalProps> = ({
  isOpen,
  onClose,
  initialEmail = "",
  onSubscriptionSuccess,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("initial"); // Estados: 'initial', 'loading', 'checking'
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Define los colores de tu tema como un objeto para usarlos fácilmente
  const themeColors = {
    beigeLino: "#f5efe6",
    rosaPastel: "#f8c8dc",
    verdeMentaSuave: "#b7d9c9",
    grisCarbon: "#4a4a4a",
    grisTextoSuave: "#5a5a5a",
    blanco: "#ffffff",
    hoverRosa: "#e6b2c8",
    bordeClaro: "#ddd",
  };

  // useEffect para verificar la suscripción UNA VEZ al abrir el modal, si se proporciona un email inicial
  useEffect(() => {
    if (isOpen && initialEmail) {
      const checkSubscription = async () => {
        setStatus("checking");
        try {
          const { error } = await supabase
            .from("misleinspira_suscriptors")
            .select("email")
            .eq("email", initialEmail)
            .single();

          if (error && error.code !== "PGRST116") {
            // PGRST116 significa "no se encontró la fila"
            throw error;
          }

          if (!error) {
            // El usuario ya existe, mostramos el toast y luego llamamos a la función de éxito
            setIsSubscribed(true);
            toast.success(
              "¡Genial! Ya estás suscrito. Tu descarga comenzará en breve.",
              {
                icon: "�",
                style: {
                  background: themeColors.beigeLino,
                  color: themeColors.grisCarbon,
                },
              }
            );
            // Llamamos a la función onSubscriptionSuccess después del delay
            setTimeout(() => {
              onSubscriptionSuccess();
              onClose();
            }, 5000); // 5 segundos de retraso
          } else {
            // El usuario no existe, permite el formulario
            setIsSubscribed(false);
            setStatus("initial");
          }
        } catch (error: any) {
          console.error("Error al verificar suscripción:", error.message);
          toast.error("Ocurrió un error al verificar. Inténtalo de nuevo.");
          setStatus("initial");
        }
      };
      checkSubscription();
    }
  }, [isOpen, initialEmail, onClose, onSubscriptionSuccess, themeColors]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const { error } = await supabase
        .from("misleinspira_suscriptors")
        .insert([{ name, email, phone }])
        .select();

      if (error) {
        // Verifica si el error es de clave duplicada (código 23505 de PostgreSQL)
        if (error.code === "23505") {
          toast.success("¡Ya estás suscrito! Tu descarga comenzará en breve.", {
            icon: "🎉",
            style: {
              background: themeColors.beigeLino,
              color: themeColors.grisCarbon,
            },
          });
          // Llamamos a la función onSubscriptionSuccess después del delay
          setTimeout(() => {
            onSubscriptionSuccess();
            onClose();
          }, 5000); // 5 segundos de retraso
        } else {
          // Si es otro tipo de error, lo lanza
          throw error;
        }
      } else {
        // Manejo de suscripción exitosa
        setStatus("initial");
        toast.success(
          "¡Gracias por suscribirte! Tu descarga comenzará en breve.",
          {
            icon: "🚀",
            style: {
              background: themeColors.beigeLino,
              color: themeColors.grisCarbon,
            },
          }
        );
        // Llamamos a la función onSubscriptionSuccess después del delay
        setTimeout(() => {
          onSubscriptionSuccess();
          onClose();
        }, 5000); // 5 segundos de retraso
      }
    } catch (error: any) {
      console.error("Error al suscribir:", error.message);
      setStatus("initial");
      // Muestra un mensaje de error genérico si no es un error de clave duplicada
      if (error.code !== "23505") {
        toast.error(
          "Hubo un problema. Por favor, revisa tus datos e inténtalo de nuevo."
        );
      }
    }
  };

  if (!isOpen) return null;

  const renderContent = () => {
    if (status === "checking") {
      return (
        <div
          className="flex flex-col items-center justify-center p-8 text-center"
          style={{ color: themeColors.grisTextoSuave }}
        >
          <Loader2
            className="h-12 w-12 animate-spin mb-4"
            style={{ color: themeColors.verdeMentaSuave }}
          />
          <h2 className="text-xl font-semibold [font-family:var(--font-poppins)]">
            Verificando suscripción...
          </h2>
          <p className="mt-2 text-sm">Esto podría tomar un momento.</p>
        </div>
      );
    }

    if (isSubscribed) {
      return (
        <div
          className="flex flex-col items-center justify-center p-8 text-center"
          style={{ color: themeColors.grisTextoSuave }}
        >
          <CheckCircle
            className="h-12 w-12 mb-4"
            style={{ color: themeColors.rosaPastel }}
          />
          <h2 className="text-xl font-semibold [font-family:var(--font-poppins)]">
            ¡Ya eres parte de nuestra comunidad!
          </h2>
          <p className="mt-2 text-sm">
            Gracias por tu interés. La descarga comenzará en breve.
          </p>
        </div>
      );
    }

    return (
      <form onSubmit={handleSubmit} className="p-8">
        <h2
          className="text-2xl font-bold mb-6 text-center"
          style={{ color: themeColors.grisCarbon }}
        >
          Únete a la comunidad
        </h2>

        {/* Campo de Nombre */}
        <div className="relative mb-4">
          <User
            className="absolute left-3 top-1/2 -translate-y-1/2"
            size={20}
            style={{ color: themeColors.grisTextoSuave }}
          />
          <input
            type="text"
            placeholder="Tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300"
            style={{
              borderColor: themeColors.bordeClaro,
              color: themeColors.grisCarbon,
            }}
          />
        </div>

        {/* Campo de Correo Electrónico (Deshabilitado si se pasó como prop) */}
        <div className="relative mb-4">
          <Mail
            className="absolute left-3 top-1/2 -translate-y-1/2"
            size={20}
            style={{ color: themeColors.grisTextoSuave }}
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            readOnly={initialEmail !== ""}
            className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
              initialEmail !== "" ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
            style={{
              borderColor: themeColors.bordeClaro,
              color: themeColors.grisCarbon,
            }}
          />
        </div>

        {/* Campo de Teléfono */}
        <div className="relative mb-6">
          <Phone
            className="absolute left-3 top-1/2 -translate-y-1/2"
            size={20}
            style={{ color: themeColors.grisTextoSuave }}
          />
          <input
            type="tel"
            placeholder="Número de teléfono (opcional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300"
            style={{
              borderColor: themeColors.bordeClaro,
              color: themeColors.grisCarbon,
            }}
          />
        </div>

        {/* Botón de Enviar */}
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
          style={{
            backgroundColor: themeColors.rosaPastel,
            color: themeColors.blanco,
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = themeColors.hoverRosa)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = themeColors.rosaPastel)
          }
        >
          {status === "loading" && (
            <Loader2 className="animate-spin" size={20} />
          )}
          <span>{status === "loading" ? "Enviando..." : "Suscribirse"}</span>
        </button>
      </form>
    );
  };

  return (
    // Contenedor principal del modal (el fondo oscuro)
    // Se asegura de que el modal cubra toda la pantalla y se centre correctamente
    <div
      className="fixed inset-0 flex items-center justify-center z-[1050] p-4 bg-gray-900/50 animate-fade-in"
      onClick={onClose}
    >
      <Toaster position="bottom-center" reverseOrder={false} />
      {/* Contenedor del contenido del modal (la "tarjeta" blanca) */}
      <div
        className="bg-blanco rounded-3xl shadow-2xl max-w-lg max-h-[90vh] w-full relative transform scale-95 md:scale-100 transition-transform duration-300 overflow-y-auto"
        style={{ backgroundColor: themeColors.blanco }}
        // Se detiene la propagación del evento para que al hacer clic en el modal no se cierre
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón para cerrar el modal */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 transition-colors duration-200 z-10"
          aria-label="Cerrar"
        >
          <svg
            className="w-6 h-6 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        {renderContent()}
      </div>
    </div>
  );
};

export default SubscriberModal;

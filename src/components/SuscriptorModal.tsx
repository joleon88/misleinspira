import React, { useState, useEffect } from "react";
import { Mail, User, Phone, CheckCircle, Loader2 } from "lucide-react";
// Importación de Supabase a través de CDN
import { createClient, type Session } from "@supabase/supabase-js";
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
  onSubscriptionSuccess: (session: Session) => void;
}

// === COMPONENTE PRINCIPAL ===
const SubscriptorModal: React.FC<SubscriberModalProps> = ({
  isOpen,
  onClose,
  initialEmail = "",
  onSubscriptionSuccess,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("initial"); // Estados: 'initial', 'loading', 'checking'
  const [isEmailSent, setIsEmailSent] = useState(false);

  // CORRECTO: El tipo de estado puede ser Session o null.
  const [session, setSession] = useState<Session | null>(null);

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

  // CORRECTO: useEffect para escuchar los cambios de estado de autenticación de Supabase.
  useEffect(() => {
    // Solo activamos el listener si el modal está abierto.
    if (!isOpen) return;

    // Almacenamos el objeto de la suscripción directamente.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      // Cuando el usuario se autentica a través del enlace mágico, la sesión cambia.
      if (event === "SIGNED_IN" && session) {
        setSession(session);
        // Llamamos a la función de éxito y le pasamos la sesión.
        toast.success(
          "¡Autenticación exitosa! La descarga comenzará en breve.",
          {
            icon: "🎉",
            style: {
              background: themeColors.beigeLino,
              color: themeColors.grisCarbon,
            },
          }
        );
        setTimeout(() => {
          onSubscriptionSuccess(session);
          onClose();
        }, 5000);
      }
    });
    // Limpiamos la suscripción cuando el componente se desmonta.
    // Esta es la forma correcta de evitar fugas de memoria.
    return () => subscription.unsubscribe();
  }, [isOpen, onClose, onSubscriptionSuccess, themeColors]);

  // useEffect para verificar la suscripción, ahora usa el email.
  useEffect(() => {
    if (isOpen && initialEmail) {
      const checkSubscription = async () => {
        setStatus("checking");
        try {
          // Usamos signInWithOtp para verificar si el usuario ya existe y enviar un enlace mágico
          const { error } = await supabase.auth.signInWithOtp({
            email: initialEmail,
            options: {
              emailRedirectTo: window.location.origin,
            },
          });

          if (error) {
            throw error;
          }

          // Si no hay error, el email fue enviado,
          // informamos al usuario y esperamos que haga clic en el enlace.
          toast.success(
            "¡Genial! Si ya estás suscrito, revisa tu correo para el enlace de descarga.",
            {
              icon: "📧",
              style: {
                background: themeColors.beigeLino,
                color: themeColors.grisCarbon,
              },
            }
          );
          setStatus("initial"); // Volvemos al estado inicial después de enviar el email.
          setIsEmailSent(true);
        } catch (error: any) {
          console.error("Error al verificar suscripción:", error.message);
          toast.error("Ocurrió un error al verificar. Inténtalo de nuevo.");
          setStatus("initial");
        }
      };
      checkSubscription();
    }
  }, [isOpen, initialEmail, themeColors]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // PRIMERO: Inicia el flujo de autenticación de Supabase.
      // Supabase enviará el correo electrónico.
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) {
        throw error;
      }

      // SOLO DESPUÉS: Si el email se envió correctamente, guarda los datos en tu tabla.
      // Esto es opcional, pero mantiene tu lista de suscriptores con nombre y teléfono.
      const { error: insertError } = await supabase
        .from("misleinspira_suscriptors")
        .upsert([{ name, email, phone }], { onConflict: "email" }); // Usamos upsert para evitar duplicados.

      if (insertError) {
        console.error(
          "Error al guardar en la tabla de suscriptores:",
          insertError.message
        );
      }

      setStatus("initial");
      setIsEmailSent(true);
      toast.success(
        "¡Revisa tu correo! Hemos enviado un enlace de inicio de sesión.",
        {
          icon: "🚀",
          style: {
            background: themeColors.beigeLino,
            color: themeColors.grisCarbon,
          },
        }
      );
    } catch (error: any) {
      console.error("Error al suscribir:", error.message);
      setStatus("initial");
      toast.error(
        "Hubo un problema. Por favor, revisa tus datos e inténtalo de nuevo."
      );
    }
  };

  if (!isOpen) return null;

  const renderContent = () => {
    // Si la sesión ya existe, mostramos el mensaje de éxito directamente
    if (session) {
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
            ¡Autenticación exitosa!
          </h2>
          <p className="mt-2 text-sm">La descarga comenzará en breve.</p>
        </div>
      );
    }

    if (isEmailSent) {
      return (
        <div
          className="flex flex-col items-center justify-center p-8 text-center"
          style={{ color: themeColors.grisTextoSuave }}
        >
          <Mail
            className="h-12 w-12 mb-4"
            style={{ color: themeColors.verdeMentaSuave }}
          />
          <h2 className="text-xl font-semibold [font-family:var(--font-poppins)]">
            Revisa tu correo electrónico
          </h2>
          <p className="mt-2 text-sm">
            Hemos enviado un enlace mágico a **{email}**. Haz clic en él para
            completar tu suscripción.
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

        {/* ... (rest of the form fields are the same) ... */}
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

export default SubscriptorModal;

import React, { useEffect, useState } from "react";
import { createClient, type Session } from "@supabase/supabase-js";
import toast, { Toaster } from "react-hot-toast";
import { Mail, User, Phone, Loader2, CheckCircle } from "lucide-react";
import { createPortal } from "react-dom";
import OutlinedButton from "./OutLinedButton";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

interface SubscriberModalProps {
  isOpen: boolean;
  onClose: (fromForm: boolean) => void;
  initialEmail?: string;
  productId: number;
  cerreModal?: boolean;
}

const SuscriptorModal: React.FC<SubscriberModalProps> = ({
  isOpen,
  onClose,
  initialEmail = "",
  productId,
  cerreModal,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"initial" | "loading">("initial");
  const [session, setSession] = useState<Session | null>(null);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isExistingUser, setIsExistingUser] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      if (newSession) {
        setSession(newSession);
      }
    });

    return () => subscription.unsubscribe();
  }, [isOpen, session]);

  useEffect(() => {
    if (cerreModal && session) {
      console.log("Abrio modal despues de la descarga");
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const redirectUrl = `${window.location.origin}/productos?product_id=${productId}`;

      const { data: existingSubscriber, error: searchError } = await supabase
        .from("misleinspira_suscriptors")
        .select("id")
        .eq("email", email)
        .maybeSingle();

      if (searchError) {
        console.error("Error al buscar suscriptor:", searchError.message);
      }

      const isExisting = existingSubscriber !== null;
      setIsExistingUser(isExisting);

      if (!isExisting) {
        const { error: upsertError } = await supabase
          .from("misleinspira_suscriptors")
          .upsert([{ name, email, phone }], { onConflict: "email" });
        if (upsertError) {
          console.error("Error al guardar suscriptor:", upsertError.message);
        }
      }

      const { error: otpError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectUrl,
        },
      });

      if (otpError) throw otpError;

      if (isExisting) {
        toast.success("Enlace enviado.");
      } else {
        toast.success("¡Te has suscrito!");
      }

      setIsEmailSent(true);
    } catch (err: any) {
      console.error(err);
      toast.error(
        "Hubo un error al enviar el correo. Por favor, intenta de nuevo."
      );
    } finally {
      setStatus("initial");
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[1050] flex items-center justify-center p-4"
      onClick={() => onClose(!isEmailSent)}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <Toaster position="bottom-right" />
      <div
        className="rounded-3xl w-full max-w-lg p-8 relative"
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundColor: "#f5efe6" }}
      >
        <button
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
          aria-label="Cerrar"
          onClick={() => onClose(!isEmailSent)}
        >
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            style={{ color: "#5a5a5a" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {session ? (
          <div className="flex flex-col items-center gap-3 text-center">
            <CheckCircle className="w-10 h-10" style={{ color: "#b7d9c9" }} />
            <h2
              className="text-xl font-semibold"
              style={{ color: "#4a4a4a", fontFamily: "Montserrat, sans-serif" }}
            >
              ¡Autenticación exitosa!
            </h2>
            <p style={{ color: "#5a5a5a", fontFamily: "Poppins, sans-serif" }}>
              La descarga se iniciará en un momento…
            </p>
          </div>
        ) : isEmailSent ? (
          <div className="flex flex-col items-center gap-6 text-center">
            <CheckCircle className="w-16 h-16" style={{ color: "#b7d9c9" }} />
            <h2
              className="text-3xl font-bold"
              style={{ color: "#4a4a4a", fontFamily: "Montserrat, sans-serif" }}
            >
              ¡Revisa tu correo!
            </h2>
            <p
              className="text-lg"
              style={{ color: "#5a5a5a", fontFamily: "Poppins, sans-serif" }}
            >
              {isExistingUser
                ? "Ya eres parte de la comunidad. Te hemos enviado un enlace a "
                : "¡Gracias por unirte a nuestra comunidad! Para completar la suscripción y acceder al producto, por favor, haz clic en el enlace de verificación que te hemos enviado a "}
              <span className="font-semibold" style={{ color: "#f8c8dc" }}>
                {email}
              </span>
              .
            </p>
            <p
              className="text-sm"
              style={{ color: "#5a5a5a", fontFamily: "Poppins, sans-serif" }}
            >
              Si no encuentras el correo, por favor revisa tu carpeta de spam.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2
              className="!text-2xl md:text-3xl font-bold text-center mt-2"
              style={{ color: "#4a4a4a", fontFamily: "Montserrat, sans-serif" }}
            >
              Únete a la comunidad
            </h2>

            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2"
                size={20}
                style={{ color: "#5a5a5a" }}
              />
              <input
                type="text"
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:[border-color:var(--color-rosa-pastel)] focus:ring-[var(--color-rosa-pastel)]"
                style={{
                  borderColor: "#ddd",
                  fontFamily: "Poppins, sans-serif",
                  color: "#4a4a4a",
                }}
              />
            </div>

            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2"
                size={20}
                style={{ color: "#5a5a5a" }}
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                readOnly={initialEmail !== ""}
                className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:[border-color:var(--color-rosa-pastel)] focus:ring-[var(--color-rosa-pastel)] ${
                  initialEmail !== "" ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
                style={{
                  borderColor: "#ddd",
                  fontFamily: "Poppins, sans-serif",
                  color: "#4a4a4a",
                }}
              />
            </div>

            <div className="relative">
              <Phone
                className="absolute left-3 top-1/2 -translate-y-1/2"
                size={20}
                style={{ color: "#5a5a5a" }}
              />
              <input
                type="tel"
                placeholder="Número de teléfono (opcional)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:[border-color:var(--color-rosa-pastel)] focus:ring-[var(--color-rosa-pastel)]"
                style={{
                  borderColor: "#ddd",
                  fontFamily: "Poppins, sans-serif",
                  color: "#4a4a4a",
                }}
              />
            </div>

            <div className="flex items-center justify-center">
              <OutlinedButton
                className="w-full mt-2 py-1"
                type="submit"
                disabled={status === "loading"}
              >
                <span>
                  {status === "loading" ? (
                    <div className="flex item-aline item-centers justify-center gap-2">
                      {" "}
                      <Loader2 className="animate-spin" size={20} />{" "}
                      <span>Enviando...</span>
                    </div>
                  ) : (
                    "Suscribirse"
                  )}
                </span>
              </OutlinedButton>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
};

export default SuscriptorModal;

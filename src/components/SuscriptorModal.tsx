import React, { useEffect, useState } from "react";
import { createClient, type Session } from "@supabase/supabase-js";
import toast, { Toaster } from "react-hot-toast";
import { Mail, User, Phone, Loader2, CheckCircle } from "lucide-react";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

interface SubscriberModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEmail?: string;
  productId: number; // 👉 Nueva propiedad para el ID del producto
  onSubscriptionSuccess: (session: Session) => void;
}

const SuscriptorModal: React.FC<SubscriberModalProps> = ({
  isOpen,
  onClose,
  initialEmail = "",
  productId,
  onSubscriptionSuccess,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"initial" | "loading">("initial");
  const [session, setSession] = useState<Session | null>(null);

  // Escucha el evento de autenticación
  useEffect(() => {
    if (!isOpen) return;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        setSession(session);
        toast.success("¡Autenticación exitosa! Preparando descarga…");

        // 👉 Call the new Edge Function to update the verification status
        try {
          await fetch(
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
        } catch (error) {
          console.error("Error al actualizar estado de verificación:", error);
        }

        onSubscriptionSuccess(session);
        onClose();
      }
    });

    return () => subscription.unsubscribe();
  }, [isOpen, onClose, onSubscriptionSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const redirectUrl = `${window.location.origin}/productos?product_id=${productId}`;

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectUrl,
        },
      });
      if (error) throw error;

      const { error: upsertError } = await supabase
        .from("misleinspira_suscriptors")
        .upsert([{ name, email, phone }], { onConflict: "email" });

      if (upsertError) {
        console.error("Error al guardar suscriptor:", upsertError.message);
      }

      toast.success("Revisa tu correo para verificar tu email");
    } catch (err: any) {
      console.error(err);
      toast.error("No se pudo enviar el correo. Intenta nuevamente.");
    } finally {
      setStatus("initial");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1050] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <Toaster position="bottom-center" />
      <div
        className="bg-white rounded-3xl w-full max-w-lg p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
          aria-label="Cerrar"
          onClick={onClose}
        >
          <svg
            className="w-6 h-6 text-gray-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
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
            <CheckCircle className="w-10 h-10" />
            <h2 className="text-xl font-semibold">¡Autenticación exitosa!</h2>
            <p>La descarga se iniciará en un momento…</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold text-center">
              Únete a la comunidad
            </h2>

            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2"
                size={20}
              />
              <input
                type="text"
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 border rounded-xl"
              />
            </div>

            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2"
                size={20}
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                readOnly={initialEmail !== ""}
                className={`w-full pl-11 pr-4 py-3 border rounded-xl ${
                  initialEmail !== "" ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
              />
            </div>

            <div className="relative">
              <Phone
                className="absolute left-3 top-1/2 -translate-y-1/2"
                size={20}
              />
              <input
                type="tel"
                placeholder="Número de teléfono (opcional)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border rounded-xl"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full font-bold py-3 rounded-full bg-pink-300 text-white flex items-center justify-center gap-2"
            >
              {status === "loading" && (
                <Loader2 className="animate-spin" size={20} />
              )}
              <span>{status === "loading" ? "Enviando…" : "Suscribirse"}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SuscriptorModal;

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import toast, { Toaster } from "react-hot-toast";
import { CheckCircle, Loader2, Mail, Phone, User } from "lucide-react";
import { createPortal } from "react-dom";
import { createClient } from "@supabase/supabase-js";
import OutlinedButton from "./OutLinedButton";
// Reemplaza con tu clave pública de Stripe
// En un entorno profesional, esto se haría con una variable de entorno.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

// Se ha simplificado la interfaz para que solo contenga las props necesarias
interface CheckoutFormProps {
  amount: string;
  productId: number;
  initialEmail?: string;
  setIsEmailSent: (value: boolean) => void;
  setIsExistingUser: (value: boolean) => void;
  onConfirmedEmail: (email: string) => void;
}

// Se ha movido la definición del componente FUERA del componente principal
const CheckoutForm = ({
  amount,
  productId,
  initialEmail = "",
  setIsEmailSent,
  setIsExistingUser,
  onConfirmedEmail,
}: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState("");
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("initial");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    if (!stripe || !elements) {
      toast.error("Stripe aún no está cargado.");
      setStatus("initial");
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setMessage(
        "El campo de la tarjeta no se encontró. Por favor, recarga la página."
      );
      setStatus("initial");
      return;
    }

    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error al obtener el client secret.");
      }
      const { clientSecret } = data;

      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (error) {
        toast.error(`Pago fallido: ${error.message}`);
        console.error("Error de confirmación de pago:", error);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        toast.success("¡Pago exitoso!");
        try {
          console.log("El id del producto es:", productId);
          const redirectUrl = `${window.location.origin}/productos?product_id=${productId}`;

          const { data: existingSubscriber, error: searchError } =
            await supabase
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
              console.error(
                "Error al guardar suscriptor:",
                upsertError.message
              );
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
          onConfirmedEmail(email); // Pasa el correo al componente padre
          setIsEmailSent(true);
        } catch (err: any) {
          console.error(err);
          toast.error(
            "Hubo un error al enviar el correo. Por favor, intenta de nuevo."
          );
        } finally {
          setStatus("initial");
        }
      }
    } catch (err) {
      console.error("Error inesperado:", err);
      toast.error("Ocurrió un error inesperado. Intenta de nuevo.");
    } finally {
      setStatus("initial");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 space-y-4 rounded-3xl shadow-lg w-full max-w-lg mx-auto"
      style={{ backgroundColor: "var(--color-beige-lino)" }}
    >
      <h2
        className="!text-2xl md:text-3xl font-bold text-center mt-2"
        style={{ color: "#4a4a4a", fontFamily: "Montserrat, sans-serif" }}
      >
        Completa tu compra
      </h2>

      {message && (
        <div
          className={`p-3 rounded-md text-center ${
            message.includes("fallido") || message.includes("error")
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {message}
        </div>
      )}

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

      {/* El componente de Stripe maneja el input de la tarjeta de forma segura */}
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "var(--color-gris-carbon)",
              "::placeholder": {
                color: "var(--color-gris-texto-suave)",
              },
            },
            invalid: {
              color: "var(--color-rosa-pastel)",
            },
          },
        }}
        className="p-4 border rounded-xl"
      />

      <OutlinedButton
        className="w-full !mt-4 py-2"
        type="submit"
        disabled={!stripe || status === "loading"}
      >
        {status === "loading" && (
          <Loader2
            className="animate-spin"
            size={20}
            style={{ color: "#4a4a4a" }}
          />
        )}
        {status === "loading" && <Loader2 className="animate-spin" size={20} />}
        <span>{status === "loading" ? "Procesando…" : `Pagar $${amount}`}</span>
      </OutlinedButton>

      <Toaster position="bottom-center" />
    </form>
  );
};

// Se ha simplificado el componente principal
interface PayCheckOutProps {
  onClose: () => void;
  precio: string;
  productId: number;
  initialEmail?: string;
}

function PayCheckOut({
  onClose,
  precio,
  productId,
  initialEmail = "",
}: PayCheckOutProps) {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [confirmedEmail, setConfirmedEmail] = useState("");

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[1050] flex justify-center items-center"
      onClick={onClose}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div
        className="relative z-10 p-0"
        style={{ minWidth: 350, maxWidth: 400, width: "100%" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
          aria-label="Cerrar"
          onClick={onClose}
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
        <Elements stripe={stripePromise}>
          {isEmailSent ? (
            <div className="flex flex-col items-center gap-6 text-center p-8 rounded-3xl shadow-lg bg-white">
              <CheckCircle className="w-16 h-16" style={{ color: "#b7d9c9" }} />
              <h2
                className="text-3xl font-bold"
                style={{
                  color: "#4a4a4a",
                  fontFamily: "Montserrat, sans-serif",
                }}
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
                  {confirmedEmail}
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
            <CheckoutForm
              amount={precio}
              productId={productId}
              initialEmail={initialEmail}
              setIsEmailSent={setIsEmailSent}
              setIsExistingUser={setIsExistingUser}
              onConfirmedEmail={setConfirmedEmail}
            />
          )}
        </Elements>
      </div>
    </div>,
    document.body
  );
}

export default PayCheckOut;

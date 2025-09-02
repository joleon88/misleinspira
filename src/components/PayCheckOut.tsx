// src/components/PayCheckOut.tsx
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import toast, { Toaster } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { createPortal } from "react-dom";
import OutlinedButton from "./OutLinedButton";

// Reemplaza con tu clave pública de Stripe
// En un entorno profesional, esto se haría con una variable de entorno.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface CheckoutFormProps {
  amount: string;
}

interface PayCheckOutProps {
  onClose: () => void;
  precio: string;
}

function PayCheckOut({ onClose, precio }: PayCheckOutProps) {
  const CheckoutForm = ({ amount }: CheckoutFormProps) => {
    const stripe = useStripe();
    const elements = useElements();
    const [status, setStatus] = useState("initial");
    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setStatus("loading");

      // Asegúrate de que Stripe y Elements estén cargados
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
        // Paso 1: Obtener el client_secret de tu servidor.
        // Aquí llamamos a la función serverless de Vercel.
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

        // Paso 2: Usar el client_secret para confirmar el pago en el frontend.
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
          // Aquí puedes realizar acciones adicionales, como actualizar Supabase
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
        // El botón ahora maneja la acción
        className="p-8 space-y-4 rounded-3xl shadow-lg w-full max-w-lg mx-auto"
        style={{ backgroundColor: "var(--color-beige-lino)" }}
      >
        <h2
          className="text-2xl font-bold text-center"
          style={{
            color: "var(--color-gris-carbon)",
            fontFamily: "var(--font-montserrat)",
          }}
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
          className="w-full mt-2 py-1"
          type="submit"
          disabled={!stripe || status === "loading"}
        >
          {status === "loading" && (
            <Loader2 className="animate-spin" size={20} />
          )}
          <span>
            {status === "loading" ? "Procesando…" : `Pagar $${amount}`}
          </span>
        </OutlinedButton>

        <Toaster position="bottom-center" />
      </form>
    );
  };

  // Cerrar con ESC
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
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl font-bold"
          aria-label="Cerrar"
          type="button"
        >
          ×
        </button>
        <Elements stripe={stripePromise}>
          <CheckoutForm amount={precio} />
        </Elements>
      </div>
    </div>,
    document.body
  );
}

export default PayCheckOut;

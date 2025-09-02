// Esta es la función sin servidor que Vercel ejecutará.
// Se ejecutará como un endpoint de API en /api/create-payment-intent.

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  // Configuración de los encabezados CORS para permitir peticiones desde tu frontend
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Manejar la solicitud OPTIONS previa al vuelo (pre-flight)
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // Asegúrate de que el método sea POST
  if (req.method !== "POST") {
    res.status(405).send("Método no permitido. Solo se acepta POST.");
    return;
  }

  // Asegúrate de que el cuerpo de la solicitud sea JSON
  if (!req.body || typeof req.body.amount === "undefined") {
    res.status(400).send("Falta el monto en el cuerpo de la solicitud.");
    return;
  }

  const { amount } = req.body;

  try {
    // Crea un Payment Intent con la cantidad y la moneda especificadas
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe usa centavos, así que multiplicamos por 100
      currency: "usd",
      description: "Pago de prueba (Vercel serverless)",
    });

    // Envía el clientSecret al frontend
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error al crear el Payment Intent:", error.message);
    res.status(500).json({
      message: "Error interno del servidor al crear el Payment Intent.",
      error: error.message,
    });
  }
};

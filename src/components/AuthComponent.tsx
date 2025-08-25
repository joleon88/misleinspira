import { useState, useEffect } from "react";
import {
  createClient,
  type Session,
  type AuthChangeEvent,
} from "@supabase/supabase-js";
import { Toaster, toast } from "react-hot-toast";
import Dashboard from "./Dashboard";

// === SUPABASE CONFIGURATION ===
// Replace with your actual Supabase URL and Anon Key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a single Supabase client for your app
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const colorGrisCarbon = "var(--color-gris-carbon)";

/**
 * Main component for user authentication with Supabase.
 * Handles sign in with email and password.
 */
const AuthComponent: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [session, setSession] = useState<Session | null>(null);

  // Effect to listen for auth state changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        setSession(session);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  /**
   * Handles user sign in with email and password.
   * @param {React.FormEvent} e - The form event.
   */
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      toast.success("¡Inicio de sesión exitoso!");
    } catch (error: any) {
      toast.error(`Error al iniciar sesión: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles user sign out.
   */
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("¡Sesión cerrada!");
    } catch (error: any) {
      toast.error(`Error al cerrar sesión: ${error.message}`);
    }
  };

  // Renders the UI based on the user's authentication state
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      {!session ? (
        // Login Form Wrapper: This div has the centering and spacing styles
        <div className="min-h-screen flex items-start justify-center p-4 mt-6">
          <div className="w-full max-w-sm p-8 bg-white rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
              Login
            </h2>
            <form className="space-y-4" onSubmit={handleSignIn}>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  style={{ color: colorGrisCarbon }}
                >
                  Correo electrónico
                </label>
                <input
                  type="email"
                  placeholder="tu.correo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-rosa-pastel)]"
                  required
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  style={{ color: colorGrisCarbon }}
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-rosa-pastel)]"
                  required
                />
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center py-3 px-4 rounded-full font-semibold border-2 [border-color:var(--color-verde-menta-suave)] [color:var(--color-gris-carbon)] [background-color:var(--color-rosa-pastel)] [font-family:var(--font-poppins)] font-bold text-lg transition-colors duration-200 shadow-lg transform hover:scale-105"
                >
                  {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        // Dashboard Wrapper: This div has the full-screen layout styles only
        <div className="w-full h-screen">
          <Dashboard session={session} handleSignOut={handleSignOut} />
        </div>
      )}
    </>
  );
};

export default AuthComponent;

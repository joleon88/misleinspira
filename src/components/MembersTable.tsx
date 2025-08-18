import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Loader2, Users } from "lucide-react";

// === CONFIGURACIÓN DE SUPABASE ===
// Reemplaza estas variables con tus claves reales de Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Define la interfaz para los datos de un miembro, incluyendo el created_at
interface Member {
  id: number;
  name: string;
  email: string;
  phone: string;
  created_at: string;
}

// === COMPONENTE PRINCIPAL ===
const MembersTable: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Colores de la paleta de MisleInspira
  const themeColors = {
    beigeLino: "#f5efe6",
    rosaPastel: "#f8c8dc",
    verdeMentaSuave: "#b7d9c9",
    grisCarbon: "#4a4a4a",
    grisTextoSuave: "#5a5a5a",
    blanco: "#ffffff",
  };

  // useEffect para cargar los datos cuando el componente se monta
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        // Llama a la tabla 'misleinspira_suscriptors'
        const { data, error } = await supabase
          .from("misleinspira_suscriptors")
          .select("id, name, email, phone, created_at");

        if (error) {
          throw error;
        }

        if (data) {
          setMembers(data as Member[]);
        }
      } catch (err: any) {
        console.error("Error fetching members:", err.message);
        setError(
          "No se pudieron cargar los miembros. Por favor, inténtalo de nuevo."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Renderizado condicional
  if (loading) {
    return (
      <div className="flex items-center justify-center p-2 text-center bg-gray-50 rounded-2xl">
        <Loader2
          className="h-10 w-10 animate-spin mr-3"
          style={{ color: themeColors.rosaPastel }}
        />
        <p
          className="text-lg font-semibold"
          style={{ color: themeColors.grisTextoSuave }}
        >
          Cargando miembros...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="p-8 text-center rounded-2xl"
        style={{ backgroundColor: themeColors.beigeLino }}
      >
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div
        className="p-8 text-center rounded-2xl"
        style={{ backgroundColor: themeColors.beigeLino }}
      >
        <p
          className="text-xl font-semibold"
          style={{ color: themeColors.grisCarbon }}
        >
          Aún no hay miembros suscritos.
        </p>
      </div>
    );
  }

  return (
    <div
      className="p-4 sm:p-8 bg-white rounded-2xl shadow-xl border border-gray-200 w-full overflow-x-auto"
      style={{
        fontFamily: "var(--font-poppins)",
        backgroundColor: themeColors.blanco,
        color: themeColors.grisCarbon,
      }}
    >
      <div className="flex items-center mb-4">
        <Users
          className="h-8 w-8 mr-3"
          style={{ color: themeColors.rosaPastel }}
        />
        <span
          className="text-2xl sm:text-3xl font-bold"
          style={{ color: themeColors.grisCarbon }}
        >
          Usuarios Suscritos
        </span>
      </div>

      <div className="min-w-full overflow-x-auto rounded-xl border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead
            className="text-left"
            style={{ backgroundColor: themeColors.rosaPastel }}
          >
            <tr>
              <th
                scope="col"
                className="px-4 py-3 sm:px-6 text-xs font-medium uppercase tracking-wider"
                style={{ color: themeColors.grisCarbon }}
              >
                <strong>Nombre</strong>
              </th>
              <th
                scope="col"
                className="px-4 py-3 sm:px-6 text-xs font-medium uppercase tracking-wider"
                style={{ color: themeColors.grisCarbon }}
              >
                <strong>Correo Electrónico</strong>
              </th>
              <th
                scope="col"
                className="px-4 py-3 sm:px-6 text-xs font-medium uppercase tracking-wider"
                style={{ color: themeColors.grisCarbon }}
              >
                <strong>Teléfono</strong>
              </th>
              <th
                scope="col"
                className="px-4 py-3 sm:px-6 text-xs font-medium uppercase tracking-wider"
                style={{ color: themeColors.grisCarbon }}
              >
                <strong>Fecha de Suscripción</strong>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {members.map((member) => (
              <tr
                key={member.id}
                className="transition-colors duration-200 hover:bg-gray-50"
              >
                <td
                  className="px-4 py-4 sm:px-6 whitespace-nowrap text-sm font-medium"
                  style={{ color: themeColors.grisCarbon }}
                >
                  {member.name}
                </td>
                <td
                  className="px-4 py-4 sm:px-6 whitespace-nowrap text-sm"
                  style={{ color: themeColors.grisTextoSuave }}
                >
                  {member.email}
                </td>
                <td
                  className="px-4 py-4 sm:px-6 whitespace-nowrap text-sm"
                  style={{ color: themeColors.grisTextoSuave }}
                >
                  {member.phone || "N/A"}
                </td>
                <td
                  className="px-4 py-4 sm:px-6 whitespace-nowrap text-sm"
                  style={{ color: themeColors.grisTextoSuave }}
                >
                  {formatDate(member.created_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MembersTable;

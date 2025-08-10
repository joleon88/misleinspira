import { Home, User } from "lucide-react"; // Iconos de hoja, menú y cerrar de Lucide React
import { useState } from "react";
import MembersTable from "./MembersTable";
import { Link } from "react-router-dom";

function DashBoard() {
  const [user, setUser] = useState(false);

  const handleUserkClick = () => {
    setUser(true);
  };

  return (
    <>
      <div className="grid grid-cols-3 h-screen">
        <div className="col-span-1 bg-[var(--color-beige-lino)] border-r-2 border-[var(--color-verde-menta-suave)] rounded-tr-3xl rounded-br-3xl shadow-xl">
          <div className="flex items-center gap-3 mt-8 mb-8 self-center">
            <nav className="w-full px-6">
              <ul className="flex flex-col items-start space-y-0 text-2xl w-full">
                <span
                  className="[color:var(--color-gris-carbon)] [font-family:var(--font-poppins)] font-bold text-2xl tracking-wide mb-4 hidden sm:block"
                  style={{
                    textShadow: "0 1px 8px var(--color-blanco)",
                  }}
                >
                  Dashboard
                </span>
                <span
                  className="[color:var(--color-gris-carbon)] [font-family:var(--font-poppins)] font-bold text-2xl tracking-wide mb-4 block sm:hidden"
                  style={{
                    textShadow: "0 1px 8px var(--color-blanco)",
                  }}
                >
                  Dash
                </span>
                <li className="w-full">
                  <Link
                    className="flex items-center gap-3 py-3 px-4 w-full rounded-xl [font-family:var(--font-poppins)] font-semibold text-left"
                    to={"/"}
                  >
                    <Home className="h-7 w-7 [color:var(--color-verde-menta-suave)]" />
                    <span className="bg-[var(--color-rosa-pastel)] px-3 py-1 rounded-lg text-[var(--color-gris-carbon)] w-full hidden sm:block">
                      {"Inicio"}
                    </span>
                  </Link>
                  <hr className="border-t border-[var(--color-verde-menta-suave)] my-0" />
                </li>
                <li className="w-full">
                  <button
                    onClick={handleUserkClick}
                    className="flex items-center gap-3 py-3 px-4 w-full rounded-xl [font-family:var(--font-poppins)] font-semibold text-left cursor-pointer"
                  >
                    <User className="h-7 w-7 [color:var(--color-verde-menta-suave)]" />
                    <span className="bg-[var(--color-rosa-pastel)] px-3 py-1 rounded-lg text-[var(--color-gris-carbon)] w-full hidden sm:block">
                      {"Mis Usuarios"}
                    </span>
                  </button>
                  <hr className="border-t border-[var(--color-verde-menta-suave)] my-0" />
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="col-span-2">
          {
            /* Aquí puedes agregar el contenido principal del dashboard */
            user ? (
              <div className="p-6">{<MembersTable />}</div>
            ) : (
              <div className="p-6">
                <h1 className="text-3xl font-bold">
                  Selecciona una opción del menú
                </h1>
                {/* Más contenido aquí */}
              </div>
            )
          }
        </div>
      </div>
    </>
  );
}

export default DashBoard;

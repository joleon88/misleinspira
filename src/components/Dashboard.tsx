import { Home, User, ShoppingBag } from "lucide-react"; // Iconos de hoja, menú y cerrar de Lucide React
import { useState } from "react";
import MembersTable from "./MembersTable";
import { Link } from "react-router-dom";
import AddProducts from "./AddProducts";

function DashBoard() {
  const [user, setUser] = useState(false);
  const [product, setProduct] = useState(false);

  const handleUserkClick = () => {
    setProduct(false);
    setUser(true);
  };

  const handleProductClick = () => {
    setUser(false);
    setProduct(true);
  };

  return (
    <>
      <div className="grid grid-cols-[70px_1fr] md:grid-cols-4 h-screen">
        {/* Menú lateral */}
        <div className="bg-[var(--color-beige-lino)] border-r-2 border-[var(--color-verde-menta-suave)] rounded-tr-3xl rounded-br-3xl shadow-xl overflow-y-auto">
          <div className="flex items-center gap-3 mt-8 mb-8 self-center">
            <nav className="w-full px-2 md:px-6">
              <ul className="flex flex-col items-start space-y-0 text-2xl w-full">
                {/* Texto largo solo en escritorio */}
                <span
                  className="[color:var(--color-gris-carbon)] [font-family:var(--font-poppins)] font-bold text-xl tracking-wide mb-4 hidden md:block"
                  style={{ textShadow: "0 1px 8px var(--color-blanco)" }}
                >
                  Dashboard
                </span>

                {/* Texto corto en móvil */}
                <span
                  className="[color:var(--color-gris-carbon)] [font-family:var(--font-poppins)] font-bold text-xl tracking-wide mb-4 block md:hidden"
                  style={{ textShadow: "0 1px 8px var(--color-blanco)" }}
                >
                  Dash
                </span>

                <li className="w-full">
                  <Link
                    className="flex items-center gap-3 py-3 px-2 md:px-4 w-full rounded-xl [font-family:var(--font-poppins)] font-semibold text-left"
                    to={"/"}
                  >
                    <Home className="h-7 w-7 [color:var(--color-verde-menta-suave)]" />
                    <span className="bg-[var(--color-rosa-pastel)] px-2 md:px-3 py-1 rounded-lg text-[var(--color-gris-carbon)] w-full hidden md:block">
                      {"Inicio"}
                    </span>
                  </Link>
                  <hr className="border-t border-[var(--color-verde-menta-suave)] my-0" />
                </li>

                <li className="w-full">
                  <button
                    onClick={handleUserkClick}
                    className="flex items-center gap-3 py-3 px-2 md:px-4 w-full rounded-xl [font-family:var(--font-poppins)] font-semibold text-left cursor-pointer"
                  >
                    <User className="h-7 w-7 [color:var(--color-verde-menta-suave)]" />
                    <span className="bg-[var(--color-rosa-pastel)] px-2 md:px-3 py-1 rounded-lg text-[var(--color-gris-carbon)] w-full hidden md:block">
                      {"Mis Usuarios"}
                    </span>
                  </button>
                  <hr className="border-t border-[var(--color-verde-menta-suave)] my-0" />
                </li>
                <li className="w-full">
                  <button
                    onClick={handleProductClick}
                    className="flex items-center gap-3 py-3 px-2 md:px-4 w-full rounded-xl [font-family:var(--font-poppins)] font-semibold text-left cursor-pointer"
                  >
                    <ShoppingBag className="h-7 w-7 [color:var(--color-verde-menta-suave)]" />
                    <span className="bg-[var(--color-rosa-pastel)] px-2 md:px-3 py-1 rounded-lg text-[var(--color-gris-carbon)] w-full hidden md:block">
                      {"Add Productos"}
                    </span>
                  </button>
                  <hr className="border-t border-[var(--color-verde-menta-suave)] my-0" />
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="col-span-1 md:col-span-3 overflow-y-auto">
          {/* Si no hay ni user ni product */}
          {!user && !product && (
            <div className="p-6">
              <h1 className="text-3xl font-bold">
                Selecciona una opción del menú
              </h1>
            </div>
          )}

          {/* Si hay user */}
          {user && (
            <div className="p-6">
              <MembersTable />
            </div>
          )}

          {/* Si hay product */}
          {product && (
            <div className="p-6">
              <AddProducts />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default DashBoard;

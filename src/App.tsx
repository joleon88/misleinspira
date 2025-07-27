// src/App.tsx

import { BrowserRouter, Routes, Route } from "react-router-dom"; // Importa componentes de React Router
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import HomeLayout from "./layouts/HomeLayout.tsx"; // Importa el nuevo layout para la página de inicio
import ContactPage from "./sections/ContactPage.tsx";
import ReflectionsSection from "./sections/ReflectionsSection.tsx";
import TestimonialsSection from "./sections/TestimonialsSection.tsx";
import ProductsSection from "./sections/ProductsSection.tsx";
import AboutSection from "./sections/AboutSection.tsx";

function App() {
  return (
    <BrowserRouter>
      {" "}
      {/* Envuelve toda la aplicación con BrowserRouter */}
      <div className="min-h-screen flex flex-col">
        {/* El Header ya no necesita la prop onNavigate, usará <Link> directamente */}
        <Header />

        <main className="flex-grow">
          <Routes>
            {" "}
            {/* Define las rutas de la aplicación */}
            {/* Ruta para la página de inicio. HomeLayout renderizará todas las secciones de la landing. */}
            {/* El path="/" también manejará los hashes como "/#mi-historia" */}
            <Route path="/" element={<HomeLayout />} />
            <Route path="/inicio" element={<HomeLayout />} />
            <Route path="/mi-historia" element={<AboutSection />} />
            <Route path="/reflexiones" element={<ReflectionsSection />} />
            <Route path="/testimonios" element={<TestimonialsSection />} />
            <Route path="/productos" element={<ProductsSection />} />
            {/* Ruta específica para la página de contacto */}
            <Route path="/contacto" element={<ContactPage />} />
            {/* Opcional: Una ruta de fallback para 404 o redirigir a la página de inicio */}
            {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

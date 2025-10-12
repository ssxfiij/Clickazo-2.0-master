import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Componentes
import NavbarClickazo from "./componentes/NavbarClickazo";
import Hero from "./componentes/Hero";
import ProductosDestacados from "./componentes/ProductosDestacados";
import Footer from "./componentes/Footer";

// Páginas
import Login from "./paginas/Login";
import Registro from "./paginas/Registro";
import Contacto from "./paginas/Contacto";
import Favoritos from "./paginas/Favoritos";


function App() {
  const [busqueda, setBusqueda] = useState("");
  const [favoritos, setFavoritos] = useState([]);

  // Cargar favoritos del usuario activo
  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (usuario && usuario.favoritos) {
      setFavoritos(usuario.favoritos);
    }
  }, []);

  // Función para actualizar favoritos cuando el usuario agrega un producto
  const toggleFavorito = (producto) => {
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuario) return alert("❌ Debes iniciar sesión para marcar favoritos.");

    let nuevosFavoritos = [...favoritos];
    const existe = favoritos.find((f) => f.id === producto.id);

    if (existe) {
      // Quitar de favoritos
      nuevosFavoritos = favoritos.filter((f) => f.id !== producto.id);
    } else {
      // Agregar a favoritos
      nuevosFavoritos.push(producto);
    }

    setFavoritos(nuevosFavoritos);

    // Guardar en localStorage
    usuario.favoritos = nuevosFavoritos;
    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

    // Actualizar en lista general de usuarios
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const index = usuarios.findIndex((u) => u.email === usuario.email);
    if (index !== -1) {
      usuarios[index] = usuario;
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }
  };

  return (
    <Router>
      <NavbarClickazo favoritos={favoritos} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero busqueda={busqueda} setBusqueda={setBusqueda} />
              <ProductosDestacados
                busqueda={busqueda}
                toggleFavorito={toggleFavorito}
                favoritos={favoritos}
              />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/favoritos" element={<Favoritos />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

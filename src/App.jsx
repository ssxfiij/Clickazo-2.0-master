import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NavbarClickazo from './componentes/NavbarClickazo'
import Footer from './componentes/Footer'
import Home from './paginas/Home'
import Contacto from './paginas/Contacto'
import Favoritos from './paginas/Favoritos'
import Login from './paginas/Login'
import Registro from './paginas/Registro'

import './App.css'

function App() {
  return (
    <>
      <NavbarClickazo />
      <main className="container my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App

import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";

function Registro() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e) => {
  e.preventDefault();
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const existe = usuarios.find((u) => u.email === email);

  if (existe) {
    setMensaje("❌ Este correo ya está registrado.");
    return;
  }

  const nuevoUsuario = { nombre, email, password };
  usuarios.push(nuevoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  // Inicio de sesión automático
  localStorage.setItem("usuarioActivo", JSON.stringify(nuevoUsuario));
  setMensaje("✅ Registro exitoso. Redirigiendo al inicio...");
  setTimeout(() => {
    window.location.href = "/";
  }, 1000);
};

  return (
    <Container className="py-5" style={{ maxWidth: "400px" }}>
      <h2 className="text-center mb-4">Crear Cuenta</h2>
      {mensaje && <Alert variant="info">{mensaje}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre completo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="correo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Crea una contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="success" type="submit" className="w-100">
          Registrarme
        </Button>
      </Form>
    </Container>
  );
}

export default Registro;

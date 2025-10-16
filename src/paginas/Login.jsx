import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioValido = usuarios.find(
      (u) => u.email === email && u.password === password
    );

    if (usuarioValido) {
      localStorage.setItem("usuarioActivo", JSON.stringify(usuarioValido));
      setError("");
      alert("✅ Inicio de sesión exitoso. Bienvenido " + usuarioValido.nombre);
      window.location.href = "/";
    } else {
      setError("❌ Credenciales incorrectas o usuario no registrado.");
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: "400px" }}>
      <h2 className="text-center mb-4">Iniciar Sesión</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingresa tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Ingresar
        </Button>
      </Form>
    </Container>
  );
}

export default Login;

import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";

function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    mensaje: "",
  });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
    setFormData({ nombre: "", correo: "", mensaje: "" });
  };

  return (
    <Container className="py-5" style={{ maxWidth: "600px" }}>
      <h2 className="text-center mb-4">Contáctanos</h2>

      {enviado && <Alert variant="success">✅ Mensaje enviado con éxito.</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Tu nombre"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            placeholder="correo@ejemplo.com"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mensaje</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            placeholder="Escribe tu mensaje aquí..."
            required
          />
        </Form.Group>

        <Button variant="info" type="submit" className="w-100">
          Enviar mensaje
        </Button>
      </Form>
    </Container>
  );
}

export default Contacto;

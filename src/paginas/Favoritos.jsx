// src/paginas/Favoritos.js
import React, { useEffect, useState } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

function Favoritos() {
  const [usuario, setUsuario] = useState(null);
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (usuarioActivo) {
      setUsuario(usuarioActivo);
      const favoritosUsuario = JSON.parse(localStorage.getItem(`favoritos_${usuarioActivo.email}`)) || [];
      setFavoritos(favoritosUsuario);
    }
  }, []);

  const quitarFavorito = (id) => {
    const nuevosFavoritos = favoritos.filter((p) => p.id !== id);
    setFavoritos(nuevosFavoritos);
    if (usuario) {
      localStorage.setItem(`favoritos_${usuario.email}`, JSON.stringify(nuevosFavoritos));
    }
  };

  if (!usuario) {
    return (
      <Container className="py-5 text-center">
        <h3>❌ Debes iniciar sesión para ver tus favoritos</h3>
        <Button href="/login" variant="info" className="mt-3">Iniciar sesión</Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="mb-4">❤️ Mis Favoritos</h2>
      {favoritos.length === 0 ? (
        <p>No tienes productos favoritos 😔</p>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {favoritos.map((p) => (
            <Col key={p.id}>
              <Card className="h-100">
                <Card.Img variant="top" src={p.img} alt={p.nombre} style={{ height: "200px", objectFit: "cover" }} />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{p.nombre}</Card.Title>
                  <Card.Text>
                    <strong>{p.precio}</strong> <br /> {p.tienda}
                  </Card.Text>
                  <div className="mt-auto">
                    <Button
                      variant="danger"
                      className="w-100 mb-2"
                      onClick={() => quitarFavorito(p.id)}
                    >
                      Quitar de favoritos
                    </Button>
                    <Button
                      variant="info"
                      className="w-100"
                      onClick={() => window.open(p.link, "_blank")}
                    >
                      Ver producto
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Favoritos;



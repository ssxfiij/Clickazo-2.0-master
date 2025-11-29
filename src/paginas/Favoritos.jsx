import React, { useEffect, useState } from "react";
import { Container, Card, Button, Row, Col, Alert, Spinner } from "react-bootstrap";
import { fetchFavorites } from "../services/mercadoLibreApi";

function Favoritos() {
  // Loads favorites from backend based on ids stored locally.
  const [usuario, setUsuario] = useState(null);
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Requests favorite item details from backend.
  const cargarFavoritos = async (ids) => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchFavorites(ids);
      setFavoritos(data);
    } catch (err) {
      setError("No se pudieron cargar los favoritos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    setUsuario(usuarioActivo);
    if (usuarioActivo) {
      const favKey = `favoritos_${usuarioActivo.email}`;
      const guardados = JSON.parse(localStorage.getItem(favKey)) || [];
      const ids = guardados.map((p) => (typeof p === "string" ? p : p.id));
      if (ids.length > 0) {
        cargarFavoritos(ids);
      }
    }
  }, []);

  // Removes a favorite id from storage and state.
  const quitarFavorito = (id) => {
    if (!usuario) return;
    const favKey = `favoritos_${usuario.email}`;
    const guardados = JSON.parse(localStorage.getItem(favKey)) || [];
    const ids = guardados.map((p) => (typeof p === "string" ? p : p.id));
    const actualizados = ids.filter((favId) => favId !== id);
    localStorage.setItem(favKey, JSON.stringify(actualizados));
    setFavoritos((prev) => prev.filter((p) => p.id !== id));
  };

  if (!usuario) {
    return (
      <Container className="py-5 text-center">
        <h3>Debes iniciar sesion para ver tus favoritos</h3>
        <Button href="/login" variant="info" className="mt-3">
          Iniciar sesion
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="mb-4">Mis Favoritos</h2>

      {loading && (
        <div className="text-center my-4">
          <Spinner animation="border" role="status" />
        </div>
      )}

      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}

      {!loading && favoritos.length === 0 && (
        <p>No tienes productos favoritos.</p>
      )}

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {favoritos.map((p) => (
          <Col key={p.id}>
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={p.thumbnail}
                alt={p.title}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{p.title}</Card.Title>
                <Card.Text>
                  <strong>
                    {p.price !== undefined
                      ? `$${Number(p.price).toLocaleString("es-CL")}`
                      : "Sin precio"}
                  </strong>
                  {p.discountPercentage && (
                    <div className="text-success">
                      Descuento: {p.discountPercentage}%
                    </div>
                  )}
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
                    onClick={() => window.open(p.permalink, "_blank")}
                  >
                    Ver producto
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Favoritos;

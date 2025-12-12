import React, { useEffect, useState } from "react";
import { Card, Button, Alert, Spinner } from "react-bootstrap";

function ProductosDestacados({ productos = [], loading, error, titulo }) {
  // Displays search results and lets users toggle favorites.
  const [usuario, setUsuario] = useState(null);
  const [favoritosIds, setFavoritosIds] = useState([]);

  useEffect(() => {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    setUsuario(usuarioActivo);
    if (usuarioActivo) {
      const guardados =
        JSON.parse(localStorage.getItem(`favoritos_${usuarioActivo.email}`)) ||
        [];
      const ids = guardados.map((p) => (typeof p === "string" ? p : p.id));
      setFavoritosIds(ids);
    }
  }, []);

  // Adds or removes a product id from favorites stored in localStorage.
  const toggleFavorito = (producto) => {
    if (!usuario) {
      alert("Debes iniciar sesion para agregar favoritos");
      return;
    }

    const favKey = `favoritos_${usuario.email}`;
    const guardados = JSON.parse(localStorage.getItem(favKey)) || [];
    const ids = guardados.map((p) => (typeof p === "string" ? p : p.id));
    const existe = ids.includes(producto.id);

    const actualizados = existe
      ? ids.filter((id) => id !== producto.id)
      : [...ids, producto.id];

    localStorage.setItem(favKey, JSON.stringify(actualizados));
    setFavoritosIds(actualizados);
  };

  const mostrarProductos = productos || [];

  return (
    <section className="productos-destacados container my-4">
      <h2 className="text-center mb-4">{titulo || "Productos"}</h2>

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

      {!loading && !error && mostrarProductos.length === 0 && (
        <p className="text-center">No hay productos para mostrar.</p>
      )}

      <div className="row">
        {mostrarProductos.map((p) => (
          <div
            className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center"
            key={p.id}
          >
            <Card style={{ width: "18rem" }} className="shadow-sm">
              <div className="position-relative">
                <Card.Img
                  variant="top"
                  src={p.thumbnail}
                  alt={p.title}
                  style={{ height: "220px", objectFit: "cover" }}
                />
                <Button
                  variant="light"
                  className="position-absolute top-0 end-0 m-2 rounded-circle"
                  onClick={() => toggleFavorito(p)}
                >
                  <span
                    style={{
                      color: favoritosIds.includes(p.id) ? "red" : "gray",
                      fontSize: "1.1rem",
                    }}
                  >
                    Fav
                  </span>
                </Button>
              </div>
              <Card.Body>
                <Card.Title>{p.title}</Card.Title>
                <Card.Text>
                  <strong>
                    {p.price !== undefined
                      ? `$${Number(p.price).toLocaleString("es-CL")}`
                      : "Sin precio"}
                  </strong>
                  {p.originalPrice && (
                    <div className="text-muted" style={{ fontSize: "0.9rem" }}>
                      Precio original: ${Number(p.originalPrice).toLocaleString("es-CL")}
                    </div>
                  )}
                  {p.discountPercentage && (
                    <div style={{ color: "#0ea5e9", fontWeight: 600 }}>
                      Descuento: {p.discountPercentage}%
                    </div>
                  )}
                </Card.Text>
                <Button
                  className="btn-vermas w-100 mb-2"
                  onClick={() => window.open(p.permalink, "_blank")}
                >
                  Ver mas
                </Button>
                <Button
                  variant={favoritosIds.includes(p.id) ? "danger" : "outline-secondary"}
                  className="w-100"
                  onClick={() => toggleFavorito(p)}
                >
                  {favoritosIds.includes(p.id) ? "Quitar de favoritos" : "Agregar a favoritos"}
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductosDestacados;

import React from "react";
import { Form, FormControl, Button, Container } from "react-bootstrap";

function Hero({ busqueda, setBusqueda, onBuscar, loading }) {
  // Renders the hero search bar and triggers backend search.
  const handleSubmit = (e) => {
    e.preventDefault();
    onBuscar();
  };

  return (
    <section className="hero py-5 text-center bg-light">
      <Container>
        <h1>Bienvenido a Clickazo</h1>
        <p>Encuentra las mejores ofertas en tus tiendas favoritas</p>

        <Form className="d-flex justify-content-center mt-4" onSubmit={handleSubmit}>
          <FormControl
            type="search"
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            style={{ maxWidth: "400px", marginRight: "10px" }}
          />
          <Button
            type="submit"
            variant="info"
            style={{ backgroundColor: "#0ea5e9", border: "none" }}
            disabled={loading}
          >
            {loading ? "Buscando..." : "Buscar"}
          </Button>
        </Form>
      </Container>
    </section>
  );
}

export default Hero;

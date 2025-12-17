// src/componentes/NavbarClickazo.js
import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav, Dropdown, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function NavbarClickazo() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (usuarioActivo) {
      setUsuario(usuarioActivo);
    }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("usuarioActivo");
    setUsuario(null);
    window.location.href = "/login";
  };

  const irInicio = () => {
    navigate("/", { state: { resetHome: Date.now() } });
  };

  return (
    <Navbar expand="lg" className="navbar" bg="light" variant="light">
      <Container>
        <Navbar.Brand
          role="button"
          onClick={irInicio}
          style={{ cursor: "pointer" }}
        >
          <strong style={{ color: "#0ea5e9" }}>CLICKAZO</strong>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!usuario && (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/registro">Registro</Nav.Link>
              </>
            )}
            {usuario && (
              <Dropdown align="end">
                <Dropdown.Toggle variant="info" id="dropdown-usuario">
                  {usuario.nombre}
                </Dropdown.Toggle>
               <Dropdown.Menu style={{ minWidth: "200px" }}>
                 <div className="px-3 py-2 border-bottom">
                   <strong>{usuario.nombre}</strong>
                     <br />
                     <small>{usuario.email}</small>
                  </div>

                <Dropdown.Item as={Link} to="/favoritos">
                  ❤️ Favoritos
                </Dropdown.Item>

                <Dropdown.Item as={Link} to="/contacto">
                  📬 Contacto
                </Dropdown.Item>
                <Dropdown.Item as={Button} onClick={cerrarSesion} variant="danger" className="w-100 mt-2">
                 Cerrar sesión
               </Dropdown.Item>
               </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarClickazo;

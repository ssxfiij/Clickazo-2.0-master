import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";

function ProductosDestacados() {
  // ✅ Lista de productos base
  const productos = [
    {
      id: 1,
      nombre: "Zapatillas Adidas Grand Court 2.0",
      precio: 54990,
      img: "https://falabella.scene7.com/is/image/Falabella/17082869_1?wid=800&hei=800&qlt=70",
      tienda: "Falabella",
      link: "https://www.falabella.com/falabella-cl/product/17082869/Zapatillas-Adidas-Grand-Court-2.0/17082869",
    },
    {
      id: 2,
      nombre: "Polerón Oversize Paris Woman",
      precio: 19990,
      img: "https://paris.scene7.com/is/image/Cencosud/881726999_00?wid=800&hei=800&qlt=70",
      tienda: "Paris",
      link: "https://www.paris.cl/poleron-oversize-paris-woman-881726999.html",
    },
    {
      id: 3,
      nombre: "Notebook HP 15-FD0009LA i3 8GB",
      precio: 299990,
      img: "https://ripley.scene7.com/is/image/Ripley/2000416407595_2?wid=800&hei=800&qlt=70",
      tienda: "Ripley",
      link: "https://simple.ripley.cl/notebook-hp-15-fd0009la-i3-8gb-256gb-ssd-2000416407595p",
    },
    {
      id: 4,
      nombre: "Zapatillas Vans Old Skool Classic",
      precio: 69990,
      img: "https://falabella.scene7.com/is/image/Falabella/882359688_1?wid=800&hei=800&qlt=70",
      tienda: "Falabella",
      link: "https://www.falabella.com/falabella-cl/product/882359688/Zapatillas-Vans-Old-Skool-Classic/882359688",
    },
    {
      id: 5,
      nombre: "Audífonos Sony WH-1000XM4",
      precio: 249990,
      img: "https://m.media-amazon.com/images/I/61D4Z3yKPAL._AC_SL1500_.jpg",
      tienda: "Sony",
      link: "https://www.sony.com/electronics/headband-headphones/wh-1000xm4",
    },
    {
      id: 6,
      nombre: "Cafetera Nespresso Essenza Mini",
      precio: 99990,
      img: "https://m.media-amazon.com/images/I/61y5Q4qv3RL._AC_SL1500_.jpg",
      tienda: "Nespresso",
      link: "https://www.nespresso.com/essenza-mini",
    },
    {
      id: 7,
      nombre: "iPhone 14 128GB",
      precio: 899990,
      img: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-select-202209-6-1inch-blue?wid=800&hei=800&fmt=jpeg&qlt=80&.v=1662128657776",
      tienda: "Apple Store",
      link: "https://www.apple.com/cl/iphone-14/",
    },
    {
      id: 8,
      nombre: "Smart TV Samsung 55'' 4K",
      precio: 499990,
      img: "https://images.samsung.com/is/image/samsung/p6pim/cl/ue55au8000kxxc/gallery/cl-uhd-au8000-ua55au8000kxzc-530046789?$720_576_PNG$",
      tienda: "Samsung",
      link: "https://www.samsung.com/cl/tvs/uhd-4k/55au8000/",
    },
  ];

  // ✅ Estados
  const [usuario, setUsuario] = useState(null);
  const [productosMostrados, setProductosMostrados] = useState([]);
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    // Recuperar usuario activo
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    setUsuario(usuarioActivo);

    // Recuperar favoritos guardados
    let favoritosIds = [];
    if (usuarioActivo) {
      const favGuardados =
        JSON.parse(localStorage.getItem(`favoritos_${usuarioActivo.email}`)) ||
        [];
      setFavoritos(favGuardados);
      favoritosIds = favGuardados.map((p) => p.id);
    }

    // ✅ Mezclar productos una vez por día o entrada
    const productosOrdenados = [...productos].sort(() => Math.random() - 0.5);

    // Priorizar favoritos
    productosOrdenados.sort(
      (a, b) => favoritosIds.includes(b.id) - favoritosIds.includes(a.id)
    );

    setProductosMostrados(productosOrdenados);
  }, []);

  // ✅ Agregar o quitar de favoritos
  const toggleFavorito = (producto) => {
    if (!usuario) {
      alert("Debes iniciar sesión para agregar favoritos ❤️");
      return;
    }

    const favKey = `favoritos_${usuario.email}`;
    const favGuardados = JSON.parse(localStorage.getItem(favKey)) || [];

    const existe = favGuardados.find((p) => p.id === producto.id);

    let nuevosFavs;
    if (existe) {
      nuevosFavs = favGuardados.filter((p) => p.id !== producto.id);
    } else {
      nuevosFavs = [...favGuardados, producto];
    }

    localStorage.setItem(favKey, JSON.stringify(nuevosFavs));
    setFavoritos(nuevosFavs);
  };

  return (
    <section className="productos-destacados container my-4">
      <h2 className="text-center mb-4">✨ Productos Destacados ✨</h2>
      <div className="row">
        {productosMostrados.map((p) => (
          <div
            className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center"
            key={p.id}
          >
            <Card style={{ width: "18rem" }} className="shadow-sm">
              <div className="position-relative">
                <Card.Img
                  variant="top"
                  src={p.img}
                  alt={p.nombre}
                  style={{ height: "220px", objectFit: "cover" }}
                />
                <Button
                  variant="light"
                  className="position-absolute top-0 end-0 m-2 rounded-circle"
                  onClick={() => toggleFavorito(p)}
                >
                  <span
                    style={{
                      color: favoritos.some((f) => f.id === p.id) ? "red" : "gray",
                      fontSize: "1.4rem",
                    }}
                  >
                    ♥
                  </span>
                </Button>
              </div>
              <Card.Body>
                <Card.Title>{p.nombre}</Card.Title>
                <Card.Text>
                  <strong>${p.precio.toLocaleString()}</strong> <br /> {p.tienda}
                </Card.Text>
                <Button
                  className="btn-vermas w-100"
                  onClick={() => window.open(p.link, "_blank")}
                >
                  Ver más
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

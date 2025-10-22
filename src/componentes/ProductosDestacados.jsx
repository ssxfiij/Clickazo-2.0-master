import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";

function ProductosDestacados() {
  // ✅ Lista de productos base
  const productos = [
    {
      id: 1, 
      nombre: "Zapatillas Adidas Grand Court 2.0",
      precio: 37990,
      img: "https://www.realkicks.cl/cdn/shop/files/p-GW9196-2_5000x.jpg?v=1719330997",
      link: "https://www.realkicks.cl/products/zapatilla-adidas-grand-court-2-0-hombre-negro-gw9196?variant=44656513974434&country=CL&currency=CLP&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&gad_source=1&gad_campaignid=16829146297&gclid=CjwKCAjw3tzHBhBREiwAlMJoUpOllt98E-z_fSEvPf4lqSWTJdjQkgr2WwUf3GuNnDEXgvfzLA_P5BoCF3IQAvD_BwE",
    },
    {
      id: 2,
      nombre: "Polerón con Capucha Sólido Oversize",
      precio: 11490,
      img: "https://cl-cenco-pim-resizer.ecomm.cencosud.com/unsafe/adaptive-fit-in/640x0/filters:quality(75)/prd-cl/product-medias/85812d50-2f5b-41e1-9870-f6cb881234ae/PAPKZI9EAW/PAPKZI9EAW-62/1734643159873-PAPKZI9EAW-62-1.jpg",
      link: "https://www.paris.cl/poleron-con-capucha-solido-oversize-225318.html",
    },
    {
      id: 3,
      nombre: "Notebook HP 15-fc0043la, AMD Ryzen 3, 8 GB",
      precio: 495090,
      img: "https://cl-media.hptiendaenlinea.com/catalog/product/cache/74c1057f7991b4edb2bc7bdaa94de933/a/1/a1ud1la_3imagendeproducto.jpg",
      link: "https://www.hp.com/cl-es/shop/notebook-hp-15-fc0043la-a1ud1la.html",
    },
    {
      id: 4,
      nombre: "Zapatilla Urbana Old Skool Unisex",
      precio: 51990,
      img: "https://cl-dam-resizer.ecomm.cencosud.com/unsafe/adaptive-fit-in/640x0/filters:quality(75)/cl/paris/116799/variant/67dab62eb8a41f393f348060/images/b5900fd8-65ab-4509-9a2d-ca36f7f168b7/116799-0001-001.jpg",
      link: "https://www.paris.cl/zapatilla-urbana-old-skool-unisex-116799019.html?gclsrc=aw.ds&gad_source=1&gad_campaignid=21500792319&gclid=CjwKCAjw3tzHBhBREiwAlMJoUnjXgJlZ-hnrcr-6MyGbe2zxecBCOBvNh-_hm-tinWLTN1yAeDS2CxoCko0QAvD_BwE",
    },
    {
      id: 5,
      nombre: "Audífonos Bluetooth Over Ear Sony WH1000XM4 Negros",
      precio: 199990,
      img: "https://www.abc.cl/dw/image/v2/BCPP_PRD/on/demandware.static/-/Sites-master-catalog/default/dwcff9b998/images/large/23918978.jpg?sw=1200&sh=1200&sm=fit",
      link: "https://www.abc.cl/audifonos-bluetooth-over-ear-sony-wh1000xm4-negros/23918978.html?gad_source=4&gad_campaignid=22377352254&gclid=CjwKCAjw3tzHBhBREiwAlMJoUsS0gW5TdQc1wpi7J28yl7AVLp7GbrWDuVVEETlJMDZe49XMDTPTxxoC30UQAvD_BwE",
    },
    {
      id: 6,
      nombre: "Cafetera de Cápsulas Essenza Mini Roja",
      precio: 99990,
      img: "https://cl-dam-resizer.ecomm.cencosud.com/unsafe/adaptive-fit-in/640x0/filters:quality(75)/paris/565161999/variant/images/bb2fe51f-74a0-42e3-b324-773eec6b74a4/565161999-0000-001.jpg",
      link: "https://www.paris.cl/cafetera-de-capsulas-essenza-mini-roja-565161999.html?gclsrc=aw.ds&gad_source=1&gad_campaignid=16817329133&gclid=CjwKCAjw3tzHBhBREiwAlMJoUnE86MuQHujmZDssd-uwjxMzInV0NpT4ik-7nMeXlCVRVFDHar1OBBoCVZAQAvD_BwE",
    },
    {
      id: 7,
      nombre: "iPhone 14 128GB",
      precio: 489990,
      img: "https://media.falabella.com/falabellaCL/126388746_01/w=800,h=800,fit=pad",
      link: "https://www.falabella.com/falabella-cl/product/126388745/iPhone-14-128GB-Negro-Reacondicionado/126388746?kid=shopp183fc&gclsrc=aw.ds&gad_source=4&gad_campaignid=18788054639&gclid=CjwKCAjw3tzHBhBREiwAlMJoUtYlbLNLDCpeqYbZ4AHbe3rMVGYeQpkQZ-9SAAawrxvDQjkWk7zrRxoCB7YQAvD_BwE",
    },
    {
      id: 8,
      nombre: "SMART TV LG UHD 4K 55”",
      precio: 289990,
      img: "https://rimage.ripley.cl/home.ripley/Attachment/WOP/1/2000406824512/full_image-2000406824512",
      link: "https://simple.ripley.cl/smart-tv-lg-uhd-4k-55-55ua7300psb-2000406824512p?gad_campaignid=18194755656&gad_source=1&gclid=CjwKCAjw3tzHBhBREiwAlMJoUjVVoO3B_eOJp7t0KDOHBwd4DyayXcen-XVaVDXI9qW-LUbyYF53JBoCxOUQAvD_BwE&color_80=negro&s=mdco",
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

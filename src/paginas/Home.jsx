import React from 'react';
import Hero from '../componentes/Hero';
import ProductosDestacados from '../componentes/ProductosDestacados';

function Home() {
  return (
    <>
      <Hero />
      <div className="container my-5">
        <ProductosDestacados />
      </div>
    </>
  );
}

export default Home;

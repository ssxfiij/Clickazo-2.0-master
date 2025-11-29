import React, { useState } from 'react';
import Hero from '../componentes/Hero';
import ProductosDestacados from '../componentes/ProductosDestacados';
import { searchProducts } from '../services/mercadoLibreApi';

function Home() {
  // Handles search state, backend calls, and results for the homepage.
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [ultimoTermino, setUltimoTermino] = useState('');

  // Triggers backend search and updates results state.
  const buscarProductos = async () => {
    if (!busqueda.trim()) {
      setResultados([]);
      setUltimoTermino('');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const data = await searchProducts(busqueda.trim());
      setResultados(data);
      setUltimoTermino(busqueda.trim());
    } catch (err) {
      setError('No se pudieron cargar los productos. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Hero
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        onBuscar={buscarProductos}
        loading={loading}
      />
      <div className="container my-5">
        <ProductosDestacados
          productos={resultados}
          loading={loading}
          error={error}
          titulo={ultimoTermino ? `Resultados para "${ultimoTermino}"` : 'Busca tus productos'}
        />
      </div>
    </>
  );
}

export default Home;

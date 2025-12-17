import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../componentes/Hero';
import ProductosDestacados from '../componentes/ProductosDestacados';
import { searchProducts, fetchHomeProducts } from '../services/fakeStoreApi';

function Home() {
  // Handles search state, backend calls, and results for the homepage.
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [ultimoTermino, setUltimoTermino] = useState('');
  const location = useLocation();

  // Loads initial products for the home page using backend endpoint.
  const cargarHome = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchHomeProducts();
      setResultados(data);
      setUltimoTermino('Ofertas destacadas');
    } catch (err) {
      setError('No se pudieron cargar productos iniciales. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  // Triggers backend search and updates results state.
  const buscarProductos = async () => {
    if (!busqueda.trim()) {
      setError('Ingresa un texto para buscar productos.');
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

  useEffect(() => {
    cargarHome();
  }, []);

  useEffect(() => {
    if (location.state?.resetHome) {
      setBusqueda('');
      setError('');
      cargarHome();
    }
  }, [location.state?.resetHome]);

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

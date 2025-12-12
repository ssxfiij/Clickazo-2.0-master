const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  'http://localhost:8080';

// Calls backend search endpoint to get FakeStore products.
export async function searchProducts(query) {
  const url = `${API_BASE}/api/external/fakestore/search?q=${encodeURIComponent(query)}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('No se pudo buscar productos');
  }
  return response.json();
}

// Calls backend home endpoint to get default products for landing page.
export async function fetchHomeProducts() {
  const url = `${API_BASE}/api/external/fakestore/home`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('No se pudo obtener productos de inicio');
  }
  return response.json();
}

// Calls backend favorites endpoint to get details of favorite items.
export async function fetchFavorites(ids) {
  if (!ids || ids.length === 0) return [];
  const url = `${API_BASE}/api/external/fakestore/favorites?ids=${ids.join(',')}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('No se pudo obtener favoritos');
  }
  return response.json();
}

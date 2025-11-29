const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8081';

// Calls backend search endpoint to get Mercado Libre products.
export async function searchProducts(query) {
  const url = `${API_BASE}/api/external/mercadolibre/search?q=${encodeURIComponent(query)}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('No se pudo buscar productos');
  }
  return response.json();
}

// Calls backend favorites endpoint to get details of favorite items.
export async function fetchFavorites(ids) {
  if (!ids || ids.length === 0) return [];
  const url = `${API_BASE}/api/external/mercadolibre/favorites?ids=${ids.join(',')}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('No se pudo obtener favoritos');
  }
  return response.json();
}

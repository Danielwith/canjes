import axios from "axios";

// Usaremos Fake Store API: https://fakestoreapi.com/
const BASE = "https://fakestoreapi.com";

export async function fetchProducts() {
  const res = await axios.get(`${BASE}/products`);
  return res.data;
}

export async function fetchProductById(id) {
  const res = await axios.get(`${BASE}/products/${id}`);
  return res.data;
}

export default { fetchProducts, fetchProductById };

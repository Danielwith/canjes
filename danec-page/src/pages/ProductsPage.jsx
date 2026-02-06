import { useEffect, useState } from "react";
import { getCatalog } from "../api/productsApi";
import { postUserCartApi } from "../api/userApi";
import ProductCard from "../components/ui/ProductCard";
import ProductModal from "../components/ui/ProductModal";
import FiltersSidebar from "../components/ui/FiltersSidebar";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

import { ButtonNavigateCart } from "../components/ui/buttons/ButtonCart";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { userPoints, refreshSession, cartTotal } = useAuth();
  // console.log('ver puntos', userPoints);

  const totalPoints = userPoints?.Response?.oResponse[0]?.total || 0;
  const effectivePoints = totalPoints - (cartTotal || 0);

  // Filter state
  const [filters, setFilters] = useState({
    search: "",
    categories: [],
    minPrice: "",
    maxPrice: "",
    sort: ""
  });

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getCatalog();
        setProducts(data.Response.oResponse || []);
        // console.log(data.Response.oResponse);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los productos");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Compute available categories and price range from products
  const availableCategories = [...new Set(products.map((p) => p.category))].filter(Boolean);
  const maxProductPrice = Math.max(...products.map(p => p.price), 0);
  const minProductPrice = Math.min(...products.map(p => p.price), 0);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  // Filter and Sort Logic
  const filteredProducts = products.filter((p) => {
    // Search
    if (filters.search) {
      const query = filters.search.toLowerCase();
      if (!p.name.toLowerCase().includes(query)) return false;
    }

    // Categories
    if (filters.categories.length > 0) {
      if (!filters.categories.includes(p.category)) return false;
    }

    // Price
    if (filters.minPrice) {
      if (p.price < parseFloat(filters.minPrice)) return false;
    }
    if (filters.maxPrice) {
      if (p.price > parseFloat(filters.maxPrice)) return false;
    }

    return true;
  }).sort((a, b) => {
    if (filters.sort === "price_asc") {
      return a.price - b.price;
    }
    if (filters.sort === "price_desc") {
      return b.price - a.price;
    }
    return 0;
  });

  const handleAdd = async (product) => {
    // const currentPoints = point || 0; 
    // Usamos effectivePoints para validar lo real disponible
    if (effectivePoints < product.price) {
      toast.error(`No tienes suficientes puntos (${effectivePoints} disponibles) para agregar este producto.`);
      return;
    }

    try {
      await postUserCartApi({ product: product.id, quantity: 1 });
      toast.success("Producto agregado correctamente");
      await refreshSession();
    } catch (error) {
      console.error(error);
      const msg = error?.response?.data?.message || "Error al agregar producto";
      toast.error(msg);
    }
  };

  const handleView = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => setSelectedProduct(null);

  if (loading) return <div className="p-6">Cargando productos...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6 flex gap-4">
      <FiltersSidebar
        filters={filters}
        onChange={handleFilterChange}
        categories={availableCategories}
        priceRange={{ min: minProductPrice, max: maxProductPrice }}
      />

      <div className="flex-1">
        <h2 className="mb-3">Productos</h2>
        <div className="flex gap-3 justify-center items-center">
          <ButtonNavigateCart linkPage="/carrito"
            text="Carrito"
          />
          {
            (effectivePoints !== undefined && effectivePoints !== null) ? (
              <span className="font-bold">Puntos disponibles: {effectivePoints}</span>
            ) : (
              <span className="font-bold">Puntos disponibles: 0</span>
            )
          }

        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-gray-500">No se encontraron productos con estos filtros.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={handleAdd} onView={handleView} />
            ))}
          </div>
        )}
      </div>

      {selectedProduct && <ProductModal product={selectedProduct} onClose={closeModal} />}
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";
import ProductList from "./components/ProductList";
import StatsPanel from "./components/StatsPanel";
import SearchBar from "./components/SearchBar";
import SortSelect from "./components/SortSelect";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const containerRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get("https://dummyjson.com/products?limit=100"),
          axios.get("https://dummyjson.com/products/category-list")
        ]);
        setProducts(productsRes.data.products);
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  let filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCategory === "all" || p.category === selectedCategory)
  );
  const totalProducts = filteredProducts.length;
  const maxProductObj = filteredProducts.reduce((max, p) => (p.price > max.price ? p : max), filteredProducts[0]);
  const minProductObj = filteredProducts.reduce((min, p) => (p.price < min.price ? p : min), filteredProducts[0]);
  const mayor20 = filteredProducts.filter((p) => p.title.length > 20).length;
  const totalPrice = filteredProducts.reduce((sum, p) => sum + p.price, 0).toFixed(2);
  const promedioDescuento = filteredProducts.length > 0
    ? (filteredProducts.reduce((sum, p) => sum + p.discountPercentage, 0) / filteredProducts.length).toFixed(2)
    : 0;
  const maxRatingObj = filteredProducts.reduce((max, p) => (p.rating > max.rating ? p : max), filteredProducts[0]);
  const promedioPrecio = filteredProducts.length
    ? (filteredProducts.reduce((sum, p) => sum + p.price, 0) / filteredProducts.length).toFixed(2)
    : 0;
  const cantidadPorCategoria = selectedCategory === "all"
    ? filteredProducts.length
    : filteredProducts.filter(p => p.category === selectedCategory).length;
  const cantidadStockMayor50 = filteredProducts.filter(p => p.stock > 50).length;
  const cantidadRatingMayor45 = filteredProducts.filter(p => p.rating > 4.5).length;
  const promedioRating = filteredProducts.length
    ? (filteredProducts.reduce((sum, p) => sum + p.rating, 0) / filteredProducts.length).toFixed(2)
    : 0;
  const promedioPrecioCategoriaFiltrada =
    selectedCategory !== "all"
      ? (
        products
          .filter((p) => p.category === selectedCategory)
          .reduce((sum, p) => sum + p.price, 0) /
        products.filter((p) => p.category === selectedCategory).length || 0
      ).toFixed(2)
      : "-";

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    containerRef.current.classList.toggle("dark-mode");
  };

  if (sortOption === "price-asc") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortOption === "price-desc") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortOption === "rating-asc") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.rating - b.rating);
  } else if (sortOption === "rating-desc") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
  }

  return (
    <div ref={containerRef} className={`min-h-screen p-6 transition-colors duration-300 ${darkMode ? "bg-blue-950" : "bg-blue-50"}`}>
      <div className="max-w-7xl mx-auto">
        <h1 className={`text-4xl font-extrabold text-center mb-8 tracking-tight ${darkMode ? "text-blue-200" : "text-blue-800"}`}>
          Listado de Productos
        </h1>
        <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
          <button
            className={`px-4 py-2 rounded-lg font-semibold shadow transition-colors duration-200 ${darkMode ? "bg-blue-800 text-blue-100 hover:bg-blue-700" : "bg-blue-600 text-white hover:bg-blue-700"}`}
            onClick={toggleDarkMode}
          >
            Ver modo {darkMode ? 'Claro' : 'Oscuro'}
          </button>
          <div className="flex gap-2 flex-wrap">
            <SearchBar
              search={search}
              setSearch={setSearch}
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <SortSelect sortOption={sortOption} setSortOption={setSortOption} />
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className={`text-blue-500 animate-pulse text-lg`}>Cargando productos...</p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-2/3 bg-blue-100/60 rounded-2xl p-6 shadow-lg overflow-y-auto max-h-[80vh]">
              <h2 className="text-2xl text-blue-700 font-semibold mb-4 text-left">
                Productos disponibles:
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.length === 0 && (
                  <div className="col-span-full text-center text-blue-400 text-lg">No se encontraron productos</div>
                )}
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="rounded-2xl shadow-xl bg-white border-2 border-blue-300 p-5 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-transform duration-200"
                  >
                    <ProductList product={product} />
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-1/3 bg-white/90 rounded-2xl p-6 shadow-lg flex flex-col gap-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold text-blue-700">Panel de Estadísticas</h2>
                <button
                  className="bg-pink-700 rounded px-4 py-1 text-white font-semibold hover:bg-pink-800 transition"
                  onClick={() => setShow(!show)}
                >
                  {show ? "Ocultar" : "Mostrar"}
                </button>
              </div>
              {show && (
                <StatsPanel
                  filteredProducts={filteredProducts}
                  categories={categories}
                  products={products}
                  total={totalProducts}
                  totalPrice={totalPrice}
                  max={maxProductObj.price}
                  maxName={maxProductObj.title}
                  min={minProductObj.price}
                  minName={minProductObj.title}
                  mayor20={mayor20}
                  promedioDescuento={promedioDescuento}
                  maxRatingTitle={maxRatingObj.title}
                  maxRatingValue={maxRatingObj.rating}
                  promedioPrecio={promedioPrecio}
                  cantidadPorCategoria={cantidadPorCategoria}
                  cantidadStockMayor50={cantidadStockMayor50}
                  cantidadRatingMayor45={cantidadRatingMayor45}
                  promedioPrecioCategoriaFiltrada={promedioPrecioCategoriaFiltrada}
                  promedioRating={promedioRating}
                />
              )}
            </div>
          </div>
        )}
        <p className={`text-center mt-10 text-sm ${darkMode ? "text-blue-300" : "text-blue-400"}`}>
          Tienda ISPC - 2025
        </p>
      </div>
    </div>
  );
}

export default App;
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";
import ProductList from "./components/ProductList"; // Importamos el componente
import StatsPanel from "./components/StatsPanel";
import SearchBar from "./components/SearchBar";


function App() {
  // 1. Estado para almacenar los productos
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para manejar carga
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  //Referencias
  const containerRef = useRef(null);

  // 2. useEffect para hacer la petición al montar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products?limit=100");
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setLoading(false); // Quitamos el estado de carga (éxito o error)
      }
    };

    fetchProducts();
  }, []); // Se ejecuta solo una vez al inicio

    //Filtramos los productos obtenidos de la API
    const filteredProducts = products.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

    //Cantidad de productos en pantalla
    const totalProducts = filteredProducts.length;

    //El precio más caro
    //const maxProduct = Math.max(...filteredProducts.map((p) => p.price));
    const maxProductObj = filteredProducts.reduce((max, p) => (p.price > max.price ? p : max), filteredProducts[0]);
// Ahora puedes acceder a maxProductObj.price y maxProductObj.title
    //El precio más barato
    const minProductObj = filteredProducts.reduce((min, p) => (p.price < min.price ? p : min), filteredProducts[0]);
//mayor a 20 caracteres
    const mayor20 = filteredProducts.filter((p) => p.title.length > 20).length;
// precio total de los productos filtrados
    const totalPrice = filteredProducts.reduce((sum, p) => sum + p.price, 0).toFixed(2);
    const promedioDescuento = filteredProducts.length > 0
  ? (filteredProducts.reduce((sum, p) => sum + p.discountPercentage, 0) / filteredProducts.length).toFixed(2)
  : 0;
// El producto mejor valorado
    const maxRatingObj = filteredProducts.reduce((max, p) => (p.rating > max.rating ? p : max), filteredProducts[0]);
    // Funcion Modo Oscuro
    const toggleDarkMode = ()=>{
      setDarkMode(!darkMode);
          containerRef.current.classList.toggle("dark-mode");
   
    };

  return (
    <div ref={containerRef} className="min-h-screen bg-green-50 p-6">
      {/* Título principal */}
      <h1 className="product-list text-3xl text-gray-800 font-bold text-center mb-8">
        Listado de Productos
      </h1>
       {/* Botón para alternar modo oscuro */}
        <button className="button" onClick={toggleDarkMode}>Ver modo {darkMode ?'Claro': 'Oscuro'}</button>

      {/* Mensaje de carga (si loading es true) */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 animate-pulse">Cargando productos...</p>
        </div>
      ) : (
        // Lista de productos (si hay datos)
        <div className="flex flex-col md:flex-row h-screen w-full">
          <div className="product-list w-full md:w-2/3 bg-gray-100 p-4 overflow-y-auto">
        <div className="mt-6">
          <h2 className="text-2xl text-pink-500 font-semibold mb-4 text-left">
            Productos disponibles:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductList key={product.id} product={product} />
            ))}
          </div>
          </div>
        </div>
          <div className="stats-panel w-full md:w-1/3 bg-white p-4 ">
        <h2 className="text-xl font-bold mb-4">Panel de Estadísticas</h2>
       

        <div className="pt-1">
        <SearchBar search={search} setSearch={setSearch} />
  <button className="bg-pink-700 rounded p-1 pl-3 pr-3
    m-0 text-white" onClick={() => setShow(!show)}>{show ? "Ocultar" : "Mostrar"}</button>
  
  {show && (  <StatsPanel
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
  /> )}
  {filteredProducts.length == 0 && <div>No se encontraron productos</div>}
      </div>  
</div>
        </div>
      )}
       
      {/* Texto adicional */}
      
      <p className="text-center text-gray-400 mt-10 text-sm">
        Tienda ISPC - 2025 
      </p>
    </div>
    
  );
}

export default App;
# Proyecto ABP: Procesamiento de datos con APIs REST

## 👨‍💻 Estudiante:
RAUL MORENO


## 📋 Descripción
Aplicación web interactiva que actúa como explorador de productos, permitiendo visualizar, filtrar, buscar productos y obtener estadísticas a partir de datos de una API externa.

## 🛠️ Tecnologías
- **React** - Interfaz interactiva
- **Tailwind CSS** - Estilos modernos
- **Axios** - Consumo de API
- **DummyJSON** - Fuente de datos de productos
- **Recharts** - Visualizaciones de datos

## 📅 Desarrollo por Semanas

### 🔹 Semana 1 - React + Axios + Búsqueda
**Objetivos:** Consolidar fundamentos de React y consumir API
- ✅ Obtener productos desde `https://dummyjson.com/products?limit=100`
- ✅ Mostrar lista de productos con nombre y precio
- ✅ Implementar input de búsqueda
- ✅ Mostrar mensajes cuando no hay coincidencias
- ✅ Botón para mostrar/ocultar estadísticas
- **Técnicas:** `useState`, `useEffect`, `filter`

### 🔹 Semana 2 - Tailwind + Componentización
**Objetivos:** Estilizar y dividir en componentes reutilizables
- ✅ Configurar Tailwind CSS
- ✅ Crear componentes: `ProductList`, `ProductItem`, `StatsPanel`, `SearchBar`
- ✅ Aplicar estilos responsivos
- ✅ Implementar modo oscuro con `useRef`
- **Técnicas:** Componentización, separación lógica/presentación

### 🔹 Semana 3 - Filtrado Avanzado y Ordenamiento
**Objetivos:** Implementar filtros dinámicos y ordenamientos
- ✅ Filtro por categoría
- ✅ Ordenamiento por precio y rating (ascendente/descendente)
- ✅ Lista desplegable para criterios de ordenamiento
- ✅ Combinación de búsqueda + filtro + ordenamiento
- **Técnicas:** Manipulación de arrays, filtros múltiples

### 🔹 Semana 4 - Estadísticas Detalladas
**Objetivos:** Aplicar procesamiento de datos y estadística básica
- ✅ Precio promedio, máximo y mínimo
- ✅ Cantidad de productos por categoría
- ✅ Productos con stock < 50 y rating > 4.5
- ✅ Precio promedio por categoría
- ✅ Producto más caro y más barato por categoría
- ✅ Promedio de rating general y por categoría
- **Técnicas:** `reduce`, `map`, `filter`, manejo de errores

### 🔹 Semana 5 - Visualizaciones
**Objetivos:** Incluir visualización de datos con gráficos
- ✅ Integrar librería `Recharts`
- ✅ Gráfico de barras: cantidad de productos por categoría
- ✅ Gráfico de líneas: evolución de precios (simulada)
- ✅ Pie chart: proporción de productos según stock
- ✅ Actualización dinámica con filtros
- **Técnicas:** Visualización de datos, gráficos interactivos

### 🔹 Semana 6 - Exportación y Experiencia de Usuario
**Objetivos:** Funciones de exportación y mejora de UX
- ✅ Exportar productos filtrados a JSON, CSV o Excel
- ✅ Implementar paginación o lazy loading
- ✅ Mensajes de éxito/error
- ✅ Optimizar tiempo de carga y jerarquía visual
- **Técnicas:** Exportación de datos, optimización UX

## 🌟 Desafíos Opcionales
- 🔐 Login con Google y filtros preferidos
- ⚖️ Modo comparación entre productos
- ❤️ Sistema de favoritos con `localStorage`
- 💱 Integración con API de cotización de monedas

## 📊 API Utilizada
- **Endpoint**: `https://dummyjson.com/products?limit=100`
- **Datos**: Productos con nombre, precio, categoría, rating, stock

## 🏗️ Estructura del Proyecto
```
src/
├── components/
│   ├── ProductList.js
│   ├── ProductItem.js
│   ├── SearchBar.js
│   ├── StatsPanel.js
│   └── ...
├── utils/
└── App.js
```

## 📋 Evaluación
| Criterio | Puntos |
|----------|--------|
| Funcionamiento general | 20 |
| Componentización y reutilización | 20 |
| Aplicación de filtros y lógica | 20 |
| Estética con Tailwind | 15 |
| Visualización de datos | 15 |
| Exportación de resultados | 10 |
| **Total** | **100** |

## 🔗 Recursos
- [React Docs](https://reactjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Axios](https://axios-http.com/)
- [DummyJSON API](https://dummyjson.com/)
- [Recharts](https://recharts.org/)

## 📦 Scripts Disponibles
```bash
npm start      # Ejecutar en desarrollo
npm run build  # Construir para producción
npm test       # Ejecutar pruebas
```

## 🎯 Condiciones Importantes
- ⚠️ **Desarrollo incremental obligatorio** - Progreso semanal sin romper funcionalidades previas
- 📂 **Repositorio GitHub único** - Todo el desarrollo en un solo repositorio
- 📈 **Historial de commits** - Evidencia del trabajo evolutivo para la defensa final


## 📄 Licencia
Este proyecto es parte de un ABP (Aprendizaje Basado en Proyectos) académico.

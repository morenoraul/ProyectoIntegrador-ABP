import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar,Line, Pie } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const labels = ['Precio Minimo', 'Precio Maximo'];

function StatsPanel(props) {
    // Gráfico de barras: cantidad de productos por categoría
    const barLabels = props.categories || [];
    const barData = {
        labels: barLabels,
        datasets: [
            {
                label: 'Cantidad',
                data: barLabels.map(cat => props.products.filter(p => p.category === cat).length),
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
            },
        ],
    };
    const barOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: { display: true, text: 'Cantidad de productos por categoría' },
        },
        scales: { y: { beginAtZero: true } },
    };
  // Gráfico de líneas: evolución de precios (simulada)
    const lineLabels = props.filteredProducts.slice(0, 10).map((p, idx) => `M${idx + 1}`);
    const lineData = {
        labels: lineLabels,
        datasets: [
            {
                label: 'Precio',
                data: props.filteredProducts.slice(0, 10).map(p => p.price),
                fill: false,
                borderColor: 'rgba(255, 99, 132, 0.7)',
                backgroundColor: 'rgba(255, 99, 132, 0.3)',
                tension: 0.3,
            },
        ],
    };
    const lineOptions = {
        responsive: true,
        plugins: {
            legend: { display: true, position: 'top' },
            title: { display: true, text: 'Evolución de precios (simulada)' },
        },
        scales: { y: { beginAtZero: true } },
    };
    // Gráfico de barras min/max precios (ya existente)
    const data = {
        labels,
        datasets: [
            {
                label: 'Precios',
                data: [props.min, props.max],
                backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(75, 192, 192, 0.5)'],
                borderRadius: 8,
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Precios Min/Max' },
        },
        scales: { y: { beginAtZero: true } },
    };
     // Pie chart: proporción de productos según stock
    const stockRanges = [
        { name: 'Stock ≤ 20', min: 0, max: 20 },
        { name: '21-50', min: 21, max: 50 },
        { name: '51-100', min: 51, max: 100 },
        { name: '> 100', min: 101, max: Infinity }
    ];
    const pieLabels = stockRanges.map(r => r.name);
    const pieValues = stockRanges.map(r =>
        props.filteredProducts.filter(p => p.stock >= r.min && p.stock <= r.max).length
    );
    const pieData = {
        labels: pieLabels,
        datasets: [
            {
                label: 'Stock',
                data: pieValues,
                backgroundColor: [
                    '#0088FE', '#00C49F', '#FFBB28', '#FF8042'
                ],
            },
        ],
    };
    const pieOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Proporción de productos según stock' },
        },
    };


    return (
        <div className="pt-5 text-sm">
           
          
            <p className="mt-4">Cantidad de productos en la categoría: <span className="text-pink-800">{props.cantidadPorCategoria}</span></p>
            <p>Precio Total: <span className="text-pink-800">{props.totalPrice}</span></p>
            <p>Precio Promedio: <span className="text-pink-800">{props.promedioPrecio}</span></p>
            <p>Promedio de rating (categoría filtrada): <span className="text-pink-800">{props.promedioRating}</span></p>
            <p>Producto más caro:  <span className="text-pink-800">{props.maxName} (${props.max})</span></p>
            <p>Producto más Barato:  <span className="text-pink-800">{props.minName} (${props.min})</span></p>
            <p>Producto Título mayor a 20 caracteres: <span className="text-pink-800">{props.mayor20}</span></p>
            <p>Promedio de Descuento: <span className="text-pink-800">{props.promedioDescuento}%</span></p>
            <p>Producto con mejor valoración: <span className="text-pink-800">{props.maxRatingTitle} {props.maxRatingValue}%</span></p>
            <p>Cantidad de productos con stock &gt; 50: <span className="text-pink-800">{props.cantidadStockMayor50}</span></p>
            <p>Cantidad de productos con rating &gt; 4.5: <span className="text-pink-800">{props.cantidadRatingMayor45}</span></p>
            {props.promedioPrecioCategoriaFiltrada && props.promedioPrecioCategoriaFiltrada !== "-" && (
                <p>Precio promedio de la categoría <span className="text-pink-800">${props.promedioPrecioCategoriaFiltrada}</span></p>
            )}
            <h1>Graficos</h1>
              {/* Gráfico de barras: cantidad de productos por categoría */}
            <div className="mt-8">
                <Bar options={barOptions} data={barData} />
            </div>
              {/* Gráfico de líneas: evolución de precios (simulada) */}
            <div className="mt-8">
                <Line options={lineOptions} data={lineData} />
            </div>
            <div className="mt-8 mt-8 max-w-s mx-auto">
                <Pie options={pieOptions} data={pieData} />
            </div>
        </div>
    );
}

export default StatsPanel;
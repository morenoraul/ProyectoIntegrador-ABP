import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar,Line, Pie } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const labels = ['Precio Minimo', 'Precio Maximo'];


// Exportación del componente corregida y paleta de colores azul aplicada a los gráficos

export default function StatsPanel(props) {
    // Gráfico de barras: cantidad de productos por categoría
    const barLabels = props.categories || [];
    const barData = {
        labels: barLabels,
        datasets: [
            {
                label: 'Cantidad',
                data: barLabels.map(cat => props.products.filter(p => p.category === cat).length),
                backgroundColor: 'rgba(30, 64, 175, 0.5)', // azul
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
                borderColor: 'rgba(30, 64, 175, 0.7)', // azul
                backgroundColor: 'rgba(30, 64, 175, 0.3)', // azul claro
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

    // Gráfico de barras min/max precios
    const minMaxLabels = ['Precio Minimo', 'Precio Maximo'];
    const minMaxData = {
        labels: minMaxLabels,
        datasets: [
            {
                label: 'Precios',
                data: [props.min, props.max],
                backgroundColor: ['rgba(30, 64, 175, 0.5)', 'rgba(59, 130, 246, 0.5)'], // azules
                borderRadius: 8,
            },
        ],
    };
    const minMaxOptions = {
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
                    '#1e40af', // azul oscuro
                    '#2563eb', // azul medio
                    '#60a5fa', // azul claro
                    '#93c5fd'  // azul muy claro
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
            <p>Total de Productos: <span className="text-blue-800">{props.total}</span></p>
            <p>Total de Productos con stock &gt; 50: <span className="text-blue-800">{props.totalStockMayor50}</span></p>
            <p>Precio Promedio: <span className="text-blue-800">{props.promedioPrecio}</span></p>
            <p>Precio Maximo: <span className="text-blue-800">${props.max}</span></p>
            <p>Precio Mínimo: <span className="text-blue-800">${props.min}</span></p>
            <p>Promedio de rating general (categoría filtrada): <span className="text-blue-800">{props.promedioRating}</span></p>
            <p>Producto más caro:  <span className="text-blue-800">{props.maxName} (${props.max})</span></p>
            <p>Producto más Barato:  <span className="text-blue-800">{props.minName} (${props.min})</span></p>
            <p>Promedio de Descuento: <span className="text-blue-800">{props.promedioDescuento}%</span></p>
            <p>Producto con mejor valoración: <span className="text-blue-800">{props.maxRatingTitle} {props.maxRatingValue}%</span></p>
            <p>Cantidad de productos en la categoría: <span className="text-blue-800">{props.cantidadPorCategoria}</span></p>
            <p>Cantidad de productos con stock &gt; 50: <span className="text-blue-800">{props.cantidadStockMayor50}</span></p>
            <p>Cantidad de productos con rating &gt; 4.5: <span className="text-blue-800">{props.cantidadRatingMayor45}</span></p>
            {props.promedioPrecioCategoriaFiltrada && props.promedioPrecioCategoriaFiltrada !== "-" && (
                <p>Precio promedio de la categoría{" "}
                    <span className="text-blue-800">${props.promedioPrecioCategoriaFiltrada}</span>
                </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div>
                    <Bar data={barData} options={barOptions} />
                </div>
                <div>
                    <Line data={lineData} options={lineOptions} />
                </div>
                <div>
                    <Bar data={minMaxData} options={minMaxOptions} />
                </div>
                <div>
                    <Pie data={pieData} options={pieOptions} />
                </div>
            </div>
        </div>
    );
}
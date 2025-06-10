function SortSelect({ sortOption, setSortOption}) {
  return (
    <select
      className="bg-green-100 rounded p-1"
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value)}
    >
      <option value="">Ordenar por...</option>
      <option value="rating-desc">Rating: Mayor a Menor</option>
      <option value="rating-asc">Rating: Menor a Mayor</option>
      <option value="price-desc">Precio: Mayor a Menor</option>
      <option value="price-asc">Precio: Menor a Mayor</option>
      <option value="name-asc">Nombre: A-Z</option>
      <option value="name-desc">Nombre: Z-A</option>
      <option value="date-newest">Fecha: Más reciente</option>
      <option value="date-oldest">Fecha: Más antigua</option>
    </select>
  );
}

export default SortSelect;
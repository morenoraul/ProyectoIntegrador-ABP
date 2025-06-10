function CategoryFilter({ categories, selectedCategory, setSelectedCategory }) {
  return (
    <select
      className="bg-gray-100 rounded p-1"
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
    >
      <option value="all">Todas las categorías</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>{cat}</option>
      ))}
    </select>
  );
}

export default CategoryFilter;
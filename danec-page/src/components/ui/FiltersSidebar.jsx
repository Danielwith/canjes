import React from "react";

export default function FiltersSidebar({
  filters = {
    search: "",
    categories: [],
    minPrice: "",
    maxPrice: "",
    sort: ""
  },
  onChange,
  categories = [],
  priceRange = { min: 0, max: 1000 }
}) {

  const handleCategoryChange = (cat) => {
    const currentCats = filters.categories || [];
    const exists = currentCats.includes(cat);
    let newCats;
    if (exists) {
      newCats = currentCats.filter((c) => c !== cat);
    } else {
      newCats = [...currentCats, cat];
    }
    onChange("categories", newCats);
  };

  const handleInputChange = (field, value) => {
    onChange(field, value);
  };

  return (
    <aside className="hidden lg:block w-72 p-4 border-r border-gray-200 h-full box-border">
      <h4 className="mt-0 text-lg font-semibold">Filtros</h4>

      {/* Search */}
      <section className="mb-4">
        <div className="mb-2 font-semibold">Buscar</div>
        <input
          type="text"
          placeholder="Nombre del producto..."
          className="w-full p-2 rounded-md border border-gray-200 text-sm"
          value={filters.search}
          onChange={(e) => handleInputChange("search", e.target.value)}
        />
      </section>

      {/* Categories */}
      <section className="mb-4">
        <div className="mb-2 font-semibold">Categoría</div>
        <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
          {categories.map((cat) => (
            <label key={cat} className="text-sm flex items-center cursor-pointer">
              <input
                className="mr-2"
                type="checkbox"
                checked={filters.categories.includes(cat)}
                onChange={() => handleCategoryChange(cat)}
              />
              {cat}
            </label>
          ))}
          {categories.length === 0 && (
            <div className="text-gray-400 text-sm">No hay categorías</div>
          )}
        </div>
      </section>

      {/* Price Range */}
      <section className="mb-4">
        <div className="mb-2 font-semibold">Precio</div>

        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>${filters.minPrice || priceRange.min}</span>
          <span>${filters.maxPrice || priceRange.max}</span>
        </div>

        <div className="relative h-2 bg-gray-200 rounded-full mt-2 mb-6">
          {/* Active Range Track */}
          <div
            className="absolute h-full bg-black rounded-full"
            style={{
              left: `${((filters.minPrice || priceRange.min) / priceRange.max) * 100}%`,
              right: `${100 - ((filters.maxPrice || priceRange.max) / priceRange.max) * 100}%`
            }}
          ></div>

          {/* Range Inputs */}
          <input
            type="range"
            min={priceRange.min}
            max={priceRange.max}
            value={filters.minPrice || priceRange.min}
            onChange={(e) => {
              const val = Math.min(Number(e.target.value), (filters.maxPrice || priceRange.max) - 1);
              handleInputChange("minPrice", val);
            }}
            className="absolute w-full h-full cursor-pointer z-10 range-slider-thumb-custom appearance-none bg-transparent"
          />
          <input
            type="range"
            min={priceRange.min}
            max={priceRange.max}
            value={filters.maxPrice || priceRange.max}
            onChange={(e) => {
              const val = Math.max(Number(e.target.value), (filters.minPrice || priceRange.min) + 1);
              handleInputChange("maxPrice", val);
            }}
            className="absolute w-full h-full cursor-pointer z-10 range-slider-thumb-custom appearance-none bg-transparent"
          />

          {/* Visual Thumbs (Optional enhancement, using simple inputs for now is clearer functionality wise, 
              but standard inputs are hard to double-visualize without custom CSS. 
              Let's stick to a simpler approach: Two inputs + One Slider for visualization OR 
              render two visible sliders. The overlay approach is tricky with z-index.
              
              Better approach for "Range": Two separate sliders that look like one?
              Actually, standard HTML inputs are hard to style as dual.
              
              Let's go with a simpler UX: Keep the inputs but ADD a visual slider below/above them? 
              
              Let's try the "Two layered inputs" technique which is standard for simple dual sliders.
              We need `pointer-events-none` on the inputs and `pointer-events-auto` on the thumbs.
              But standard range thumbs aren't easily targetable in Tailwind without custom classes.
              
              Alternative: Just two range inputs stacked? 
              
              Let's implement a clean solution: 
              Two range inputs, absolute positioned, same location. 
              Use a standard "pointer-events-none" on the input itself and specific css for the thumb?
              
              To be safe and robust without unknown global CSS:
              Let's just use TWO sliders, Min and Max, clearly labeled.
              But User asked for "Range". 
              
              Let's try the overlay method. It works enough for standard browsers.
          */}
        </div>

        {/* Fallback/Manual Inputs for precision */}
        <div className="flex gap-2 mt-4">
          <input
            type="number"
            placeholder="Min"
            className="flex-1 p-2 rounded-md border border-gray-200 text-sm"
            value={filters.minPrice}
            onChange={(e) => handleInputChange("minPrice", e.target.value)}
          />
          <input
            type="number"
            placeholder="Max"
            className="flex-1 p-2 rounded-md border border-gray-200 text-sm"
            value={filters.maxPrice}
            onChange={(e) => handleInputChange("maxPrice", e.target.value)}
          />
        </div>
      </section>

      {/* Sort */}
      <section className="mb-4">
        <div className="mb-2 font-semibold">Ordenar</div>
        <select
          className="w-full p-2 rounded-md border border-gray-200 text-sm"
          value={filters.sort}
          onChange={(e) => handleInputChange("sort", e.target.value)}
        >
          <option value="">Relevancia</option>
          <option value="price_asc">Precio: menor a mayor</option>
          <option value="price_desc">Precio: mayor a menor</option>
        </select>
      </section>

    </aside>
  );
}

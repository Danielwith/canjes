import React from "react";

export default function FiltersSidebar() {
  return (
    <aside className="hidden lg:block w-72 p-4 border-r border-gray-200 h-full box-border">
      <h4 className="mt-0 text-lg font-semibold">Filtros</h4>

      <section className="mb-4">
        <div className="mb-2 font-semibold">Categoría</div>
        <div className="flex flex-col gap-2">
          <label className="text-sm"><input className="mr-2" type="checkbox" /> Electrónica</label>
          <label className="text-sm"><input className="mr-2" type="checkbox" /> Ropa</label>
          <label className="text-sm"><input className="mr-2" type="checkbox" /> Hogar</label>
        </div>
      </section>

      <section className="mb-4">
        <div className="mb-2 font-semibold">Precio</div>
        <div className="flex gap-2">
          <input placeholder="Min" className="flex-1 p-2 rounded-md border border-gray-200" />
          <input placeholder="Max" className="flex-1 p-2 rounded-md border border-gray-200" />
        </div>
      </section>

      <section className="mb-4">
        <div className="mb-2 font-semibold">Ordenar</div>
        <select className="w-full p-2 rounded-md border border-gray-200">
          <option value="">Relevancia</option>
          <option value="price_asc">Precio: menor a mayor</option>
          <option value="price_desc">Precio: mayor a menor</option>
        </select>
      </section>

      <div className="mt-3 text-gray-500 text-sm">Estos filtros son solo visuales por ahora.</div>
    </aside>
  );
}

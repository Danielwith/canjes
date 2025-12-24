export default function Filter() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-semibold mb-2">
          SELECCIONAR AÑO
        </label>
        <select className="w-full border border-amber-600 rounded px-4 py-2">
          <option>2025</option>
          <option>2024</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">
          SELECCIONAR MES
        </label>
        <select className="w-full border rounded px-4 py-2 uppercase">
          <option>SEPTIEMBRE</option>
          <option>OCTUBRE</option>
          <option>NOVIEMBRE</option>
        </select>
      </div>
    </div>
  );
};

export default function Filter({ years = [], months = [], selectedYear, selectedMonth, onYearChange, onMonthChange }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-semibold mb-2">
          SELECCIONAR AÑO
        </label>
        <select
          value={selectedYear}
          onChange={(e) => onYearChange(e.target.value)}
          className="w-full border border-amber-600 rounded px-4 py-2"
        >
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">
          SELECCIONAR MES
        </label>
        <select
          value={selectedMonth}
          onChange={(e) => onMonthChange(e.target.value)}
          className="w-full border rounded px-4 py-2 uppercase"
        >
          {months.map(month => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

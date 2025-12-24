export default function CanjesPage() {
  const rows = [
    { id: 1, producto: "RASQUETAS METAL", codigo: "2668EX152511110942", cantidad: 2, estado: "Entregado" },
    { id: 2, producto: "LATAS DE PANIFICACIÓN", codigo: "2668EX152511140944", cantidad: 2, estado: "Entregado" },
    { id: 3, producto: "LATAS DE PANIFICACIÓN", codigo: "2668EX162512080806", cantidad: 3, estado: "En revisión" },
  ];

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-3">
        <div className="rounded-t-2xl bg-main text-white py-6 px-8 text-center">
          <h2 className="text-2xl font-bold">ESTADO DE MI CANJE</h2>
        </div>

        <div className="bg-white border border-t-0 overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-black text-white text-left">
                <th className="py-3 px-6">Producto</th>
                <th className="py-3 px-6">Código</th>
                <th className="py-3 px-6">Cantidad</th>
                <th className="py-3 px-6">Estado</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b">
                  <td className="py-4 px-6 text-sm">{r.producto}</td>
                  <td className="py-4 px-6 text-sm">{r.codigo}</td>
                  <td className="py-4 px-6 text-sm">{r.cantidad}</td>
                  <td className="py-4 px-6 text-sm">{r.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

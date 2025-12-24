import { useAuth } from "../../../context/AuthContext";

const PointsSection = () => {
  const { compras } = useAuth();

  return (
    <div className="space-y-6">
      {/* Título Puntos */}
      <div className="bg-main text-white inline-block px-10 py-6 rounded-2xl text-4xl font-bold">
        Puntos
      </div>

      {/* Compras header */}
      <div className="flex items-center justify-between bg-main rounded-full">
        <div className="text-white px-8 py-2  font-bold">
          COMPRAS
        </div>
        <span className="text-white font-semibold">
          Septiembre
        </span>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full text-center">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3">Código cliente</th>
              <th>Participante</th>
              <th>Día de Cargue</th>
              <th>COMPRA</th>
              <th>Puntos ganados</th>
            </tr>
          </thead>

          <tbody>
            {compras.map((c, i) => (
              <tr key={i} className="border-b">
                <td className="py-3">{c.codigoCliente}</td>
                <td>
                  {c.participante.split(" ").map((p, i) => (
                    <div key={i}>{p}</div>
                  ))}
                </td>
                <td>{c.mes}</td>
                <td>${c.compra}</td>
                <td>{c.puntos}</td>
              </tr>
            ))}
          </tbody>

          {/* Footer total */}
          <tfoot>
            <tr className="bg-black text-white font-bold">
              <td colSpan={3} className="py-3">
                Total
              </td>
              <td>$0</td>
              <td>-</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* CTA */}
      <div className="flex justify-end">
        <button className="bg-main text-white px-6 py-2 rounded-full text-sm">
          *Click para saber cómo ganas puntos
        </button>
      </div>
    </div>
  );
};

export default  PointsSection;
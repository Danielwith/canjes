// src/components/ui/TablePuntos.jsx
import { useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import { TrendingUp, Coins, HandCoins, Trophy } from "lucide-react";

const columns = [
  { key: "participante", label: "PARTICIPANTE", icon: null },
  { key: "ultima", label: "PUNTOS CARGADOS POR ÚLTIMA VEZ", icon: TrendingUp },
  { key: "acumulados", label: "PUNTOS ACUMULADOS", icon: Coins },
  { key: "canjeados", label: "PUNTOS CANJEADOS", icon: HandCoins },
  { key: "disponibles", label: "PUNTOS DISPONIBLES", icon: Trophy },
];

export default function TablePuntos() {
  const { user } = useAuth(); // <- sale del Context

  // Ajusta estos nombres a tu estructura real (abajo te dejo cómo)
  const data = useMemo(() => {
    if (!user) return [];

    return [
      {
        participante: user.fullname ?? user.nombres ?? "",
        ultima: user.puntos_ultima_carga ?? "",
        acumulados: user.puntos_acumulados ?? 0,
        canjeados: user.puntos_canjeados ?? 0,
        disponibles: user.puntos_disponibles ?? 0,
      },
    ];
  }, [user]);

  return (
    <div className="w-full overflow-x-auto px-3">
      <table className="w-full border-collapse table-puntos-home">
        <thead>
          <tr className="bg-main  text-white">
            {columns.map((c) => (
              <th
                key={c.key}
                className="px-6 py-5 text-left font-semibold text-sm uppercase whitespace-nowrap"
              >
                <div className="flex items-center gap-3">
                  <span>{c.label}</span>
                  {c.icon ? <c.icon className="w-6 h-6 shrink-0" /> : null}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td className="px-6 py-8 text-center" colSpan={columns.length}>
                No hay datos para mostrar.
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={idx} className="border-b border-gray-300">
                <td className="px-6 py-6 whitespace-pre-line text-center">
                  {row.participante}
                </td>
                <td className="px-6 py-6 text-center">{row.ultima}</td>
                <td className="px-6 py-6 text-center">{row.acumulados}</td>
                <td className="px-6 py-6 text-center">{row.canjeados}</td>
                <td className="px-6 py-6 text-center">{row.disponibles}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

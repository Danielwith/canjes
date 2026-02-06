// src/components/ui/TablePuntos.jsx
import { TrendingUp, Coins, HandCoins, Trophy } from "lucide-react";

import { useAuth } from "../../context/AuthContext";

const columns = [
  { key: "participante", label: "PARTICIPANTE", icon: null },
  { key: "ultima", label: "PUNTOS CARGADOS POR ÚLTIMA VEZ", icon: TrendingUp },
  { key: "acumulados", label: "PUNTOS ACUMULADOS", icon: Coins },
  { key: "canjeados", label: "PUNTOS CANJEADOS", icon: HandCoins },
  { key: "disponibles", label: "PUNTOS DISPONIBLES", icon: Trophy },
];

export default function TablePuntos({ loading = false, error = "", data }) {


  const { profile } = useAuth();

  function formatDateText(dateString) {
    if (!dateString) return "-";

    const date = new Date(dateString);
    if (isNaN(date)) return "-";

    return date.toLocaleDateString("es-PE", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  // console.log(profile);
  console.log(data);
  const row =
    data?.oResponse?.[0] ??
    data?.Response?.oResponse?.[0] ??
    data?.Response?.[0] ??
    data?.Response ??
    data;

  // Map a las columnas visuales (ajusta keys a tu respuesta real)
  const mapped = row
    ? {
      participante: profile?.NameCanonical ?? profile?.Nombres ?? "-",
      ultima: formatDateText(row.lastMonth) ?? row.lastMonth ?? row.lastMonth ?? 0,
      acumulados: row.won ?? row.won ?? row.won ?? 0,
      canjeados: row.spent ?? row.spent ?? row.spent ?? 0,
      disponibles: row.total ?? row.total ?? row.total ?? 0,
    }
    : null;

  return (
    <div className="w-full overflow-x-auto px-3">
      <table className="w-full border-collapse table-puntos-home">
        <thead>
          <tr className="bg-main text-white">
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
          {loading ? (
            <tr>
              <td className="px-6 py-8 text-center" colSpan={columns.length}>
                Cargando puntos...
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td className="px-6 py-8 text-center text-red-600" colSpan={columns.length}>
                {error}
              </td>
            </tr>
          ) : !mapped ? (
            <tr>
              <td className="px-6 py-8 text-center" colSpan={columns.length}>
                No hay datos para mostrar.
              </td>
            </tr>
          ) : (
            <tr className="border-b border-gray-300">
              <td className="px-6 py-6 whitespace-pre-line text-center">
                {mapped.participante}
              </td>
              <td className="px-6 py-6 text-center">{mapped.ultima}</td>
              <td className="px-6 py-6 text-center">{mapped.acumulados}</td>
              <td className="px-6 py-6 text-center">{mapped.canjeados}</td>
              <td className="px-6 py-6 text-center">{mapped.disponibles}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

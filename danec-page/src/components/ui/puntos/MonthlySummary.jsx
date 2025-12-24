import { useAuth } from "../../../context/AuthContext"; 

const  MonthlySummary = () => {
  const { resumenMensual, totalPuntos } = useAuth();

  return (
    <div>
      <h2 className="text-center font-bold mb-4">
        RESUMEN MES A MES
      </h2>

      {/* Header negro */}
      <div className="bg-black rounded-t-full text-white grid grid-cols-5 text-center py-3">
        <span>Septiembre</span>
        <span>Octubre</span>
        <span>Noviembre</span>
        <span></span>
        <span></span>
      </div>

      {/* Header rojo */}
      <div className="bg-main text-white grid grid-cols-5 text-center py-2 font-semibold">
        <span>Participante</span>
        <span>Puntos</span>
        <span>Puntos</span>
        <span>Puntos</span>
        <span>Total Acumulado</span>
      </div>

      {/* Data */}
      <div className="grid grid-cols-5 text-center py-3 border-b">
        <span>JINSOP KELVIN</span>
        <span>{resumenMensual["Septiembre"] || 0}</span>
        <span>{resumenMensual["Octubre"] || 0}</span>
        <span>{resumenMensual["Noviembre"] || 0}</span>
        <span className="font-bold">{totalPuntos}</span>
      </div>
    </div>
  );
};

export default MonthlySummary;

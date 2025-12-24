import { useAuth } from "../context/AuthContext";
import avatarPlaceholder from "../assets/react.svg";

export default function MiCuentaPage() {
  const { user } = useAuth();

  // Datos de ejemplo si no hay user real
  const data = {
    cedula: user?.cedula || "0920839735",
    nombre: user?.name || "Jinsop Kelvin",
    apellido: user?.apellido || "Reyes Ortiz",
    celular: user?.celular || "0986571893",
    ruc: user?.ruc || "0920839735001",
    razonSocial: user?.razonSocial || "REYES ORTIZ JINSOP KELVIN",
    codigoCliente: user?.codigoCliente || "971177",
    agencia: user?.agencia || "GYE",
    canal: user?.canal || "Panaderías",
    perfil: user?.perfil || "Panificador",
  };

  return (
    <div className="p-8">
      <div className="max-w-[1100px] mx-auto bg-white rounded-md shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left - avatar and image area */}
          <div className="w-1/3  md:flex items-center justify-center p-8 bg-[url('../assets/login-bg.png')] bg-cover bg-center">
            <div className="w-full flex flex-col items-center">
              <div className="h-36 w-36 rounded-full overflow-hidden bg-white flex items-center justify-center shadow-md">
                <img src={avatarPlaceholder} alt="avatar" className="w-28 h-28 object-contain" />
              </div>
              <h3 className="mt-4 text-2xl font-bold">Apunta tus datos</h3>
              <div className="mt-4 bg-amber-400 text-white px-4 py-1 rounded-full">100%</div>
              <p className="text-xs text-gray-500 mt-2">*Debes cumplir el 100% para ver el contenido</p>
              <button className="mt-6 px-4 py-2 bg-red-500 text-white rounded-md">Cambiar Contraseña</button>
            </div>
          </div>

          {/* Right - details form */}
          <div className="flex-1 p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Datos de la cuenta</h2>
                <div className="text-sm text-gray-500">* Campos Obligatorios</div>
              </div>
              <button className="px-4 py-2 bg-red-500 text-white rounded-md">Actualizar</button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4">
              <Field label="CÉDULA" value={data.cedula} />
              <Field label="NOMBRE" value={data.nombre} />
              <Field label="APELLIDO" value={data.apellido} />
              <Field label="CELULAR" value={data.celular} />
              <Field label="RUC" value={data.ruc} />
              <Field label="RAZÓN SOCIAL" value={data.razonSocial} />
              <Field label="CÓDIGO DE CLIENTE" value={data.codigoCliente} />
              <Field label="AGENCIA" value={data.agencia} />
              <Field label="CANAL" value={data.canal} />
              <Field label="PERFIL" value={data.perfil} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div className="py-2 border-b border-gray-100">
      <div className="text-sm text-gray-500 mb-1">{label} *</div>
      <div className="font-bold">{value}</div>
    </div>
  );
}
    
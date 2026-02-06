import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { updateProfileApi } from "../api/userApi";
import avatarPlaceholder from "../assets/react.svg";

export default function MiCuentaPage() {
  const { user, needsProfileUpdate, userDetails, refreshSession } = useAuth();





  // Ensure details is an array
  const details = Array.isArray(userDetails?.Response?.oResponse) ? userDetails.Response.oResponse : [];

  // Filter options
  const canales = details.filter(d => d.group_key === "CANAL");
  const allPerfiles = details.filter(d => d.group_key === "PERFIL");


  const location = useLocation();


  // Toast cuando fue redirigido por el guard
  useEffect(() => {
    // console.log("Location State in MiCuenta:", location.state);
    if (location.state?.from) {
      toast.error("Te falta completar tus datos para continuar.", {
        toastId: "profile-update", // evita duplicados
      });

    }
  }, [location.state]);

  const profile = user?.Response?.oResponse ?? null;


  const extra = profile?.ExtraInfo;


  // console.log("User Details:", user?.Response?.oResponse);

  const [formData, setFormData] = useState({
    id_usuario: "",
    cedula: "",
    nombre: "",
    apellido: "",
    celular: "",
    ruc: "",
    razon_social: "",
    codigo_cliente: "",
    agencia: "",
    canal: "",
    perfil: "",
  });

  // Derive perfiles based on selected canal 
  const selectedCanalObj = canales.find(c => c.option_value === formData.canal);
  const availablePerfiles = selectedCanalObj
    ? allPerfiles.filter(p => p.parent_id === selectedCanalObj.id)
    : [];

  // console.log("User Details:", user?.Response?.oResponse.NameCanonical);
  useEffect(() => {
    if (profile) {
      setFormData({
        id_usuario: String(user?.Response?.oResponse?.Id) ?? "",
        cedula: extra?.cedula ?? "",
        nombre: extra?.name ?? profile?.name_canonical ?? "",
        apellido: extra?.lastName ?? "",
        celular: extra?.telephoneNumber ?? "",
        ruc: extra?.businessRuc ?? "",
        razon_social: user?.Response?.oResponse?.NameCanonical ?? "",
        codigo_cliente: user?.Response?.oResponse?.Username ?? user?.Response?.oResponse?.IdNumber ?? "",
        agencia: extra?.agencia ?? "",
        canal: extra?.category ?? "",
        perfil: extra?.profile ?? "",
      });
    }
  }, [profile, extra]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const completion = useMemo(() => {
    const required = Object.values(formData);
    const filled = required.filter(
      (v) => v && v !== "-" && String(v).trim() !== ""
    ).length;
    return Math.round((filled / required.length) * 100);
  }, [formData]);


  const isUpdated = !needsProfileUpdate;
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleUpdate = async () => {
    if (!isUpdated && !termsAccepted) {
      toast.error("Debes aceptar los términos y condiciones");
      return;
    }

    try {
      const payload = {
        ...formData,
        id_usuario: String(formData.id_usuario),
        updated: true
      };
      console.log("Enviando datos:", payload);
      const res = await updateProfileApi(payload);
      const newToken = res?.Response?.oResponse?.token;

      await refreshSession(newToken); // Refresh data with new token (if any)

      toast.success("Perfil actualizado correctamente");
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar el perfil");
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-[1100px] mx-auto bg-white rounded-md shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row">

          {/* Left */}
          <div className="w-full md:w-1/3 p-8 bg-[url('../assets/login-bg.png')] bg-cover bg-center flex justify-center">
            <div className="flex flex-col items-center">
              <div className="h-36 w-36 rounded-full bg-white flex items-center justify-center shadow-md">
                <img src={avatarPlaceholder} alt="avatar" className="w-28 h-28" />
              </div>

              <h3 className="mt-4 text-2xl font-bold text-white">
                Apunta tus datos
              </h3>

              <div className="mt-4 bg-amber-400 text-white px-4 py-1 rounded-full">
                {completion}%
              </div>

              {needsProfileUpdate && (
                <p className="text-xs text-white/90 mt-2 text-center">
                  *Debes completar tus datos para poder ver el contenido
                </p>
              )}

              <button className="mt-6 px-4 py-2 bg-red-500 text-white rounded-md">
                Cambiar Contraseña
              </button>
            </div>
          </div>

          {/* Right */}
          <div className="flex-1 p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Datos de la cuenta</h2>
                <div className="text-sm text-gray-500">* Campos Obligatorios</div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {Object.entries(formData)
                .filter(([key]) => key !== "id_usuario" && key !== "updated")
                .map(([key, value]) => {
                  const readOnlyFields = ["codigo_cliente", "agencia", "canal", "perfil"];
                  const isReadOnly = isUpdated && readOnlyFields.includes(key);

                  // CANAL: Always read-only (just painted)
                  if (key === "canal") {
                    return (
                      <Field
                        key={key}
                        label={key.toUpperCase()}
                        name={key}
                        value={value}
                        onChange={handleChange}
                        readOnly={true}
                      />
                    );
                  }

                  // PERFIL: Selectable ONLY if not updated, then Read-Only
                  if (key === "perfil") {
                    if (isUpdated) {
                      return (
                        <Field
                          key={key}
                          label={key.toUpperCase()}
                          name={key}
                          value={value}
                          onChange={handleChange}
                          readOnly={true}
                        />
                      );
                    } else {
                      return (
                        <div key={key} className="py-2 border-b border-gray-100">
                          <label className="text-sm text-gray-500 mb-1 block">{key.toUpperCase()} *</label>
                          <select
                            name={key}
                            value={value}
                            onChange={handleChange}
                            disabled={!formData.canal}
                            className="font-bold w-full outline-none text-gray-800 bg-white focus:border-b-2 focus:border-red-500 transition-all disabled:text-gray-400"
                          >
                            <option value="">Seleccione...</option>
                            {availablePerfiles.map(opt => (
                              <option key={opt.id} value={opt.option_value}>
                                {opt.option_text}
                              </option>
                            ))}
                          </select>
                        </div>
                      );
                    }
                  }

                  return (
                    <Field
                      key={key}
                      label={key.toUpperCase()}
                      name={key}
                      value={value}
                      onChange={handleChange}
                      readOnly={isReadOnly}
                    />
                  );
                })}
            </div>

            <div className="mt-6">
              {!isUpdated ? (
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="w-4 h-4 text-red-600 rounded focus:ring-red-500 border-gray-300"
                  />
                  <span className="text-sm text-gray-700 underline">
                    Acepto TÉRMINOS Y CONDICIONES JUNTO CON EL TRATAMIENTO Y USO DE DATOS.
                  </span>
                </label>
              ) : (
                <p className="text-sm text-gray-500">
                  Ya aceptó <span className="underline">TÉRMINOS Y CONDICIONES JUNTO CON EL TRATAMIENTO Y USO DE DATOS.</span>
                </p>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Actualizar
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function Field({ label, name, value, onChange, readOnly }) {
  return (
    <div className="py-2 border-b border-gray-100">
      <label className="text-sm text-gray-500 mb-1 block">{label} *</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        disabled={readOnly}
        readOnly={readOnly}
        className={`font-bold w-full outline-none transition-all ${readOnly
          ? "text-gray-400 bg-transparent cursor-not-allowed"
          : "text-gray-800 placeholder-gray-300 focus:border-b-2 focus:border-red-500"
          }`}
        placeholder="-"
      />
    </div>
  );
}


import axiosClient from "./axiosRestClient";
function pickApiErrorMessage(payload) {
  return (
    payload?.response?.sRetorno ||
    payload?.errors?.[0]?.message ||
    payload?.message ||
    "Ocurrió un error"
  );
}

export async function loginApi({ username, password }) {
  const res = await axiosClient.post("/auth/login_check", { username, password });

  // Caso OK típico: { token: "..." }
  if (res?.data?.token) {
    return { token: res.data.token };
  }

  // Caso “envoltura” tuya: { success:false, response:{...}, errors:[...] }
  if (res?.data?.success === false) {
    const msg = pickApiErrorMessage(res.data);
    const err = new Error(msg);
    err.apiPayload = res.data;
    throw err;
  }

  // Cualquier otro formato inesperado
  const err = new Error("Respuesta inesperada del servidor en login");
  err.apiPayload = res?.data;
  throw err;
}

export async function getProfileApi() {
  const res = await axiosClient.get("/user");
  return res.data;
}


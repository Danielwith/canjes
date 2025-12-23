import axiosClient from "./axiosClient";

export async function loginApi({ email, password }) {
  const { data } = await axiosClient.post("/auth/login", { email, password });
  // Supongo que devuelve { token, user }
  return data;
}

export async function getProfileApi() {
  const { data } = await axiosClient.get("/auth/me");
  return data;
}

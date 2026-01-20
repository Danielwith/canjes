import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_REST_URL || "https://localhost:7128/api/rest",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Añade el siteId si está definido (permite que backend devuelva branding por sitio)
  // const siteId = localStorage.getItem("siteId");
  // if (siteId) {
  //   config.headers["X-Site-Id"] = siteId;
  // }

   return config;
});

export default axiosClient;

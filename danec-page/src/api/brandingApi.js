import axiosClient from "./axiosClient";

export async function getBranding(siteId) {
  const params = {};
  if (siteId) params.siteId = siteId;
  const { data } = await axiosClient.get("/branding", { params });
  return data;
}

export default { getBranding };

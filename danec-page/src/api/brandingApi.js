import axiosClient from "./axiosRestClient";

export async function getBranding() {
  const { data } = await axiosClient.get("/site/branding");
  // Backend returns a wrapper. Try common shapes and return the inner branding object.
  const branding = data?.response?.oResponse || data?.Response?.oResponse || data?.oResponse || data;
  return branding;
}

export default { getBranding };


import axiosClient from "./axiosRestClient";


export async function getCatalog() {
  const { data } = await axiosClient.get("/catalog/user");
  return data;
}


import axios from "axios";
export async function generateUrlApi() {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const result = await axios
    .get(`${apiDomain}/image/generate-url`)
    .then((res) => {
      return res.data;
    });
  return result;
}

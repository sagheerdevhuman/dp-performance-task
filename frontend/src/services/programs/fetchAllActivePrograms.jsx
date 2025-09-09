import axios from "axios";
export async function fetchAllActivePrograms() {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = await axios.get(`${apiDomain}/programs/active`).then((res) => {
    return res.data;
  });

  return res;
}

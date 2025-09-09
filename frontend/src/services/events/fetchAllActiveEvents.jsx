import axios from "axios";
export async function fetchAllActiveEvents() {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = await axios.get(`${apiDomain}/events/active`).then((res) => {
    return res.data;
  });

  return res;
}

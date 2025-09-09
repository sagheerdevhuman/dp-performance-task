import axios from "axios";
export async function fetchAllBxdpStaff() {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = await axios.get(`${apiDomain}/bxdp/staff`).then((res) => {
    return res.data;
  });

  return res;
}

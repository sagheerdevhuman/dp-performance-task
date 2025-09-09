import axios from "axios";
export async function getAllBxdpAdmins() {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = await axios.get(`${apiDomain}/bxdp/staff/admins`).then((res) => {
    return res.data;
  });

  return res;
}

import axios from "axios";

export async function fetchAllUsers() {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = await axios.get(`${apiDomain}/users`).then((res) => {
    return res.data;
  });

  return res;
}

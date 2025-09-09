import axios from "axios";
export async function fetchAllSkills() {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = await axios.get(`${apiDomain}/skills`).then((res) => {
    return res.data;
  });

  return res;
}

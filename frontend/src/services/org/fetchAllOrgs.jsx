import axios from "axios";
export async function fetchAllOrgs() {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = await axios.get(`${apiDomain}/orgs`).then((res) => {
    return res.data;
  });

  return res;
}

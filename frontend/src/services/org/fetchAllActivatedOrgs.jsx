import axios from "axios";
export async function getAllActivatedOrgs() {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = await axios.get(`${apiDomain}/orgs/activatedOrgs`).then((res) => {
    return res.data;
  });

  return res;
}

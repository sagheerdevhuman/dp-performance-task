import axios from "axios";

export async function fetchOrgById(orgId) {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = await axios.get(`${apiDomain}/orgs/${orgId}`).then((result) => {
    return result.data;
  });
  return res;
}

import axios from "axios";
export async function fetchAllOrgStaff({ orgId }) {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = await axios
    .get(`${apiDomain}/orgs/${orgId}/staff`)
    .then((res) => {
      return res.data;
    });
  
  return res;
}

import axios from "axios";
export async function getAllOrgManagers({ org_id }) {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = await axios
    .get(`${apiDomain}/orgs/${org_id}/managers`)
    .then((res) => {
      return res.data;
    });

  return res;
}

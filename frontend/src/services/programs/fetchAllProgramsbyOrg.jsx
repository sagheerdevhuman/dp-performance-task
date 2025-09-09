import axios from "axios";
export async function fetchAllProgramsByOrg(org_id) {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = await axios
    .get(`${apiDomain}/programs/${org_id}/org`)
    .then((res) => {
      return res.data;
    });

  return res;
}

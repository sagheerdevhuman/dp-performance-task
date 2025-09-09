import axios from "axios";

export async function fetchPartnerById({ org_id }) {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = await axios
    .get(`${apiDomain}/orgs/partner/${org_id}`)
    .then((result) => {
      return result.data;
    });
  return res;
}

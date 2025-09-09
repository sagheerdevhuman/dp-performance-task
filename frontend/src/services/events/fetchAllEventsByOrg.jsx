import axios from "axios";
export async function fetchAllEventsByOrg(org_id) {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = await axios
    .get(`${apiDomain}/events/${org_id}/orgs`)
    .then((res) => {
      return res.data;
    });

  return res;
}

import axios from "axios";
export async function fetchAllActiveEventsByOrg({ org_id }) {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = await axios
    .get(`${apiDomain}/events/${org_id}/active`)
    .then((res) => {
      return res.data;
    });

  return res;
}

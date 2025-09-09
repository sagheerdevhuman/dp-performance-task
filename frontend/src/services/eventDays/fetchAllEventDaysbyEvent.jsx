import axios from "axios";
export async function getAllEventsDaysByEvent(event_id) {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = await axios
    .get(`${apiDomain}/events/${event_id}/orgs`)
    .then((res) => {
      return res.data;
    });

  return res;
}

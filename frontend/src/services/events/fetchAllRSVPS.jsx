import axios from "axios";
export async function getAllRSVPs(event_id) {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = await axios
    .get(`${apiDomain}/events/${event_id}/rsvps`)
    .then((res) => {
      return res.data;
    });

  return res;
}

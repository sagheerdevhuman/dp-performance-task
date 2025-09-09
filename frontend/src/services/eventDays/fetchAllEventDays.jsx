import axios from "axios";
export async function getEventDays() {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = await axios.get(`${apiDomain}/event_days`).then((res) => {
    return res.data;
  });

  return res;
}

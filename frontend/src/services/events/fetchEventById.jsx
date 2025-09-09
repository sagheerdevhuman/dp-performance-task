import axios from "axios";
export async function fetchEventById({ event_id }) {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = await axios.get(`${apiDomain}/event/${ event_id }`).then((res) => {
    return res.data;
  });

  return res;
}

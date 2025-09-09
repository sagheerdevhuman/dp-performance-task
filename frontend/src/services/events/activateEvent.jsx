import axios from "axios";
export async function activateEvent({
  event_id
}) {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = axios({
    method: "POST",
    url: `${apiDomain}/events/${event_id}/activate`,
  }).then((res) => {
    console.log(res);
    return res.data;
  });

  return res;
}
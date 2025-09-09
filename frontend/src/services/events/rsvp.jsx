import axios from "axios";
export async function rsvp({
    event_id,
    user_id,
  
}) {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = axios({
    method: "POST",
    data: {
        user_id:user_id,
    },
    url: `${apiDomain}/events/${event_id}/rsvp`,
  }).then((res) => {
    console.log(res);
    return res.data;
  });

  return res;
}
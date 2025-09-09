import axios from "axios";
export async function approveEvent({
  event_id
}) {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  console.log(event_id);
  const res = axios({
    method: "PUT",
    url: `${apiDomain}/events/${event_id}/approve`,
  }).then((res) => {
    
    return res.data;
  });

  return res;
}
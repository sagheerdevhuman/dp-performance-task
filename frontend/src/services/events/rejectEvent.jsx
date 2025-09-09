import axios from "axios";
export async function rejectEvent({
  event_id, user_id, reason
}) {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  console.log(event_id);
  const res = axios({
    method: "PUT",
    data: {
      user_id: user_id,
      reason: reason,
    },
    url: `${apiDomain}/events/${event_id}/reject`,
  }).then((res) => {
    
    return res.data;
  });

  return res;
}
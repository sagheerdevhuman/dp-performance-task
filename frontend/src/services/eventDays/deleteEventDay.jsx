import axios from "axios";

export async function deleteEventDay({ event_day_id }) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const results = axios({
    config,
    method: "DELETE",
    data: {
      event_day_id: event_day_id,
    },
    url: `${apiDomain}/event_day/${event_day_id}/Day`,
  }).then((res) => {
    return res.data;
  });
  return results;
}

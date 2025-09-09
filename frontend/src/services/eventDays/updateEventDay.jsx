import axios from "axios";

export async function updateEventDay({
  event_day_id,
  date,
  start_time,
  end_time,
}) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;

  const results = axios({
    config,
    method: "PUT",
    data: {
      date: date,
      start_time: start_time,
      end_time: end_time,
    },
    url: `${apiDomain}/event_day/${event_day_id}/day`,
  }).then((res) => {
    return res.data;
  });
  return results;
}

import axios from "axios";
export async function newEventDay({ event_id, date, start_time, end_time }) {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = axios({
    method: "POST",
    data: {
      date: date,
      start_time: start_time,
      end_time: end_time,
    },
    url: `${apiDomain}/events/${event_id}/addEventDay`,
  }).then((res) => {
    console.log(res);
    return res.data;
  });

  return res;
}

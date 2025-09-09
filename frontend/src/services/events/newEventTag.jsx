import axios from "axios";
export async function newEventTag({
    event_id,
    tags,
  
}) {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = axios({
    method: "POST",
    data: {
    	tags:tags,
    },
    url: `${apiDomain}/events/${event_id}/addTag`,
  }).then((res) => {
    console.log(res);
    return res.data;
  });

  return res;
}
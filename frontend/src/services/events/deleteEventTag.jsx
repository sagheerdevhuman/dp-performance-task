import axios from "axios";
export async function deleteEventTag({ event_id,tag_id }) {
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
      tag_id: tag_id,
    },
    url: `${apiDomain}/events/${event_id}/deleteTag`,
  }).then((res) => {
    return res.data;
  });
  return results;
}

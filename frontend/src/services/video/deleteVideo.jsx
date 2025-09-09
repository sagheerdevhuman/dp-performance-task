import axios from "axios";

export async function deleteVideo({ video_id }) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const results = axios({
    config,
    method: "DELETE",
    url: `${apiDomain}/video/${video_id}`,
  }).then((res) => {
    return res.data;
  });
  return results;
}

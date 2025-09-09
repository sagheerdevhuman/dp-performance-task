import axios from "axios";

export async function fetchVideoById(video_id) {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = await axios.get(`${apiDomain}/video/${video_id}`).then((res) => {
    return res.data;
  });

  return res;
} 
import axios from "axios";
export async function fetchAllVideos() {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = await axios.get(`${apiDomain}/videos`).then((res) => {
    return res.data;
  });

  return res;
}

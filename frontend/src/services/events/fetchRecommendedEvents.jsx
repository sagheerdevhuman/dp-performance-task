import axios from "axios";

export async function fetchRecommendedEvents({ user_id }) {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = await axios.get(`${apiDomain}/events/recommended/${user_id}`).then((res) => {
    return res.data;
  });

  return res;
} 
import axios from "axios";

export async function fetchResourceById({ resource_id }) {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = await axios
    .get(`${apiDomain}/resource/${resource_id}`)
    .then((res) => {
      return res.data;
    });

  return res;
} 
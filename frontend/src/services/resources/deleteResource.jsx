import axios from "axios";

export async function deleteResource({ resource_id }) {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = await axios
    .delete(`${apiDomain}/resources/${resource_id}/delete`)
    .then((res) => {
      return res.data;
    });

  return res;
} 
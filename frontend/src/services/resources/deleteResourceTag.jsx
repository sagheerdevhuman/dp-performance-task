import axios from "axios";

export async function deleteResourceTag({ resource_id, tag_id }) {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = await axios
    .delete(`${apiDomain}/resources/${resource_id}/tags/${tag_id}`)
    .then((res) => {
      return res.data;
    });

  return res;
} 
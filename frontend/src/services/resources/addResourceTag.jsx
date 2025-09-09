import axios from "axios";

export async function addResourceTag({ resource_id, tag_name }) {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = axios({
    method: "POST",
    data: {
      tag_name: tag_name,
    },
    url: `${apiDomain}/resources/${resource_id}/tags`,
  }).then((res) => {
    return res.data;
  });

  return res;
} 
import axios from "axios";

export async function addResourceCategory({ resource_id, category_name }) {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = axios({
    method: "POST",
    data: {
      category_name: category_name,
    },
    url: `${apiDomain}/resources/${resource_id}/categories`,
  }).then((res) => {
    return res.data;
  });

  return res;
} 
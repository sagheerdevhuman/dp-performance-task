import axios from "axios";

export async function deleteResourceCategory({ resource_id, category_id }) {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = await axios
    .delete(`${apiDomain}/resources/${resource_id}/categories/${category_id}`)
    .then((res) => {
      return res.data;
    });

  return res;
} 
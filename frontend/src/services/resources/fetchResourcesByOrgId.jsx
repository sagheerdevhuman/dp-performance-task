import axios from "axios";

export async function fetchResourcesByOrgId(org_id) {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = await axios.get(`${apiDomain}/resources/org/${org_id}`).then((res) => {
    return res.data;
  });

  return res;
} 
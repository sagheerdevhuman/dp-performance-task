import axios from "axios";
export async function getAllMetaAdmins() {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = await axios
    .get(`${apiDomain}/bxdp/staff/metaAdmins`)
    .then((res) => {
      return res.data;
    });

  return res;
}

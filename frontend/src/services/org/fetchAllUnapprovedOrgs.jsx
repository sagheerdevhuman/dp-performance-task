import axios from "axios";
export async function fetchAllUnapprovedOrgs() {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = await axios
    .get(`${apiDomain}/orgs/unapprovedOrgs`)
    .then((res) => {
      return res.data;
    });

  return res;
}

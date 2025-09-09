import axios from "axios";

export async function orgStaffToUser({ user_id, org_id }) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const results = axios({
    config,
    method: "PUT",
    url: `${apiDomain}/orgs/${org_id}/changeRole/${user_id}/staffToUser`,
  }).then((res) => {
    return res.data;
  });
  return results;
}

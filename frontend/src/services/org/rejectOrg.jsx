import axios from "axios";

export async function rejectOrg({ org_id, user_id, reason }) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;

  const results = axios({
    config,
    method: "PUT",
    data: {
      user_id: user_id,
      reason: reason,
    },
    url: `${apiDomain}/orgs/${org_id}/reject`,
  }).then((res) => {
    return res.data;
  });
  return results;
}

import axios from "axios";

export async function activateOrg({ org_id }) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;

  const results = axios({
    config,
    method: "POST",
    url: `${apiDomain}/orgs/${org_id}/activate`,
  }).then((res) => {
    return res.data;
  });
  return results;
}

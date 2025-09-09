import axios from "axios";

export async function featureOrg({ org_id }) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;

  const results = axios({
    config,
    method: "PUT",
    url: `${apiDomain}/orgs/${org_id}/feature`,
  }).then((res) => {
    return res.data;
  });
  return results;
}

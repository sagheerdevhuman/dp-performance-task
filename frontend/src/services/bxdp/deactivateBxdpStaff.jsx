import axios from "axios";

export async function deactivateBxdpStaff({ user_id }) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const results = axios({
    config,
    method: "PUT",
    url: `${apiDomain}/bxdp/changeActiveStatus/${user_id}/deactivate`,
  }).then((res) => {
    return res.data;
  });
  return results;
}

import axios from "axios";

export async function userToBxdpAdmin({ user_id }) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const results = axios({
    config,
    method: "PUT",
    url: `${apiDomain}/bxdp/changeRole/${user_id}/userToBxdpAdmin`,
  }).then((res) => {
    return res.data;
  });
  return results;
}

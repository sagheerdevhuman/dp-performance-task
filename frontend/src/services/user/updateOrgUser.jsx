import axios from "axios";

export async function updateOrgUser({
  user_id
}) {
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
    },
    url: `${apiDomain}/signUp/user/confirm_email`,
  }).then((res) => {
    return res.data;
  });
  return results;
}

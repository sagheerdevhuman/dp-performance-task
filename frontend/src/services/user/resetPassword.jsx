import axios from "axios";

export async function resetPassword({
    email,
    reset_password_token,
    passwordA,
    passwordB,
}) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const results = axios({
    config,
    method: "POST",
    data: {
      email:email,
      reset_token:reset_password_token,
      password_a:passwordA,
      password_b:passwordB,
    },
    url: `${apiDomain}/password/reset`,
  }).then((res) => {
    return res.data;
  });
  return results;
}

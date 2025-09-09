import axios from "axios";

export async function updateUserPassword({
  userId,
  currentPassword,
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
    method: "PUT",
    data: {
      current_password: currentPassword,
      password_a: passwordA,
      password_b: passwordB,
    },
    url: `${apiDomain}/users/${userId}/updatePassword`,
  }).then((res) => {
    return res.data;
  });
  return results;
}

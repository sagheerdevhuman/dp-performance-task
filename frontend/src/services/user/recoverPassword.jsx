import axios from "axios";

export async function recoverPassword({
    email,
}) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  console.log(email)
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const results = axios({
    config,
    method: "POST",
    data: {
      email:email,
    },
    url: `${apiDomain}/password/resetLink`,
  }).then((res) => {
    alert("check email for reset link ")
    return res.data;
  });
  return results;
}

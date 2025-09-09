import axios from "axios";
export async function signUpOrgUser({
  firstName,
  lastName,
  email,
  passwordA,
  passwordB,
  // profilerUrl,
}) {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;

  const res = axios({
    method: "POST",
    data: {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password_a: passwordA,
      password_b: passwordB,
      // profiler_url:profilerUrl,
    },
    url: `${apiDomain}/signUp/user/org`,
  }).then((res) => {
    return res.data;
  });
  return res;
}

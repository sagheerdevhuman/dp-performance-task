import axios from "axios";
export async function signUpUser({
  profileImage,
  firstName,
  lastName,
  email,
  passwordA,
  passwordB,
}) {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;

  const res = axios({
    method: "POST",
    data: {
      profile_url: profileImage,
      first_name: firstName,
      last_name: lastName,
      email: email,
      password_a: passwordA,
      password_b: passwordB,
      is_meta_admin: false,
      is_bxdp_admin: false,
      is_org_admin: false,
      is_org_manager: false,
      is_org_user: false,
      was_invited: false,
    },
    url: `${apiDomain}/signUp/user`,
  }).then((res) => {
    return res.data;
  });
  return res;
}

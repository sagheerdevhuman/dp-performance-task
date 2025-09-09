import axios from "axios";

export async function updateUser({
  userId,
  firstName,
  lastName,
  email,
  profileUrl,
}) {

  console.log("profileUrl: ", profileUrl)
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
      first_name: firstName,
      last_name: lastName,
      user_email: email,
      profile_url: profileUrl,
    },
    url: `${apiDomain}/users/${userId}/update`,
  }).then((res) => {
    return res.data;
  });
  return results;
}

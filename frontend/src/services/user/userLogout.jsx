import axios from "axios";

export async function userLogout({ user_id }) {
  // console.log(user_id);
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  // console.log("Your API Domain ----->", apiDomain);

  const results = axios({
    method: "PUT",
    data: { user_id },
    url: `${apiDomain}/logout`,
  }).then((result) => {
    return result.data;
  });

  // console.log("Your Results ----->", results);
  return results;
}

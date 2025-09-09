import axios from "axios";

export async function userLogin({ userEmail, userPassword }) {
  // console.log("Your user info ----->", {
  //   userEmail: userEmail,
  //   userPassword: userPassword,
  // });
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  // console.log("Your API Domain ----->", apiDomain);
  const results = axios({
    method: "POST",
    data: { email: userEmail, password: userPassword },
    url: `${apiDomain}/login`,
  }).then((result) => {
    console.log("Your Results ----->", results);
    return result.data;
  });
  console.log("Your Results ----->", results);
  return results;
}

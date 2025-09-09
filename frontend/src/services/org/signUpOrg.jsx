import axios from "axios";
export async function signUpOrg({
  name,
  infoEmail,
  description,
  website,
  phone,
  addressA,
  addressB,
  zipcode,
  logoUrl,
  bannerUrl,
  userId,
}) {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;

  const res = axios({
    method: "POST",
    data: {
      name: name,
      info_email: infoEmail,
      description: description,
      website: website,
      phone: phone,
      address_a: addressA,
      address_b: addressB,
      zipcode: zipcode,
      logo_url: logoUrl,
      banner_url:bannerUrl,
      user_id:userId,
    },
    url: `${apiDomain}/signUp/organization`,
  }).then((res) => {
    return res.data;
  });
  return res;
}

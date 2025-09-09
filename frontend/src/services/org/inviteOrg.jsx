import axios from "axios";
export async function inviteOrg({ name, firstName, lastName, infoEmail, logoUrl, bannerUrl }) {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = axios({
    method: "POST",
    data: {
      name: name,
      first_name: firstName,
      last_name: lastName,
      info_email: infoEmail,
      logo_url: logoUrl,
      banner_url: bannerUrl,
      is_approved: true,
      is_active: true,
      was_invited: true,
    },
    url: `${apiDomain}/invite/organization`,
  }).then((res) => {
    return res.data;
  }).catch((error) => {
    // Error
    if (error.response) {
        return error.response.data
    } else if (error.request) {
        return error.request;
    } else {
       return error.message;
    }
  });;
  return res;
}

import axios from "axios";

export async function updateOrg({
  org_id,
  user_id,
  name,
  info_email,
  description,
  website,
  phone,
  address_a,
  address_b,
  zipcode,
  logo_url,
  banner_url
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
      // user_id: user_id,
      name: name,
      info_email: info_email,
      description: description,
      website: website,
      phone: phone,
      address_a: address_a,
      address_b: address_b,
      zipcode: zipcode,
      logo_url:logo_url,
      banner_url:banner_url
    },
    url: `${apiDomain}/orgs/${org_id}/update`,
  }).then((res) => {
    return res.data;
  });
  return results;
}

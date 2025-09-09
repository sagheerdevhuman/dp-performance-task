import axios from "axios";
export async function inviteBxdpAdmin({
  firstName,
  lastName,
  email,
  isMetaAdmin,
  isBxdpAdmin,
}) {
  console.log(isMetaAdmin, isBxdpAdmin);
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;

  const res = axios({
    method: "POST",
    data: {
      first_name: firstName,
      last_name: lastName,
      email: email,
      is_meta_admin: isMetaAdmin,
      is_bxdp_admin: isBxdpAdmin,
      is_org_admin: false,
      is_org_manager: false,
      is_org_user: false,
      was_invited: true,
    },
    url: `${apiDomain}/invite/bxdpAdmin`,
  }).then((res) => {
    return res.data;
  });
  return res;
}

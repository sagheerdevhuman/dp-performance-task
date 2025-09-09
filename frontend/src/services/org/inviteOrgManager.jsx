import axios from "axios";
export async function inviteOrgManager({
  org_id,
  firstName,
  lastName,
  email,
  isOrgAdmin,
  isOrgManager,
  isOrgUser,
}) {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;

  const res = axios({
    method: "POST",
    data: {
      first_name: firstName,
      last_name: lastName,
      email: email,
      is_meta_admin: false,
      is_bxdp_admin: false,
      is_org_admin: isOrgAdmin,
      is_org_manager: isOrgManager,
      is_org_user: isOrgUser,
      was_invited: true,
    },
    url: `${apiDomain}/invite/org/${org_id}/orgManager`,
  }).then((res) => {
    return res.data;
  });
  return res;
}

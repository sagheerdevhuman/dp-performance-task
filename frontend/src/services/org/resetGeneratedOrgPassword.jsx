import axios from "axios";

export async function resetGeneratePasswordOrg({
  org_id,
  user_id,
  passwordA,
  passwordB,
  mou,
  isMetaAdmin,
  isBxdpAdmin,
  isOrgAdmin,
  isOrgManager,
  isOrgUser,
}) {
  console.log(org_id,passwordA, passwordB);
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
      password_a: passwordA,
      password_b: passwordB,
      mou: true,
      is_meta_admin: isMetaAdmin,
      is_bxdp_admin: isBxdpAdmin,
      is_org_admin: isOrgAdmin,
      is_org_manager: isOrgManager,
      is_org_user: isOrgUser,
    },
    url: `${apiDomain}/invite/org/${org_id}/orgStaff/${user_id}/resetPassword`,
  }).then((res) => {
    return res.data;
  });
  return results;
}

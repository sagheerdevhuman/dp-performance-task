import axios from "axios";

export async function updateOrgAdminToApproved({
  org_id,
  user_id,
  is_approved,
}) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;

  console.log(`org ${org_id}, user ${user_id}, status ${is_approved}`);
  const results = axios({
    config,
    method: "PUT",
    data: {
      org_id: org_id,
      user_id: user_id,
      is_approved: is_approved,
      // name: org.name,
      // website: org.website,
      // phone: org.phone,
      // address: org.address,
      // info_email: org.info_email,
      // digital_services: false,
      // featured: false,
      // is_approved: org.is_approved,
    },
    url: `${apiDomain}/orgs/${org_id}/registerOrgAdmin/${user_id}`,
  }).then((res) => {
    return res.data;
  });
  return results;
}

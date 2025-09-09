import axios from "axios";

export async function newResource({
  user_id,
  org_id,
  title,
  description,
  location,
  link,
  tags,
  categories,
  provider, 
  photo,
  is_platform_wide,
  is_active,
}) {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = axios({
    method: "POST",
    data: {
      title: title,
      description: description,
      location: location,
      link: link,
      tags: tags,
      photo: photo,
      categories: categories,
      org_id: org_id,
      provider: provider,
      is_platform_wide: is_platform_wide,
      is_active: is_active,
    },
    url: `${apiDomain}/resource/${user_id}/addResource`,
  }).then((res) => {
    return res.data;
  });

  return res;
} 
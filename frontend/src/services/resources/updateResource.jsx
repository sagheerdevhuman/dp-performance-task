import axios from "axios";

export async function updateResource({
  resource_id,
  name,
  description,
  link,
  category,
  tags,
  banner_url,
  is_active,
  requirements,
  target_audience,
  difficulty_level,
  duration,
  cost,
  language,
  format,
  access_type,
}) {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = axios({
    method: "PUT",
    data: {
      name: name,
      description: description,
      link: link,
      category: category,
      tags: tags,
      banner_url: banner_url,
      is_active: is_active,
      requirements: requirements,
      target_audience: target_audience,
      difficulty_level: difficulty_level,
      duration: duration,
      cost: cost,
      language: language,
      format: format,
      access_type: access_type,
    },
    url: `${apiDomain}/resources/${resource_id}`,
  }).then((res) => {
    return res.data;
  });

  return res;
} 
import axios from "axios";

export async function updateSkill({
  skill_id,
  name,
  icon_url,
  description,
  user_id
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
      name: name,
      description: description,
      icon_url: icon_url,
      user_id: user_id
    },
    url:`${apiDomain}/skills/${skill_id}`,
  }).then((res) => {
    return res.data;
  });
  return results;
}

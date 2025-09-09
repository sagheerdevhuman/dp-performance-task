import axios from "axios";
export async function deleteTopic({ program_id,skill_id }) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const results = axios({
    config,
    method: "DELETE",
    data: {
      skill_id: skill_id,
    },
    url: `${apiDomain}/program/${program_id}/deleteTopic`,
  }).then((res) => {
    return res.data;
  });
  return results;
}

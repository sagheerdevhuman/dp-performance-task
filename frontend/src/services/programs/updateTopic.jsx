import axios from "axios";

export async function updateProgram({ topic_id, name, description }) {
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
    },
    url: `${apiDomain}/programs/topic/${topic_id}`,
  }).then((res) => {
    return res.data;
  });
  return results;
}

import axios from "axios";
export async function newTopic({
    program_id,
    skills,
  
}) {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = axios({
    method: "POST",
    data: {
    	skills:skills,
    },
    url: `${apiDomain}/programs/${program_id}/addTopic`,
  }).then((res) => {
    console.log(res);
    return res.data;
  });

  return res;
}
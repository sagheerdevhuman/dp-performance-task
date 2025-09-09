import axios from "axios";
export async function fetchProgramBySkill({skills}) {
  console.log(skills)
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const results = axios.get(`${apiDomain}/programs/by_skill`, {
    data: {
      skills:skills,
    },
  
  }).then((res) => {
    return res.data;
  });
  return results;
}

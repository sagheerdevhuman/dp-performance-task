import axios from "axios";
export async function apply({
    program_id,
    user_id,
  
}) {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = axios({
    method: "POST",
    data: {
        user_id:user_id,
    },
    url: `${apiDomain}/programs/${program_id}/apply`,
  }).then((res) => {
    console.log(res);
    return res.data;
  });

  return res;
}
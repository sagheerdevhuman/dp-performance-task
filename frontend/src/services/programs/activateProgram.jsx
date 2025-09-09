import axios from "axios";
export async function activateProgram({
  program_id
}) {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = axios({
    method: "POST",
    url: `${apiDomain}/programs/${program_id}/activate`,
  }).then((res) => {
    console.log(res);
    return res.data;
  });

  return res;
}
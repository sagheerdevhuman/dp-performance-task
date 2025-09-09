import axios from "axios";
export async function featureProgram({
  program_id
}) {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = axios({
    method: "PUT",
    url: `${apiDomain}/programs/${program_id}/feature`,
  }).then((res) => {
    console.log(res);
    return res.data;
  });

  return res;
}
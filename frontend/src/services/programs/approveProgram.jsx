import axios from "axios";
export async function approveProgram({
  program_id
}) {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = axios({
    method: "PUT",
    url: `${apiDomain}/programs/${program_id}/approve`,
  }).then((res) => {
    console.log(res);
    return res.data;
  });

  return res;
}
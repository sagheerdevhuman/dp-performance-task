import axios from "axios";
export async function qualifiedPrograms({
  user_id,
}) {

  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = axios({
    method: "GET",
    url: `${apiDomain}/programs/filter/${user_id}`,
  }).then((res) => {
    return res.data;
  });

  return res;
}
import axios from "axios";
export async function qualifiedUserContent({
  user_id,
}) {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = axios({
    method: "GET",
    url: `${apiDomain}/qualified-content/${user_id}`,
  }).then((res) => {
    console.log(res);
    return res.data;
  });

  return res;
}
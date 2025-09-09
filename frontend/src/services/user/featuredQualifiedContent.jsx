import axios from "axios";
export async function featuredQualifiedContent({
  user_id,
}) {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = axios({
    method: "GET",
    url: `${apiDomain}/qualified-featured/${user_id}`,
  }).then((res) => {
    console.log(res);
    return res.data;
  });

  return res;
}
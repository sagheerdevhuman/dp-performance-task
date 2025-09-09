import axios from "axios";
export async function newVideo({ name,link,org_id, description, tags,image }) {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  console.log(image)
  const res = axios({
    method: "POST",
    data: {
      name: name,
      link:link,
      org_id: org_id,
      description: description,
      tags: tags,
      image_url: image,
    },
    url: `${apiDomain}/video`,
  }).then((res) => {
    console.log(res);ß
    return res.data;
  });

  return res;
}

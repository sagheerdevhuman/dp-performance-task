import axios from "axios";

export async function fileUploader(
  file,
) {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const result = await axios({
    method: "POST",
    data: {
      file:file,
    },
    url: "http://localhost:5001/api/files",
    headers: { "Content-Type": header },
  }).then((res) => {
    return res;
    alert(res)
  });
  return result;
}

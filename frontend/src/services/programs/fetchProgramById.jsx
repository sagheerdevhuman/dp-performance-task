import axios from "axios";
export async function fetchProgramById({ program_id }) {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = await axios
    .get(`${apiDomain}/program/${program_id}`)
    .then((res) => {
      return res.data;
    });

  return res;
}

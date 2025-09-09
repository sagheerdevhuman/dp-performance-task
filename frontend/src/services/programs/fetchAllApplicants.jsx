import axios from "axios";
export async function getAllApplicants(program_id) {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = await axios
    .get(`${apiDomain}/programs/${program_id}/applicants`)
    .then((res) => {
      return res.data;
    });

  return res;
}

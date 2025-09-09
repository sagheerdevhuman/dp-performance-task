import axios from "axios";
export async function rejectProgram({
  program_id, user_id, reason
}) {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = axios({
    method: "PUT",
    data: {
      user_id: user_id,
      reason: reason,
    },
    url: `${apiDomain}/programs/${program_id}/reject`,
  }).then((res) => {
    console.log(res);
    return res.data;
  });

  return res;
}
import axios from "axios";
export async function fetchAllActiveProgramsByOrg({ org_id }) {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = await axios
    .get(`${apiDomain}/programs/${org_id}/active`)
    .then((res) => {
      console.log("res",res.data)
      return res.data;
      
    });

  return res;
}

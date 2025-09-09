import axios from "axios";

export async function updateProfile({
  user_id,
  past_experience,
  portfolio,
  education_level,
  college_in_stem,
  income_level,
  date_of_birth,
  gender,
  address,
  zipcode,
}) {

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;

  const results = axios({
    config,
    method: "PUT",
    data: {
      user_id:user_id,
      past_experience:past_experience,
      portfolio:portfolio,
      education_level:education_level,
      college_in_stem:college_in_stem,
      income_level:income_level,
      date_of_birth:date_of_birth,
      gender:gender,
      address:address,
      zipcode:zipcode,
    },
    url: `${apiDomain}/profile`,
  }).then((res) => {
    return res.data;
  });
  return results;
}

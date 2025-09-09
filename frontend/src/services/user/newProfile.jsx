import axios from "axios";
export async function newProfile({
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
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;

  console.log(user_id);
  console.log(past_experience);
  console.log(portfolio);
  console.log(education_level);
  console.log(college_in_stem);
  console.log(income_level);
  console.log(date_of_birth);
  console.log(gender);

  const res = axios({
    method: "POST",
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
    url: `${apiDomain}/profile/add`,
  }).then((res) => {
    console.log(res);
    return res.data;
  });

  return res;
}

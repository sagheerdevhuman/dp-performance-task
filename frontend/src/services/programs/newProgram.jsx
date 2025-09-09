import axios from "axios";
export async function newProgram({
  org_id,
  name,
  description,
  requirements,
  enrollment_deadline,
  start_date,
  end_date,
  start_time,
  end_time,
  week_days,
  video_call_link,
  skills,
  is_virtual,
  bannerUrl,
  location,
  user_id,
  past_experience,
  education_level,
  max_income_level,
  min_income,
  max_age,
  min_age,
  gender,
  experience,
  city,
  zipcode,
  radius,
}) {
  console.log(org_id)
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = axios({
    method: "POST",
    data: {
      name:name,
      description:description,
      requirements:requirements,
      enrollment_deadline:enrollment_deadline,
      start_date:start_date,
      end_date:end_date,
      start_time:start_time,
      end_time:end_time,
      week_days:week_days,
      location:location,
      video_call_link:video_call_link,
      is_virtual:is_virtual,
      banner_url:bannerUrl,
      skills:skills,
      user_id:user_id,
      past_experience:past_experience,
      education_level:education_level,
      max_income_level:max_income_level,
      min_income:min_income,
      max_age:max_age,
      min_age:min_age,
      gender:gender,
      experience_level:experience,
      city:city,
      zipcode:zipcode,
      radius:radius,
    },
    url: `${apiDomain}/programs/${org_id}/addProgram`,
  }).then((res) => {
    console.log(res);
    return res.data;
  });

  return res;
}

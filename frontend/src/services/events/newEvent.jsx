import axios from "axios";
export async function newEvent({
  org_id,
  name,
  description,
  location,
  rsvp_link,
  days,
  is_virtual,
  bannerUrl,
  user_id,
  tags,
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
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = axios({
    method: "POST",
    data: {
      name:name,
      description:description,
      location:location,
      rsvp_link:rsvp_link,
      is_virtual:is_virtual,
      days:days,
      banner_url:bannerUrl,
      user_id:user_id,
      tags:tags,
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
    url: `${apiDomain}/event/${org_id}/addEvent`,
  }).then((res) => {
    console.log(res);
    return res.data;
  });

  return res;
}

import axios from "axios";

export async function updateProgram({
  program_id,
  name,
  description,
  requirements,
  enrollment_deadline,
  start_date,
  end_date,
  start_time,
  end_time,
  week_days,
  location,
  video_call_link,
  is_virtual,
  banner_url,
  user_id,
  org_id,

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
      name: name,
      description: description,
      requirements: requirements,
      enrollment_deadline: enrollment_deadline,
      start_date: start_date,
      end_date: end_date,
      start_time: start_time,
      end_time: end_time,
      week_days: week_days,
      location: location,
      video_call_link: video_call_link,
      is_virtual: is_virtual,
      banner_url: banner_url,
      user_id: user_id,
      org_id: org_id
    },
    url: `${apiDomain}/programs/${program_id}`,
  }).then((res) => {
    return res.data;
  });
  return results;
}

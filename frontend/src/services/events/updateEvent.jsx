import axios from "axios";

export async function updateEvent({
  event_id,
  name,
  days,
  description,
  location,
  rsvp_link,
  is_virtual,
  banner_url,
  user_id,
  org_id
}) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  console.log(user_id)

  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;

  const results = axios({
    config,
    method: "PUT",
    data: {
      name: name,
      days:days,
      description: description,
      location: location,
      rsvp_link: rsvp_link,
      is_virtual: is_virtual,
      banner_url: banner_url,
      user_id: user_id,
      org_id: org_id
    },
    url: `${apiDomain}/events/${event_id}/update`,
  }).then((res) => {
    return res.data;
  });
  return results;
}
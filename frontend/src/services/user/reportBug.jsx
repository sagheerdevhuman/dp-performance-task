import axios from "axios";

export async function reportBug({
    user_id,
    subject,
    description
}) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const results = axios({
    config,
    method: "POST",
    data: {
      user_id:user_id,
      subject:subject,
      description:description
    },
    url: `${apiDomain}/error`,
  }).then((res) => {
    alert("Message Sent!")
    return res.data;
  });
  return results;
}

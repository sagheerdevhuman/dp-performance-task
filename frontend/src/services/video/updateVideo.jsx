import axios from "axios";

export async function updateVideo({
  video_id,
  name,
  description,
  link,
  org_id,
  tags,
  image,
}) {
  try {
    console.log("Updating video with data:", {
      video_id,
      name,
      description,
      link,
      org_id,
      tags,
      image,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    
    const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
    console.log("API Domain:", apiDomain);

    const response = await axios({
      method: "PUT",
      url: `${apiDomain}/video/${video_id}`,
      headers: config.headers,
      data: {
        name: name,
        description: description,
        link: link,
        org_id: org_id,
        tags: tags,
        image: image,
      },
    });

    console.log("Video update response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating video:", error);
    if (error.response) {
      // Server responded with error status
      throw new Error(`Failed to update video: ${error.response.status} ${error.response.statusText}`);
    } else if (error.request) {
      // Network error
      throw new Error("Network error: Unable to connect to server");
    } else {
      // Other error
      throw new Error(`Error updating video: ${error.message}`);
    }
  }
}

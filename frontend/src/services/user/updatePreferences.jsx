import axios from "axios";

export async function updatePreferences({
  user_id,
  availability,
  learning_style,
  preferred_language,
  desired_skills,
  desired_tags,
}) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;

    const response = await axios({
      method: "PUT",
      url: `${apiDomain}/profile/preferences`,
      data: {
        user_id: user_id,
        availability: availability,
        learning_style: learning_style,
        preferred_language: preferred_language,
        desired_skills: desired_skills,
        desired_tags: desired_tags,
      },
      ...config,
    });
    
    return response.data;
  } catch (error) {
    console.error("Error updating preferences:", error);
    throw error;
  }
}

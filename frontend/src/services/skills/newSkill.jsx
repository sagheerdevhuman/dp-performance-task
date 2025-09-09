import axios from "axios";

export async function newSkill({ name, description }) {
  try {
    const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
    const response = await axios({
      method: "POST",
      data: {
        name: name,
        description: description,
      },
      url: `${apiDomain}/skill/addSkill`,
    });
    
    return response.data;
  } catch (error) {
    console.error("Error creating skill:", error);
    throw error;
  }
}

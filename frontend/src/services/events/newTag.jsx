import axios from "axios";

export async function newTag({ name }) {
  try {
    const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
    const response = await axios({
      method: "POST",
      data: {
        name: name,
      },
      url: `${apiDomain}/tag/addTag/`,
    });
    
    return response.data;
  } catch (error) {
    console.error("Error creating tag:", error);
    throw error;
  }
}

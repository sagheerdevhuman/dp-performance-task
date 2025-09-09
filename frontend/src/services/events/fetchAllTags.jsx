import axios from "axios";

export async function fetchAllTags() {
  try {
    const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
    const res = await axios.get(`${apiDomain}/tags`);
    return res.data;
  } catch (error) {
    console.error("Error fetching tags:", error);
    if (error.response) {
      // Server responded with error status
      throw new Error(`Failed to fetch tags: ${error.response.status} ${error.response.statusText}`);
    } else if (error.request) {
      // Network error
      throw new Error("Network error: Unable to connect to server");
    } else {
      // Other error
      throw new Error(`Error fetching tags: ${error.message}`);
    }
  }
}
